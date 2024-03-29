import { Injectable } from '@angular/core';
import { epubPlayerConstants } from '../../sunbird-epub.constant';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  fromConst = epubPlayerConstants;

  constructor() { }

  public uniqueId(length = 32) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  public getTimeSpentText(pdfPlayerStartTime) {
    const duration = new Date().getTime() - pdfPlayerStartTime;
    const minutes = Math.floor(duration / 60000);
    const seconds = Number(((duration % 60000) / 1000).toFixed(0));
    return (minutes + ':' + (seconds < 10 ? '0' : '') + seconds);
  }

  getCurrentIndex(event , currentPageIndex) {
    if (event?.interaction === this.fromConst.NEXT) {
      return currentPageIndex + 1;
    }
    if (event?.interaction === this.fromConst.PREVIOUS) {
      return currentPageIndex - 1 ===  0 ? 1 : currentPageIndex - 1;
    }
  }

  async fulfillWithTimeLimit(timeLimit: number, task: Promise<any>, failureValue: any): Promise<any> {
    let timeout;
    const timeoutPromise = new Promise((resolve, reject) => {
      timeout = setTimeout(() => {
        resolve(failureValue);
      }, timeLimit);
    });
    const response = await Promise.race([task, timeoutPromise]);
    if (timeout) {
      clearTimeout(timeout);
    }
    return response;
  }
}

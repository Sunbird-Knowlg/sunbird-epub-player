# Epub player library for Sunbird platform!
Contains Epub player library components powered by angular. These components are designed to be used in sunbird consumption platforms *(mobile app, web portal, offline desktop app)* to drive reusability, maintainability hence reducing the redundant development effort significantly.

# Getting Started
For help getting started with a new Angular app, check out the Angular CLI.
For existing apps, follow these steps to begin using .

## Step 1: Install the packages
```bash
npm install @project-sunbird/sunbird-epub-player-v9 --save
npm install @project-sunbird/sb-styles --save
npm install @project-sunbird/client-services --save
npm install epubjs --save
```
## Step 2: Include the styles, scripts and assets in angular.json
    "styles": [
    ...
    ...
    "src/styles.css",
    "./node_modules/@project-sunbird/sb-styles/assets/_styles.scss"
    ],
    "scripts": [
    ...
    ...
    "node_modules/epubjs/dist/epub.js"
    ]

  Add following under architect.build.assets

     {
	    ...
	    "build": {
	    
	    "builder": "@angular-devkit/build-angular:browser",
	    
	    "options": {
		    ...
		    ...
    
		    "assets": [
		    
			   ...
			   ...
			    
			    {
				    "glob": "**/*.*",
				    "input": "./node_modules/@project-sunbird/sunbird-epub-player-v9/lib/assets/",
				    "output": "/assets/"
			    }
		    
		    ],
    
	    "styles": [
	    
	    ...
	    
	    "./node_modules/@project-sunbird/sb-styles/assets/_styles.scss"
	    ],
	    "scripts": [
         ...
         "node_modules/epubjs/dist/epub.js"
         ]
	    ...
	    ...
    
    },

  

## Step 3: Import the modules and components
Import the NgModule where you want to use. Also create a [question-cursor-implementation.service](data.ts)
       
    import { SunbirdEpubPlayerModule } from '@project-sunbird/sunbird-epub-player-v9';

    
    @NgModule({
	    ...
	    
	    imports: [SunbirdEpubPlayerModule]
	    
	    ...
    })

  
    export class TestAppModule { }
    
## Step 4: Add css in global styles
```css
body {
    background-color: white;
    height: 100%;
}
html {
    height: 100%;
}
```

## Step 5: Send input to render Epub player
Use the mock config in your component to send input to Epub player
Click to see the mock - [playerConfig](src/app/data.ts)

## Player config
```js
var playerConfig = {
  "context": {
    "mode": "play",  // To identify preview used by the user to play/edit/preview
    "authToken": "", // Auth key to make  api calls
    "sid": "7283cf2e-d215-9944-b0c5-269489c6fa56", // User sessionid on portal or mobile 
    "did": "3c0a3724311fe944dec5df559cc4e006", // Unique id to identify the device or browser 
    "uid": "anonymous", // Current logged in user id
    "channel": "505c7c48ac6dc1edc9b08f21db5a571d", // Unique id of the channel(Channel ID)
    "pdata": {
      "id": "sunbird.portal", // Producer ID. For ex: For sunbird it would be "portal" or "genie"
      "ver": "3.2.12", // Version of the App
      "pid": "sunbird-portal.contentplayer" // Optional. In case the component is distributed, then which instance of that component
    },
    "contextRollup": { // Defines the content roll up data
      "l1": "505c7c48ac6dc1edc9b08f21db5a571d"
    },
    "tags": [ // Defines the tags data
      ""
    ],
    "cdata": [], // Defines correlation data
    "timeDiff": 0,  // Defines the time difference
    "objectRollup": {}, // Defines the object roll up data
    "host": "", // Defines the from which domain content should be load
    "endpoint": "", // Defines the end point
    "userData": {  // Defines the user data firstname & lastname
      "firstName": "",
      "lastName": ""
    }
  },
  "config": { 
	"traceId": "123456", // Defines trace id
    "sideMenu": { 
      "showShare": true,    // show/hide share button in side menu. default value is true
      "showDownload": true, // show/hide download button in side menu. default value is true
      "showReplay": false, // show/hide replay button in side menu. default value is false
      "showExit": true,   // show/hide exit button in side menu. default value is true
    }
  },
  "metadata": {}, // Content metadata json object (from API response take -> response.result.content)
} 

```
## Telemetry property description
|Property Name| Description| Default Value
|--|----------------------|--|
| `context` | It is an `object` it contains the `uid`,`did`,`sid`,`mode` etc., these will be logged inside the telemetry  | ```{}``` |
| `mode` | It is  `string` to identify preview used by the user to play/edit/preview | ```play```|
| `authToken` | It is  `string` and Auth key to make  api calls | ```''```|
| `sid` | It is  `string` and User sessionid on portal or mobile | ```''```|
| `did` | It is  `string` and Unique id to identify the device or browser| ```''```|
| `uid` | It is  `string` and Current logged in user id| ```''```|
| `channel` | It is `string` which defines channel identifier to know which channel is currently using.| `in.sunbird` |
| `pdata` | It is an `object` which defines the producer information it should have identifier and version and canvas will log in the telemetry| ```{'id':'in.sunbird', 'ver':'1.0'}```|
| `contextRollup` | It is an `object` which defines content roll up data | ```{}```|
| `tags` | It is an `array` which defines the tag data | ```[]```|
| `objectRollup` | It is an `object` which defines object rollup data | ```{}```|
| `host` | It is  `string` which defines the from which domain content should be load|```window.location.origin```  |
| `userData` | It is an `object` which defines user data | ```{}```|
| `cdata` | It is an `array` which defines the correlation data | ```[]```|

## Config property description
|Property Name| Description| Default Value
|--|----------------------|--|
| `config` | It is an `object` it contains the `sideMenu`, these will be used to configure the canvas  | ```{ traceId: "12345", sideMenu: {"showShare": true, "showDownload": true, "showReplay": false, "showExit": true}}``` |
| `config.traceId` | It is  `string` which defines the trace id | ```''```|
| `config.sideMenu.showShare` | It is  `boolean` to show/hide share button in side menu| ```true```|
| `config.sideMenu.showDownload` | It is  `boolean` to show/hide download button in side menu| ```true```|
| `config.sideMenu.showReplay` | It is  `boolean` to show/hide replay button in side menu| ```false```|
| `config.sideMenu.showExit` | It is  `boolean` to show/hide exit button in side menu| ```true```|
| `metadata` | It is an `object` which defines content metadata json object (from API response take -> response.result.content) | ```{}```|

## Available components
|Feature| Notes| Selector|Code|Input|Output
|--|--|--|------------------------------------------------------------------------------------------|---|--|
| Epub Player | Can be used to render epub | sunbird-epub-player| *`<sunbird-epub-player [playerConfig]="playerConfig"><sunbird-epub-player>`*|playerConfig|playerEvent, telemetryEvent|

## Use as web components	

Any web application can use this library as a web component. It accepts couple of inputs and triggers some events back to the application.

Follow below-mentioned steps to use it in plain javascript project:

- Insert [library](https://github.com/project-sunbird/sunbird-epub-player/blob/release-4.5.0/web-component/sunbird-epub-player.js) as below:
	```javascript
	<script type="text/javascript" src="sunbird-epub-player.js"></script>
	```
- Get sample playerConfig from here: [playerConfig](https://github.com/project-sunbird/sunbird-epub-player/blob/release-4.5.0/src/app/data.ts)

- Create a custom html element: `sunbird-epub-player`
	```javascript
    const  epubElement = document.createElement('sunbird-epub-player');
   ```

- Pass data using `player-config`
	```javascript
	epubElement.setAttribute('player-config', JSON.stringify(playerConfig));
	```

	**Note:** Attribute name should be in kebab-case regardless of the actual Attribute name used in the Angular app. The value of the attribute should be in **string** type, as web-component does not accept any objects or arrays.

- Listen for the output events: **playerEvent** and **telemetryEvent**

	```javascript
	epubElement.addEventListener('playerEvent', (event) => {
		console.log("On playerEvent", event);
	});
	epubElement.addEventListener('telemetryEvent', (event) => {
		console.log("On telemetryEvent", event);
	});
	```
- Append this element to existing element
	```javascript
	const  myPlayer = document.getElementById("my-player");
	myPlayer.appendChild(epubPlayerElement);
	```
- Refer demo [example](https://github.com/project-sunbird/sunbird-epub-player/blob/release-4.5.0/web-component/index.html)

- To run the project, we can directly run index.html file or can use local server to run the project.

- ![demo](https://github.com/project-sunbird/sunbird-epub-player/blob/release-4.5.0/web-component/epub-player-wc.png)
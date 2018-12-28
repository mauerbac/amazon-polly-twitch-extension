# Twitch Panel Extension + Amazon Polly

This example uses [Amazon Polly](https://aws.amazon.com/polly/) to transcribe text-to-speech in a [Twitch Panel Extension](https://www.twitch.tv/p/extensions/). A user presses a button on the panel, which makes a request to Polly to produce an audio clip that can be played via the browser. 

### Amazon Polly

[Polly](https://aws.amazon.com/polly/) is a service that turns text into lifelike speech, allowing you to create applications that talk, and build entirely new categories of speech-enabled products. Amazon Polly is a Text-to-Speech service that uses advanced deep learning technologies to synthesize speech that sounds like a human voice.

### Twitch Extensions 
[Twitch Extensions](https://www.twitch.tv/p/extensions/) are programmable interactive overlays and panels, which help streamers interact with their viewers. The Twitch community can interact in new ways  - from heat maps and real-time game data overlays to mini-games, music requests to leaderboards.

# Usage 

Press the play button to hear the current time! 

![Example]()


# Building the App

Step-by-step on how to configure, develop & deploy this locally using the Twitch Developer Rig. 

### Architecture 

The panel extension captures the current time and produces a text string that is sent to our Extension Backend Service, which then leverages Polly to convert into an mp3. This audio file is then returned to the frontend panel which is played via the browser. 

Simply, `panel.html` & `viewer.js` control the frontend logic (Twitch Panel). `backend.py` contains the logic for a backend endpoint `/read` which returns audio produced by Polly.  	  

### Housekeeping
1. Sign-in to AWS or [Create an Account](https://us-west-2.console.aws.amazon.com).
2. Pick a region in the console and be consistent throughout this app. Use either `us-east-1`, `us-west-2` & `eu-west-1`.
3. Create an IAM role with full access to Amazon Polly 
4. Create/login to a Twitch Developer account & view the [Extension Dashboard](https://dev.twitch.tv/dashboard/extensions).
5. Download the developer rig using the button in the upper right. 

### Amazon Polly

Polly is a straightforward service so configuration is light. We will use the `SynthesizeSpeech` feature which can be tested via the [dashboard](https://console.aws.amazon.com/polly/home/SynthesizeSpeech). Developers can configure the voice type and output type. I've selected `Joanna` & `mp3`. 
 
Polly is contained in our Extension Backend Service and can be viewed in `backend.js`. This is mostly boilerplate code from the official AWS [Python Sample](https://docs.aws.amazon.com/polly/latest/dg/example-Python-server-code.html). 

Ensure you’ve create an [IAM profile locally](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-role.html) using the credentials from earlier. 

The snippet shows the crux of the Polly SDK. It takes in text to convert to speech, a voice and an output format. 
```
response = polly.synthesize_speech(Text=text,
                                                    VoiceId=voiceId,
                                                    OutputFormat=outputFormat)

```


### Panel Extension
1. In the Extension dashboard, click Create Extension
2. Give it a name and checkbox `Panel` under Type of Extension  
3. Select you are using the developer rig
4. Provide a summary, description, as well as provide a valid email addresses. Then press Create. 
5. Record the `clientID` and `secretKey` from the web dashboard.


Review the code `viewer.js`. This contains the frontend logic to make a request to our backend. We take the user timezone to avoid issues with timezone and make a get request to `/read`.  


### Using the Developer Rig

The Twitch developer rig makes it easy to build and test extensions. It will mimic the user’s environment and will handle authentication by displaying the extension in an iframe. Let’s setup the rig and test the app. 

Open the rig and provide it with your project’s clientID and secretKey.
Click import to pull down the manifest. 
Provide a file path to a clean directory. 
Select the hell world boilerplate code. This will generate the skeleton for a basic frontend/backend extension.   
Next, add a panel view. 
Navigate to the newly created directory and replace the frondend files `panel.html`, `viewer.js`
Also, replace the backend file `backend.js` with `backend.py`. Polly SynthesizeSpeech is an async function so Python makes it a bit easier. 
The rig should be able to run the frontend via “Start Hosting”
Change the backend command to `python backend.py` and run 
Using the panel view you created you should be able to test the app and hear the time spoken. 

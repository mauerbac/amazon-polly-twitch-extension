# Twitch Panel Extension + Amazon Polly

This example uses [Amazon Polly](https://aws.amazon.com/polly/) to transcribe text-to-speech in a [Twitch Panel Extension](https://www.twitch.tv/p/extensions/). A user presses a button on the panel, which makes a request to Polly to produce an audio clip that can be played via the browser. 

### Amazon Polly

[Amazon Polly](https://aws.amazon.com/polly/) is an AWS service that turns text into lifelike speech, allowing developers to create applications that talk, and build entirely new categories of speech-enabled products. Amazon Polly is a text-to-speech service that uses advanced deep learning technologies to synthesize speech that sounds like a human voice.

### Twitch Extensions 
[Twitch Extensions](https://www.twitch.tv/p/extensions/) are programmable interactive overlays and panels, which help streamers interact with their viewers. The Twitch community can interact in new ways such as heat maps, real-time game data overlays, mini-games, music requests, and leaderboards.

# Usage 

In this example, a Twitch viewer will click the play button in the panel Extension to hear the current time during a broadcast.

<img src="https://github.com/mauerbac/amazon-polly-twitch-extension/blob/master/panel.png" width="420">

This app leverages a simple frontend/backend architecture. The panel Extension captures the current time and produces a text string that is sent to our backend (aka our Extension Backend Service), which then leverages Polly to convert the text into an mp3 file. This audio file is then returned to the frontend Extension panel which is played through the browser. 

*Note:* Twitch only allows playing sound through panel Extnesions where the inital state is muted. We are using the play button in this example as a trigger for the viewer to enable sound.

The provided code is arranged as follows: `panel.html` and `viewer.js` controls the frontend logic (Twitch Extension Panel). `backend.py` contains the logic for the backend endpoint `/read`, which returns audio produced by Polly.  

# Building the App

Below are step-by-step instructions on how to configure, develop, and deploy this example locally using the Twitch Developer Rig.  

### Setup

1. Sign-in to AWS or [Create an Account](https://us-west-2.console.aws.amazon.com).
2. Pick a region in the console and be consistent throughout this app. Use either `us-east-1`, `us-west-2`, or `eu-west-1`.
3. Create an [IAM role](https://console.aws.amazon.com/iam/home?#/home) with full access to Amazon Polly. Records the AccessId and SecretKey.
4. Create/login to a Twitch account for your development and view the Extensions section of the [Developer Dashboard](https://dev.twitch.tv/dashboard/extensions).
5. Download the Developer Rig using the button in the upper right. We will create the Extension shortly.  

### Amazon Polly

Polly is a straightforward service so configuration is light. We will use the `SynthesizeSpeech` feature which can be tested via the [dashboard](https://console.aws.amazon.com/polly/home/SynthesizeSpeech). Developers can configure the voice type and output type. I've selected `Joanna` and `mp3`. 
 
Polly is contained in our Extension Backend Service and can be viewed in `backend.js`. This is mostly boilerplate code from the official AWS [Python sample](https://docs.aws.amazon.com/polly/latest/dg/example-Python-server-code.html). 

Ensure you’ve create an [IAM profile locally](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-role.html) using the credentials from earlier. 

This snippet from the Python example shows the crux of the Polly SDK. It takes in text to convert to speech, a voice type, and an output format. 
```
response = polly.synthesize_speech(
         Text=text,
         VoiceId=voiceId,
         OutputFormat=outputFormat
       )
```

### Twitch Panel Extension

If you haven't seen a panel Extension, check out [TwitchDev](https://www.twitch.tv/twitchdev) and view the Twitter Panel Extension beneath the video display. Broadcasters can display three panel Extensions at a time.

1. In the [Extension dashboard](https://dev.twitch.tv/dashboard/extensions), click Create Extension.
2. Give it a name and check the `Panel` checkbox under Type of Extension.
3. Select that you are using the Developer Rig.
4. Provide a summary, description, and valid email addresses. Then press Create. 
5. Record the `clientID` and `secretKey` from the web dashboard. This will be used in the Developer Rig.

Review the code in `viewer.js`. This contains the frontend logic to make a request to our backend. We take the user's timestamp client-side to avoid issues with timezones.


### Using the Developer Rig

The Twitch Developer Rig makes it easy to build and test Extensions. It will mimic the user's environment and will handle authentication by displaying the extension in an iframe. Let's setup the rig and test the app. 

1. Open the rig and provide it with your project's clientID and secretKey.
2. Click import to pull down the manifest. 
3. Provide an absolute file path to a clean directory to build this project. 
4. Select the hello world boilerplate code. This will generate the skeleton code for a basic frontend/backend Extension.   
5. Next, add a panel view. 
6. Navigate to the newly created directory and replace the frontend files for `panel.html` and `viewer.js` with the files in this repo.
7. Also, replace the backend file `backend.js` with `backend.py`. Polly SynthesizeSpeech is an async function so Python makes it a bit easier. 
8. The Rig should be able to run the frontend via "Start Hosting"
9. Change the backend command to `python backend.py` and run 
10. Using the panel view you created, you should be able to test the app and hear the time spoken.

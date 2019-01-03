let token = '';
let tuid = '';

let twitch = window.Twitch.ext;

twitch.onContext(function (context) {
  twitch.rig.log(context);
});

twitch.onAuthorized(function (auth) {
  // save our credentials
  token = auth.token;
  tuid = auth.userId;

  // enable the button
  $('#play_sound').removeAttr('disabled');
});

$(function() {
  $('#play_sound').click(function () {
    if(!token) { return twitch.rig.log('Not authorized'); }
      twitch.rig.log('Requesting an audio file');

    // current time in user timezone
    const currentTime = new Date().toLocaleTimeString();
    // form message
    const textToPlay = 'Hello! The current time is ' + currentTime;

    player.src = '//127.0.0.1:8000/read?voiceId=' +
      encodeURIComponent('Joanna') +
                        '&text=' + encodeURIComponent(textToPlay) +
                        '&outputFormat=' + 'mp3';
    player.play();
    event.preventDefault();
  });
});

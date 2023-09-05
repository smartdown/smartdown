/* global smartdown */

import {
  importScriptUrl,
} from '../importers';

let youtubeIframeAPILoaded = false;
let youtubeIframeAPILoadedCbs = [];

function onYouTubeIframeAPIReady() {
  // console.log('onYouTubeIframeAPIReady');
  youtubeIframeAPILoaded = true;

  youtubeIframeAPILoadedCbs.forEach((cb) => {
    cb();
  });

  youtubeIframeAPILoadedCbs = [];
}
window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

function loadYouTubeIframeAPI(done) {
  youtubeIframeAPILoadedCbs.push(done);
  importScriptUrl('https://www.youtube.com/iframe_api', function() {
    // console.log('https://www.youtube.com/iframe_api loaded');
  });
}
export default function setupYouTubePlayer(div, varName) {
  // console.log('setupYouTubePlayer', div, varName, youtubeIframeAPILoaded);
  if (youtubeIframeAPILoaded) {
    const playerDiv = document.getElementById(div);

    const player = new YT.Player(playerDiv, {
        events: {
          'onReady': function (/* event */) {
              // console.log('onPlayerReady', event);
              // console.log(player);
              smartdown.setVariable(varName, player, 'json');
          },
          'onStateChange': function (/* event */) {
            // console.log('onPlayerStateChange', event);
          }
        }
    });
  }
  else {
    loadYouTubeIframeAPI(function() {
      setupYouTubePlayer(div, varName);
    });
  }
}

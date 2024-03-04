/* global smartdown */

import playableTypes from '../playableTypes';

export default function resetPlayable(language, divId, throwAway) {
  const playable = smartdown.playablesRegistered[divId];
  if (!playable.playing) {
    // console.log('resetPlayable NOT PLAYING', language, divId);
  }
  else {
    // console.log('resetPlayable PLAYING', playable.divId, playable);
    const div = document.getElementById(playable.divId);
    const play = document.getElementById(playable.playId);
    const stop = document.getElementById(playable.stopId);
    const progress = document.getElementById(playable.progressId);
    if (play) {
      play.style.display = 'inline-block';
      stop.style.display = 'none';
    }

    if (progress) {
      progress.style.display = 'none';
    }

    const divPre = document.getElementById(playable.preId);
    if (divPre && !throwAway) {
      divPre.style.display = 'block';
    }

    const playableType = playableTypes[language];

    playable.playing = false;
    div.parentElement.classList.remove('playable-playing');

    div.style.display = 'none';
    if (playableType.javascript) {
      const atExitHandlers = playable.embedThis.atExitHandlers;
      atExitHandlers.forEach(function(func) {
        // console.log('resetPlayable... calling atExitHandler', func);
        func();
      });
      if (language.toLowerCase() === 'p5js') {
        const myP5 = playable.p5;
        if (myP5) {
          window.removeEventListener('keydown', myP5.keydownHandler);
          // myP5.noLoop();
          playable.p5 = null;
          myP5.remove();
          if (div) {
            const canvas = div.getElementsByTagName('canvas');
            if (canvas && canvas.length > 0) {
              div.removeChild(canvas[0]);
            }
          }
        }
      }
      else if (language === 'leaflet') {
        if (!playable.embedThis) {
          console.log('   playable.embedThis', playable.embedThis, playable, divId);
        }
        if (playable.embedThis.leafletMap) {
          // console.log('leaflet playable.embedThis.leafletMap', playable.embedThis.leafletMap);
          playable.embedThis.leafletMap.remove();
          delete playable.embedThis.leafletMap;
        }
      }
      else if (language === 'go') {
        if (playable.isGodownMain) {
          try {
            /* global Godown_Shutdown */
            Godown_Shutdown();
          }
          catch (e) {
            console.log('exception from runtime.Goexit', e);
          }
        }
      }

      if (playable.isModule) {
        console.log('resetPlayable isModule', playable.es6ModuleScript);
        playable.es6ModuleScript.remove();
        playable.es6ModuleScript = null;
      }
    }

    div.innerHTML = '';
  }
}


/* global smartdown */

import playableTypes from '../playableTypes';
import P5 from '../extensions/P5';
import Mermaid from '../extensions/Mermaid';
import graphvizImages from '../extensions/Graphviz';
import playableArgNames from './playableArgNames';
import {isExtensionRegistered, loadExternal, ensureExtension} from '../extensions';
import renderABCIntoDivs from '../render/renderABCIntoDivs';

async function playPlayableInternal(language, divId) {
  // console.log('playPlayableInternal', divId);

  const playable = smartdown.perPageState.playablesRegistered[divId];
  const div = document.getElementById(playable.divId);
  const divPre = document.getElementById(playable.preId);
  // const divDbg = document.getElementById(playable.dbgId);
  // const divDbgToggle = document.getElementById(playable.dbgToggleId);
  const play = document.getElementById(playable.playId);
  const stop = document.getElementById(playable.stopId);
  const progress = document.getElementById(playable.progressId);
  if (play) {
    play.style.display = 'none';
    stop.style.display = 'inline-block';
  }
  if (divPre) {
    divPre.style.display = 'none';
  }
  if (progress) {
    progress.style.display = playable.targetDivId ? 'inline-block' : 'block';
  }
  playable.playing = true;
  div.parentElement.classList.add('playable-playing');
  if (div) {
    div.style.display = playable.targetDivId ? 'inline' : 'block';
  }
  const playableType = playableTypes[language];
  if (playableType.javascript) {
    const argValues = [
      playable,
      smartdown.smartdownVariables,
      P5.Loader,
      window.d3,
      window.d3fc,
      window.d3dc,
      window.topojson,
      window.Plotly,
      window.Leaflet,
      window.Stdlib,
      window.THREE,
      module.exports, // smartdown
      {}    // This will be a p5 obj in the case of using P5.Loader
    ];

    //
    // It seems like there is some duplication between a playable's
    // 'this' value, and the value of the 'playable' argument.
    //
    playable.embedThis = {
      env: smartdown.smartdownVariables,
      div,
      progress,
      dependOn: {},
      depend: null,
      log: function(...args) {
        smartdown.consoleWrite(playable, args);
      },
      atExitHandlers: [],
      atExit: function(func) {
        // console.log('atExit', func, this);
        this.atExitHandlers.push(func);
      }
    };

    if (language.toLowerCase() !== 'p5js') {
      if (playable.isModule && playable.language !== 'typescript') {
        await smartdown.runModule(playable, argValues, language);
      }
      else {
        const embedResult = await smartdown.runFunction(playable.augmentedCode, playable.embedThis, argValues, language, div);
        if (language === 'leaflet' && !playable.embedThis.leafletMap) {
          playable.embedThis.leafletMap = embedResult;
        }
      }
    }
    else {
      /* xeslint no-eval: 0 */

      /* eslint no-inner-declarations: 0 */
      function patchedDisposeSound() {
        /* eslint no-invalid-this: 0 */
        for (let i = 0; i < P5.Loader.soundOut.soundArray.length; i++) {
          const soundResource = P5.Loader.soundOut.soundArray[i];
          if (!soundResource.owner ||
              soundResource.owner === this) {
            // console.log('DISPOSE [' + i + '] disposeSound soundResource:', soundResource);
            soundResource.dispose();
          }
        }
      }

      const removeHandlers = P5.Loader.prototype._registeredMethods.remove;
      for (let i = 0; i < removeHandlers.length; ++i) {
        if (removeHandlers[i] === P5.Loader.prototype.disposeSound) {
          removeHandlers[i] = patchedDisposeSound;
        }
      }

      // const oldmousemove = P5.Loader.prototype._onmousemove;
      // P5.Loader.prototype._onmousemove = function(e) {
      //   console.log('onmousemove', e);
      // };
      // const oldtouchend = P5.Loader.prototype._ontouchend;
      P5.Loader.prototype._ontouchend = function (e) {
        // Smartdown addition to capture page dimensions
        e.clientX = e.pageX;
        e.clientY = e.pageY;
        // return oldtouchend.apply(this, arguments);


        // This code will be needed until a fix is made to 0.5.8 of P5JS
        // Copied from 0.5.8 of P5JS
        // Working around bug in https://github.com/processing/p5.js/pull/1820/files

        this._updateTouchCoords(e);
        this._updateNextMouseCoords(e);
        if (this.touches.length === 0) {
          this._setProperty('touchIsDown', false);
        }
        const context = this._isGlobal ? window : this;
        let executeDefault;
        if (typeof context.touchEnded === 'function') {
          executeDefault = context.touchEnded(e);
          if (executeDefault === false) {
            e.preventDefault();
          }
        }
        else if (typeof context.mouseReleased === 'function') {
          executeDefault = context.mouseReleased(e);
          if (executeDefault === false) {
            e.preventDefault();
          }
        }
      };

      /* eslint-disable-next-line @typescript-eslint/no-implied-eval */
      let func = new Function(...playableArgNames, playable.augmentedCode);
      playable.embedThis.IAMP5 = 'IAMP5';
      func = func.bind(
        playable.embedThis,
        ...(argValues.slice(0, -1))
      );

      try {
        const myP5 = new P5.Loader(func, div);
        if (myP5._targetFrameRate === 60) {
          myP5.frameRate(16);
        }
        myP5._onresize();
        function keydownHandler(e) {
          // console.log('keydownHandler', e.target.tagName, e);
          const ignoreKeys = [
            myP5.LEFT_ARROW,
            myP5.RIGHT_ARROW,
            myP5.UP_ARROW,
            myP5.DOWN_ARROW,
            32
          ];

          if (e.target.tagName === 'BODY' && ignoreKeys.indexOf(e.keyCode) >= 0) {
            // console.log('ignoring', e);
            e.preventDefault();
          }
        }
        myP5.keydownHandler = keydownHandler;
        window.addEventListener('keydown', keydownHandler, false);

        playable.p5 = myP5;
      }
      catch (e) {
        console.log('#### Error initializing P5JS', e);
        div.innerHTML =
`
<pre><code style="color:tomato;">
<b>Error Initializing P5JS</b>
${e}
</code></pre>
`;
        // resetPlayable(language, divId);
      }
    }

    if (playable && playable.playing) {
      const { depend, dependOn } = playable.embedThis;
      let atLeastOneDefined = false;

      if (Array.isArray(dependOn)) {
        // Legacy mode with a single .depend() method
        if (!depend) {
          atLeastOneDefined = true; // To drop the progress bar
        }
        else {
          let atLeastOneUndefined = false;
          dependOn.forEach((varname) => {
            const newValue = smartdown.smartdownVariables[varname];
            if (newValue === undefined) {
              atLeastOneUndefined = true;
            }
            playable.dependLastValues[varname] = newValue;
          });

          if (!atLeastOneUndefined) {
            atLeastOneDefined = true;
            await depend.apply(playable.embedThis);
          }
        }
      }
      else if (dependOn) {
        let atLeastOneEvaluated = false;
        Object.keys(dependOn).forEach((varname) => {
          atLeastOneEvaluated = true;
          const newValue = smartdown.smartdownVariables[varname];
          playable.dependLastValues[varname] = newValue;

          if (newValue !== undefined) {
            atLeastOneDefined = true;
            dependOn[varname].apply(playable.embedThis);
          }
        });

        if (!atLeastOneEvaluated) {
          atLeastOneDefined = true; // To drop the progress bar
        }
      }

      if (atLeastOneDefined) {
        if (progress) {
          progress.style.display = 'none';
        }
      }
    }
  }
  else if (language === 'mermaid') {
    Mermaid.mermaidRender(div, playable.code);

    if (progress) {
      progress.style.display = 'none';
    }
  }
  else if (language === 'graphviz') {
    div.innerHTML = '';
    window.smartdownJSModules.graphviz.loader(function () {
      const options = {
        images: graphvizImages
      };

      (new window.Viz()).renderString(playable.code, options).then((result) => {
        if (progress) {
          progress.style.display = 'none';
        }
        div.innerHTML = result;
      });
    });
  }
  else if (language.indexOf('abc') === 0) {
    const abcBaseId = div.id;
    div.innerHTML =
`
  <div class="abc-wrapper">
    <div
      id="${abcBaseId}-sheet"
      class="smartdown-abcsheet">
    </div>
    <div
      id="${abcBaseId}-midi"
      class="smartdown-abcmidi">
    </div>
  </div>
`;

    ensureExtension(
      'abc',
      function () {
        renderABCIntoDivs(abcBaseId, language, playable.code);

        if (progress) {
          progress.style.display = 'none';
        }
      });
  }
  else {
    console.log('language: ', language);
  }
}


function recursivelyLoadImports(language, divId, importsRemaining, done) {
  // console.log('recursivelyLoadImports', language, divId, JSON.stringify(importsRemaining), importsRemaining.length);
  if (importsRemaining.length > 0) {
    const nextImportPair = importsRemaining.shift();
    const nextImport = nextImportPair[0];
    const nextImportIsModule = nextImportPair[1];

    // DRY THIS UP

    if (isExtensionRegistered(nextImport)) {
      ensureExtension(nextImport, function() {
        recursivelyLoadImports(language, divId, importsRemaining, done);
      });
    }
    else if (nextImport.toLowerCase() === 'p5js') {
      window.smartdownJSModules.p5js.loader(function () {
        recursivelyLoadImports(language, divId, importsRemaining, done);
      });
    }
    else if (nextImport === 'graphviz') {
      window.smartdownJSModules.graphviz.loader(function () {
        recursivelyLoadImports(language, divId, importsRemaining, done);
      });
    }
    else {
      loadExternal(nextImport, nextImportIsModule, function () {
        recursivelyLoadImports(language, divId, importsRemaining, done);
      });
    }
  }
  else if (done) {
    done();
  }
}

export default function playPlayable(language, divId) {
  // console.log('playPlayable', divId);
  const playable = smartdown.perPageState.playablesRegistered[divId];
  if (playable) {
    const importsRemaining = playable.imports.slice(0);  // Copy

    const progress = document.getElementById(playable.progressId);
    progress.style.display = playable.targetDivId ? 'inline-block' : 'block';

    recursivelyLoadImports(language, divId, importsRemaining, function() {
      progress.style.display = 'none';
      playPlayableInternal(language, divId);
    });
  }
  else {
    console.log('playPlayable... not found', language, divId, smartdown.perPageState.playablesRegistered, perPageState.playablesRegisteredOrder);
  }
}


/* global useBrython */

var Brython;
if (useBrython) {
  function loadBrython(loaded) {
    // console.log('loadBrython...', loaded, JSON.stringify(window.smartdownJSModules.brython.loadedCallbacks, null, 2));
    if (window.smartdownJSModules.brython.loaded) {
      loaded();
    }
    else if (window.smartdownJSModules.brython.loadedCallbacks.length > 0) {
      window.smartdownJSModules.brython.loadedCallbacks.push(loaded);
      // console.log('loadbrython...brython is still loading', JSON.stringify(window.smartdownJSModules.brython.loadedCallbacks, null, 2));
    }
    else {
      window.smartdownJSModules.brython.loadedCallbacks.push(loaded);
      const debugging = false;
      if (debugging) {
        const callThese = window.smartdownJSModules.brython.loadedCallbacks;
        window.smartdownJSModules.brython.loadedCallbacks = [];
        callThese.forEach(loadedCb => {
          loadedCb();
        });
      }
      else {
        window.smartdown.importScriptUrl(
          // 'https://cdn.rawgit.com/brython-dev/brython/3.6.2/www/src/brython.js',
          'smartdownBase:lib/brython.js',
          function(script1) {
            window.smartdown.importScriptUrl(
              // 'https://cdn.rawgit.com/brython-dev/brython/3.6.2/www/src/brython_stdlib.js',
              'smartdownBase:lib/brython_stdlib.js',
              function(script2) {
                Brython = window.brython;
                window.smartdownJSModules.brython.loaded = Brython;
                const callThese = window.smartdownJSModules.brython.loadedCallbacks;
                window.smartdownJSModules.brython.loadedCallbacks = [];
                callThese.forEach(loadedCb => {
                  loadedCb();
                });
              });
          });
      }
    }
  }

  window.smartdownJSModules.brython = {
    loader: loadBrython,
    loaded: null,
    loadedCallbacks: []
  };
}

module.exports = Brython;

/* global window */
/* global useABCJS */
/* global smartdown */

var abcjs = {};
if (useABCJS) {
  function loadabcjs(loaded) {
    if (window.smartdownJSModules.abc.loaded) {
      loaded();
    }
    else if (window.smartdownJSModules.abc.loadedCallbacks.length > 0) {
      window.smartdownJSModules.abc.loadedCallbacks.unshift(loaded);
      console.log('loadabcjs...abc is still loading', JSON.stringify(window.smartdownJSModules.abc.loadedCallbacks, null, 2));
    }
    else {
      window.smartdownJSModules.abc.loadedCallbacks.unshift(loaded);

      window.smartdown.importScriptUrl(
        window.smartdown.baseURL + 'lib/abcjs_midi_5.6.11-min.js',
        function(script) {
          const callThese = window.smartdownJSModules.abc.loadedCallbacks;
          window.smartdownJSModules.abc.loadedCallbacks = [];
          callThese.forEach(loadedCb => {
            loadedCb();
          });
        });
    }
  }

  window.smartdownJSModules.abc = {
    loader: loadabcjs,
    loaded: null,
    loadedCallbacks: []
  };
}

module.exports = abcjs;

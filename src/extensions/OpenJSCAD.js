/* global window */
/* global useOpenJSCAD */
/* global smartdown */

var OpenJSCAD = {};
if (useOpenJSCAD) {
  function loadOpenJSCAD(loaded) {
    // console.log('loadOpenJSCAD...', window.smartdownJSModules.openjscad.loadedCallbacks.length, loaded, JSON.stringify(window.smartdownJSModules.openjscad.loadedCallbacks, null, 2));
    if (window.smartdownJSModules.openjscad.loaded) {
      loaded();
    }
    else if (window.smartdownJSModules.openjscad.loadedCallbacks.length > 0) {
      window.smartdownJSModules.openjscad.loadedCallbacks.push(loaded);
      // console.log('loadopenjscad...openjscad is still loading', JSON.stringify(window.smartdownJSModules.openjscad.loadedCallbacks, null, 2));
    }
    else {
      window.smartdownJSModules.openjscad.loadedCallbacks.push(loaded);

      window.smartdown.importScriptUrl(
        window.smartdown.baseURL + 'lib/openjscad.reentrant.umd.js',
        function(script) {

          const callThese = window.smartdownJSModules.openjscad.loadedCallbacks;
          window.smartdownJSModules.openjscad.loadedCallbacks = [];
          callThese.forEach(loadedCb => {
            loadedCb();
          });
        });
    }
  }

  window.smartdownJSModules.openjscad = {
    loader: loadOpenJSCAD,
    loaded: null,
    loadedCallbacks: []
  };
}

module.exports = OpenJSCAD;

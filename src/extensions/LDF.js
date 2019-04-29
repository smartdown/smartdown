/* global window */
/* global useLDF */

var LDF = {};
if (useLDF) {
  function loadLDF(loaded) {
    // console.log('loadLDF...', loaded, JSON.stringify(window.smartdownJSModules.ldf.loadedCallbacks, null, 2));
    if (window.smartdownJSModules.ldf.loaded) {
      loaded();
    }
    else if (window.smartdownJSModules.ldf.loadedCallbacks.length > 0) {
      window.smartdownJSModules.ldf.loadedCallbacks.unshift(loaded);
      // console.log('loadldf...ldf is still loading', JSON.stringify(window.smartdownJSModules.ldf.loadedCallbacks, null, 2));
    }
    else {
      window.smartdownJSModules.ldf.loadedCallbacks.unshift(loaded);
      // console.log('loadldf...ldf initiate load', window.smartdownJSModules.ldf.loadedCallbacks[0]);
      import(/* webpackChunkName: "ldf" */ 'ldfJS')
        .then(ldf => {
          // console.log('loadldf...import success', ldf, window.smartdownJSModules.ldf.loadedCallbacks[0]);
          window.smartdownJSModules.ldf.loaded = ldf;
          const ldfPackage = ldf;
          Object.keys(ldfPackage).forEach(slot => {
            // console.log('...slot', slot, ldfPackage[slot]);
            LDF[slot] = ldfPackage[slot];
          });

          const callThese = window.smartdownJSModules.ldf.loadedCallbacks;
          window.smartdownJSModules.ldf.loadedCallbacks = [];
          callThese.forEach(loadedCb => {
            loadedCb();
          });
        })
        .catch(error => {
          console.log('loadldf error', error);
        });
    }
  }

  window.smartdownJSModules.ldf = {
    loader: loadLDF,
    loaded: null,
    loadedCallbacks: []
  };
}

module.exports = LDF;

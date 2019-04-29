/* global window */
/* global useThree */

var Three = {};
if (useThree) {
  function loadThree(loaded) {
    // console.log('loadThree...', loaded, JSON.stringify(window.smartdownJSModules.three.loadedCallbacks, null, 2));
    if (window.smartdownJSModules.three.loaded) {
      loaded();
    }
    else if (window.smartdownJSModules.three.loadedCallbacks.length > 0) {
      window.smartdownJSModules.three.loadedCallbacks.unshift(loaded);
      // console.log('loadthree...three is still loading', JSON.stringify(window.smartdownJSModules.three.loadedCallbacks, null, 2));
    }
    else {
      window.smartdownJSModules.three.loadedCallbacks.unshift(loaded);
      // console.log('loadthree...three initiate load', window.smartdownJSModules.three.loadedCallbacks[0]);
      import(/* webpackChunkName: "three" */ 'three')
        .then(three => {
          // console.log('loadthree...import success', three, window.smartdownJSModules.three.loadedCallbacks[0]);
          window.smartdownJSModules.three.loaded = three;
          const threePackage = three;
          Object.keys(threePackage).forEach(slot => {
            // console.log('...slot', slot, threePackage[slot]);
            Three[slot] = threePackage[slot];
          });

          const callThese = window.smartdownJSModules.three.loadedCallbacks;
          window.smartdownJSModules.three.loadedCallbacks = [];
          callThese.forEach(loadedCb => {
            loadedCb();
          });
        })
        .catch(error => {
          console.log('loadthree error', error);
        });
    }
  }

  window.smartdownJSModules.three = {
    loader: loadThree,
    loaded: null,
    loadedCallbacks: []
  };
}

module.exports = Three;

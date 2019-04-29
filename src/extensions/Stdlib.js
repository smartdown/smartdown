/* global window */
/* global useStdlib */

var Stdlib = {};
if (useStdlib) {
  Stdlib.vdomToHtml = require('vdom-to-html');
  Stdlib.datasets = {
    'stopwords-en': require('stdlibDatasets/stopwords-en'),
  };

  Stdlib.loadSOTU = function loadSOTU(loaded) {
    // require.ensure(
    //  dependencies: String[],
    //  callback: function(require),
    //  errorCallback: function(error),
    //  chunkName: String)
    // require.ensure(
    //   [],
    //   function (require) {
    //     const sotu = require('@stdlib/datasets/sotu/lib/browser_db.js');
    //     Stdlib.datasets['sotu-data'] = sotu;
    //     loaded();
    //   },
    //   function (error) {
    //     console.log('loadSOTU error', error);
    //   },
    //   'stdlib-sotu',
    // );

    import(/* webpackChunkName: "stdlib-sotu" */ 'stdlibSOTU')  // @stdlib/datasets/sotu/lib/browser_db.js')
    // import('stdlibSOTU')  // @stdlib/datasets/sotu/lib/browser_db.js')
      .then(sotu => {
        // console.log('loadSOTU success', Stdlib, sotu, sotu.default);
        Stdlib.datasets['sotu-data'] = sotu.default;
        loaded();
      })
      .catch(error => {
        console.log('loadSOTU error', error);
      });
  };

  function loadStdlib(loaded) {
    // console.log('loadStdlib...', loaded, JSON.stringify(window.smartdownJSModules.stdlib.loadedCallbacks, null, 2));
    if (window.smartdownJSModules.stdlib.loaded) {
      loaded();
    }
    else if (window.smartdownJSModules.stdlib.loadedCallbacks.length > 0) {
      window.smartdownJSModules.stdlib.loadedCallbacks.unshift(loaded);
      // console.log('loadStdlib...stdlib is still loading', JSON.stringify(jsModules.stdlib.loadedCallbacks, null, 2));
    }
    else {
      window.smartdownJSModules.stdlib.loadedCallbacks.unshift(loaded);
      // console.log('loadStdlib...stdlib initiate load', window.smartdownJSModules.stdlib.loadedCallbacks[0]);
      import(/* webpackChunkName: "stdlib" */ '@stdlib/stdlib/dist/stdlib-tree.min.js')
      // import('@stdlib/stdlib/dist/stdlib-tree.min.js')
        .then(stdlib => {
          // console.log('loadStdlib...import success', window.smartdownJSModules.stdlib.loadedCallbacks[0]);
          // console.log(stdlib);
          window.smartdownJSModules.stdlib.loaded = stdlib.default;
          const stdlibPackage = stdlib.default;
          Object.keys(stdlibPackage).forEach(slot => {
            // console.log('...slot', slot, stdlibPackage[slot]);
            Stdlib[slot] = stdlibPackage[slot];
          });

          const callThese = window.smartdownJSModules.stdlib.loadedCallbacks;
          window.smartdownJSModules.stdlib.loadedCallbacks = [];
          callThese.forEach(loadedCb => {
            loadedCb();
          });
        })
        .catch(error => {
          console.log('loadStdlib error', error);
        });
    }
  }

  // Stdlib.loadStdlib = loadStdlib;
  window.smartdownJSModules.stdlib = {
    loader: loadStdlib,
    loaded: null,
    loadedCallbacks: []
  };
}

module.exports = Stdlib;

/* global window */
/* global useD3 */

var D3 = {};
if (useD3) {
  function loadD3(loaded) {
    // console.log('loadD3...', loaded, JSON.stringify(window.smartdownJSModules.d3.loadedCallbacks, null, 2));
    if (window.smartdownJSModules.d3.loaded) {
      loaded();
    }
    else if (window.smartdownJSModules.d3.loadedCallbacks.length > 0) {
      window.smartdownJSModules.d3.loadedCallbacks.push(loaded);
      // console.log('loadd3...d3 is still loading', JSON.stringify(window.smartdownJSModules.d3.loadedCallbacks, null, 2));
    }
    else {
      window.smartdownJSModules.d3.loadedCallbacks.push(loaded);

      // console.log('loadD3...D3 initiate load');
      import(/* webpackChunkName: "d3" */ 'd3JS')
        .then(d3 => {
          // console.log('loadD3...import success', d3);
          window.smartdownJSModules.d3.loaded = d3;
          window.d3v5 = window.d3 = d3;
          window.smartdown.d3v5 = window.smartdown.d3 = window.d3v5;

          import(/* webpackChunkName: "d3cloudJS" */ 'd3cloudJS')
            .then(d3cloud => {
              // console.log('loadD3 d3cloud...import success', d3cloud);
              window.d3cloud = d3cloud.default;
              window.smartdown.d3cloud = window.d3cloud;

              import(/* webpackChunkName: "topojson" */ 'topojson')
                .then(topojson => {
                  // console.log('loadD3 topojson...import success', topojson);
                  window.topojson = topojson;
                  window.smartdown.topojson = window.topojson;

                  const wcl = window.smartdown.baseURL + 'lib/webcomponents-loader.js';
                  window.smartdown.importScriptUrl(
                    wcl,
                    function(script1) {
                      import(/* webpackChunkName: "d3fc" */ 'd3fcJS')
                        .then(d3fc => {
                          // console.log('loadD3 d3fc...import success', d3fc);
                          window.d3fc = d3fc;
                          window.smartdown.d3fc = window.d3fc;

                          import(/* webpackChunkName: "d3dc" */ 'd3dcJS')
                            .then(d3dc => {
                              // console.log('loadD3 d3fc...import success', d3dc);
                              window.d3dc = d3dc;
                              window.smartdown.d3dc = window.d3dc;
                              window.d3dc.config.defaultColors(window.d3v5.schemeAccent);

                              import(/* webpackChunkName: "d3dcCSS" */ 'd3dcCSS')
                                .then(d3dcCSS => {
                                  // console.log('loadD3 d3dcCSS...import success', d3dcCSS);

                                  const callThese = window.smartdownJSModules.d3.loadedCallbacks;
                                  window.smartdownJSModules.d3.loadedCallbacks = [];
                                  callThese.forEach(loadedCb => {
                                    loadedCb();
                                  });
                                })
                                .catch(error => {
                                  console.log('loadD3 d3dcCSS error', error);
                                });
                            })
                            .catch(error => {
                              console.log('loadD3 d3dc error', error);
                            });
                        })
                        .catch(error => {
                          console.log('loadD3 d3fc error', error);
                        });
                    });
                })
                .catch(error => {
                  console.log('loadD3 topojson error', error);
                });
            })
            .catch(error => {
              console.log('loadD3 d3cloud error', error);
            });

        })
        .catch(error => {
          console.log('loadD3 error', error);
        });
    }
  }

  window.smartdownJSModules.d3 = {
    loader: loadD3,
    loaded: null,
    loadedCallbacks: []
  };
}

module.exports = D3;

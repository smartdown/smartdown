/* global window */
/* global useGraphviz */

const each = window.lodashEach = require('lodash/forEach');

// https://github.com/mdaines/viz.js/wiki/API#render-options
var graphvizImages = [];
function registerMediaWithGraphviz() {
  each(window.mediaRegistry, function (data, _key) {
    //     graphvizFiles.push({
    //       path: data.url,
    //       data:
    // `
    // <?xml version="1.0" encoding="UTF-8" standalone="no"?>
    // <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
    // <svg height="100" width="100">
    //   <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
    //   Sorry, your browser does not support inline SVG.
    // </svg>
    // `
    //     });
    // console.log('registerMediaWithGraphviz', key, data.url);
    graphvizImages.push({
      path: data.url,
      width: '200px',
      height: '200px'
    });
  });
  window.graphvizImages = graphvizImages;
}

if (useGraphviz) {
  function loadGraphviz(loaded) {
    // console.log('loadGraphviz...', loaded, JSON.stringify(window.smartdownJSModules.graphviz.loadedCallbacks, null, 2));
    if (window.smartdownJSModules.graphviz.loaded) {
      loaded();
    }
    else if (window.smartdownJSModules.graphviz.loadedCallbacks.length > 0) {
      window.smartdownJSModules.graphviz.loadedCallbacks.unshift(loaded);
      // console.log('loadgraphviz...graphviz is still loading', JSON.stringify(window.smartdownJSModules.graphviz.loadedCallbacks, null, 2));
    }
    else {
      window.smartdownJSModules.graphviz.loadedCallbacks.unshift(loaded);
      window.smartdown.importScriptUrl(
        window.smartdown.baseURL + 'lib/viz.js',
        function(script1) {
          window.smartdown.importScriptUrl(
            window.smartdown.baseURL + 'lib/lite.render.js',
            function(script2) {
              registerMediaWithGraphviz();
              const callThese = window.smartdownJSModules.graphviz.loadedCallbacks;
              window.smartdownJSModules.graphviz.loadedCallbacks = [];
              callThese.forEach(loadedCb => {
                loadedCb();
              });
            });
        });
    }
  }

  window.smartdownJSModules.graphviz = {
    loader: loadGraphviz,
    loaded: null,
    loadedCallbacks: []
  };
}

module.exports = graphvizImages;

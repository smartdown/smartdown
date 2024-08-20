import each from 'lodash/forEach';
 window.lodashEach = each;

// https://github.com/mdaines/viz.js/wiki/API#render-options
const graphvizImages = [];
function registerMediaWithGraphviz() {
  each(window.mediaRegistry, function (data,) {
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

function loadGraphviz(loaded) {
  // console.log('loadGraphviz...', loaded, JSON.stringify(window.smartdownJSModules.graphviz.loadedCallbacks, null, 2));
  if (window.smartdownJSModules.graphviz.loaded) {
    loaded();
  }
  else if (window.smartdownJSModules.graphviz.loadedCallbacks.length > 0) {
    window.smartdownJSModules.graphviz.loadedCallbacks.push(loaded);
    // console.log('loadgraphviz...graphviz is still loading', JSON.stringify(window.smartdownJSModules.graphviz.loadedCallbacks, null, 2));
  }
  else {
    window.smartdownJSModules.graphviz.loadedCallbacks.push(loaded);
    window.smartdown.importScriptUrl(
      'smartdownBase:lib/viz.js',
      function() {
        window.smartdown.importScriptUrl(
          'smartdownBase:lib/lite.render.js',
          function() {
            registerMediaWithGraphviz();
            const callThese = window.smartdownJSModules.graphviz.loadedCallbacks;
            window.smartdownJSModules.graphviz.loadedCallbacks = [];
            callThese.forEach((loadedCb) => {
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

export default graphvizImages;

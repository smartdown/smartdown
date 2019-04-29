/* global window */
/* global usePlotly */

var Plotly = {};
if (usePlotly) {
  function loadPlotly(loaded) {
    // console.log('loadPlotly...', window.smartdownJSModules.plotly.loadedCallbacks.length, loaded, JSON.stringify(window.smartdownJSModules.plotly.loadedCallbacks, null, 2));
    if (window.smartdownJSModules.plotly.loaded) {
      loaded();
    }
    else if (window.smartdownJSModules.plotly.loadedCallbacks.length > 0) {
      window.smartdownJSModules.plotly.loadedCallbacks.unshift(loaded);
      // console.log('loadplotly...plotly is still loading', JSON.stringify(window.smartdownJSModules.plotly.loadedCallbacks, null, 2));
    }
    else {
      window.smartdownJSModules.plotly.loadedCallbacks.unshift(loaded);

      window.smartdown.importScriptUrl(
        'https://cdn.plot.ly/plotly-latest.min.js',
        function(script) {
          /* global Plotly */

          const plotlyPackage = window.Plotly;
          Object.keys(plotlyPackage).forEach(slot => {
            // console.log('...slot', slot, plotlyPackage[slot]);
            Plotly[slot] = plotlyPackage[slot];
          });

          // console.log('loaded Plotly', plotlyPackage, window, Plotly);
          if (window.d3v5) {
            var d3sankey = require('d3-sankey');
            window.d3v5.sankey = d3sankey.sankey;
          }

          // Undo any ill effects from Plotly's MathJax config.
          window.smartdown.mathjaxConfigure();
          const callThese = window.smartdownJSModules.plotly.loadedCallbacks;
          window.smartdownJSModules.plotly.loadedCallbacks = [];
          callThese.forEach(loadedCb => {
            loadedCb();
          });
        });
    }
  }

  window.smartdownJSModules.plotly = {
    loader: loadPlotly,
    loaded: null,
    loadedCallbacks: []
  };
}

module.exports = Plotly;

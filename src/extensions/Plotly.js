import {registerExtension} from '../extensions';

export default function registerPlotly() {
  registerExtension(
    'plotly',
    [
      'https://cdn.plot.ly/plotly-latest.min.js',
      function() {
        // Undo any ill effects from Plotly's MathJax config.
        window.smartdown.mathjaxConfigure();
      },
    ]);
}

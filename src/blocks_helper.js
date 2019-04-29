/* global smartdownBaseURL */
/* global document */
/* global window */

var baseURL = 'https://smartdown.site/';
if (typeof smartdownBaseURL === 'string') {
  baseURL = smartdownBaseURL;
}

var starterScript = baseURL + 'lib/starter.js';
var head = document.head || document.getElementsByTagName('head')[0];
var script = document.createElement('script');
script.type = 'text/javascript';
script.src = starterScript;
script.onerror = function loadError(error) {
  throw new URIError('The script ' + error.target.src + ' is not accessible.');
};
script.onload = function (x) {
  window.smartdownStarter();
};
head.appendChild(script);

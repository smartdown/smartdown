/* global smartdownBaseURL */

let baseURL = 'https://smartdown.site/';
if (typeof smartdownBaseURL === 'string') {
  baseURL = smartdownBaseURL;
}

const starterScript = baseURL + 'lib/starter.js';
const head = document.head || document.getElementsByTagName('head')[0];
const script = document.createElement('script');
script.type = 'text/javascript';
script.src = starterScript;
script.onerror = function loadError(error) {
  throw new URIError('The script ' + error.target.src + ' is not accessible.');
};
script.onload = function () {
  window.smartdownStarter();
};
head.appendChild(script);

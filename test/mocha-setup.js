/* setup.js */

// https://github.com/jsdom/jsdom#advanced-configuration
//
// This customization file may eventually be necessary, but right
// now it is not, and it is causing errors during Mocha testing.
//
// To use it (in the future):
//  BUILD=test node_modules/.bin/mocha-webpack \
//    --timeout 25000 \
//    -r test/mocha-setup.js test/mocha/*.spec.js
//

const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const resourceLoader = new jsdom.ResourceLoader({
  strictSSL: false,
  userAgent: 'Node.js'
});

const jsdomOpts = {
  runScripts: 'dangerously',
  url: 'https://localhost',
  resources: resourceLoader
};

const jsdomInstance = new JSDOM('<!doctype html><html><body></body></html>', jsdomOpts);
const { window } = jsdomInstance;

global.window = window;
global.document = window.document;
global.navigator = window.navigator;

/*
function copyProps(src, target) {
  Object.defineProperties(target, {
    ...Object.getOwnPropertyDescriptors(src),
    ...Object.getOwnPropertyDescriptors(target),
  });
}


global.requestAnimationFrame = function (callback) {
  return setTimeout(callback, 0);
};
global.cancelAnimationFrame = function (id) {
  clearTimeout(id);
};
copyProps(window, global);
*/

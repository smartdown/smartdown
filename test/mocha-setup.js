/* setup.js */

// https://github.com/jsdom/jsdom#advanced-configuration

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

function copyProps(src, target) {
  Object.defineProperties(target, {
    ...Object.getOwnPropertyDescriptors(src),
    ...Object.getOwnPropertyDescriptors(target),
  });
}

global.window = window;
global.document = window.document;

global.requestAnimationFrame = function (callback) {
  return setTimeout(callback, 0);
};
global.cancelAnimationFrame = function (id) {
  clearTimeout(id);
};
copyProps(window, global);

/* setup.js */

// https://github.com/jsdom/jsdom#advanced-configuration

const jsdom = require('jsdom');

const { JSDOM } = jsdom;

// class CustomResourceLoader extends jsdom.ResourceLoader {
//   fetch(url, options) {
//     console.log('#fetch', url, options);
//     // Override the contents of this script to do something unusual.
//     // if (url === "https://example.com/some-specific-script.js") {
//     //   return Promise.resolve(Buffer.from("window.someGlobal = 5;"));
//     // }

//     return super.fetch(url, options);
//   }
// }

const resourceLoader = new jsdom.ResourceLoader({
  // proxy: "https://localhost:4000",
  strictSSL: false,
  userAgent: 'Node.js'
});

const jsdomOpts = {
  runScripts: 'dangerously', // 'outside-only',
  url: 'https://mochalocalhost',
  resources: resourceLoader
};

const jsdomInstance = new JSDOM('<!doctype html><html><body></body></html>', jsdomOpts);
const { window } = jsdomInstance;

global.window = window;
global.document = window.document;
global.navigator = window.navigator;
global.HTMLAnchorElement = window.HTMLAnchorElement;

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

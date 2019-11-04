import {registerExtension} from 'extensions';

export default function registerTypeScript() {
  registerExtension(
    'typescript',
    [
      'https://cdn.jsdelivr.net/npm/typescript@3.6.4/lib/typescript.min.js',
    ]);
}


///* global window */
///* global useTypeScript */
///* global smartdown */
//
//var TypeScript = {};
//if (useTypeScript) {
//  function loadTypeScript(loaded) {
//    // console.log('loadTypeScript...', window.smartdownJSModules.typescript.loadedCallbacks.length, loaded, JSON.stringify(window.smartdownJSModules.typescript.loadedCallbacks, null, 2));
//    if (window.smartdownJSModules.typescript.loaded) {
//      loaded();
//    }
//    else if (window.smartdownJSModules.typescript.loadedCallbacks.length > 0) {
//      window.smartdownJSModules.typescript.loadedCallbacks.push(loaded);
//      // console.log('loadtypescript...typescript is still loading', JSON.stringify(window.smartdownJSModules.typescript.loadedCallbacks, null, 2));
//    }
//    else {
//      window.smartdownJSModules.typescript.loadedCallbacks.push(loaded);
//
//      console.log('loading typescript');
//      window.smartdown.importScriptUrl(
//        'https://cdn.jsdelivr.net/npm/typescript@3.6.4/lib/typescript.min.js',
//        function(s) {
//          console.log('loaded typescript', window, s);
//
//          const callThese = window.smartdownJSModules.typescript.loadedCallbacks;
//          // window.smartdownJSModules.typescript.loaded = true;
//          window.smartdownJSModules.typescript.loadedCallbacks = [];
//          callThese.forEach(loadedCb => {
//            loadedCb();
//          });
//        });
//    }
//  }
//
//  window.smartdownJSModules.typescript = {
//    loader: loadTypeScript,
//    loaded: null,
//    loadedCallbacks: []
//  };
//}
//
//module.exports = TypeScript;
//
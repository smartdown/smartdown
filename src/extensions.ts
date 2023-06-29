/* eslint @typescript-eslint/no-explicit-any: 0 */
/* eslint @typescript-eslint/ban-types: 0 */

import {
  importScriptUrl,
  importModuleUrl,
  importCssUrl
} from './importers';

window.smartdownJSModules = {};

const registeredExtensions: any = {};

// https://stackoverflow.com/a/12709880/5667222
declare global {
    interface Window {
      smartdown: any;
      smartdownJSModules: any;
    }
}

export function isExtensionRegistered(name: string): boolean {
  return registeredExtensions[name] !== undefined;
}

/**
 * Register a named extension
 *
 * The external library will not be loaded until ensureExtension()
 * is called.
 *
 * @param {name} - Extension name (e.g., 'd3')
 * @param {resources} - List of URLs to load for this extension
 * @param {configure} - Called after each resource is loaded, to allow for
 * post-load configuration.
 */

export function registerExtension(
  name: string,
  resources: any[],
  configure?: (name: string, index: number, url: string) => void): void {
  if (registeredExtensions[name]) {
    console.log('#registerExtension error: already registered', name, resources);
  }
  else {
    // console.log('#registerExtension: registering', name, resources);

    registeredExtensions[name] = {
      loader: function(): void {
        console.log('Default loader for ', name);
      },
      name: name,
      loaded: false,
      configure: configure,
      resources: resources,
      resourceToLoad: 0,
      loadedCallbacks: []
    };
  }
}


/**
 * Ensure that an extension is loaded
 *
 * Call the {loaded} completion function when the extension is loaded,
 * which may be immediately when this function is called subsequent to
 * a successful load.
 *
 * @param {name} - Extension name (e.g., 'd3')
 * @param {loaded} Called on successful load
 *
 */

function loadResourceList(thisModule: any): void {
  if (thisModule.resources.length <= thisModule.resourceToLoad) {
    // console.log('loadResourceList all resources loaded for ', thisModule.name, thisModule.resourceToLoad, thisModule.resources.length);
    const callThese = thisModule.loadedCallbacks;
    thisModule.loaded = true;
    thisModule.loadedCallbacks = [];
    callThese.forEach((loadedCb: Function) => {
      loadedCb();
    });
  }
  else {
    const resource = thisModule.resources[thisModule.resourceToLoad];
    if (typeof resource === 'string') {
      const url: string = resource;

      if (url.endsWith('.css')) {
        importCssUrl(
          url,
          function() {
            thisModule.resourceToLoad += 1;
            loadResourceList(thisModule);
          },
          function(e: any) {
            console.log('loadResourceList importCssUrl error', thisModule.name, url, e);
          });
      }
      else {
        importScriptUrl(
          url,
          function() {
            thisModule.resourceToLoad += 1;
            loadResourceList(thisModule);
          },
          function(e: any) {
            console.log('loadResourceList importScriptUrl error', thisModule.name, url, e);
          });
      }
    }
    else if (typeof resource === 'function') {
      resource();
      thisModule.resourceToLoad += 1;
      loadResourceList(thisModule);
    }
    else {
      console.log('loadResourceList unknown resource type ', thisModule.name, typeof resource, resource);
    }
  }
}


export function ensureExtension(name: string, loaded: () => void): void {
  if (!registeredExtensions[name]) {
    console.log('#ensureExtension error: not registered', name);
  }
  else {
    // console.log('#ensureExtension', name);
    const thisModule = registeredExtensions[name];

    if (thisModule.loaded) {
      loaded();
    }
    else if (thisModule.loadedCallbacks.length > 0) {
      thisModule.loadedCallbacks.push(loaded);
      // console.log('ensureExtension...External is still loading', name);
    }
    else {
      thisModule.loadedCallbacks.push(loaded);

      loadResourceList(thisModule);
    }
  }
}


/**
 * Load a script URL into the DOM by adding a script element
 *
 * Note that this doesn't check whether the script is already loaded.
 *
 * @param {external} - URL
 * @param {loaded} Called on successful load
 *
 */

export function loadExternal(url: string, isModule: boolean, loaded: () => void): void {
  // console.log('loadExternal...', url, isModule);

  if (!window.smartdownJSModules[url]) {
    window.smartdownJSModules[url] = {
      loader: function(): void {
        console.log('why you callin loadExternal', url);
      },
      loaded: null,
      loadedCallbacks: []
    };
  }

  if (window.smartdownJSModules[url].loaded) {
    loaded();
  }
  else if (window.smartdownJSModules[url].loadedCallbacks.length > 0) {
    window.smartdownJSModules[url].loadedCallbacks.push(loaded);
    // console.log('loadExternal...External is still loading', url);
  }
  else {
    window.smartdownJSModules[url].loadedCallbacks.push(loaded);
    // console.log('loadExternal...External initiate load', url);

    if (url.endsWith('.css')) {
      importCssUrl(
        url,
        function() {
          const callThese = window.smartdownJSModules[url].loadedCallbacks;
          window.smartdownJSModules[url].loaded = true;
          window.smartdownJSModules[url].loadedCallbacks = [];
          callThese.forEach((loadedCb: Function) => {
            loadedCb();
          });
        },
        function(error: string): void {
          console.log('loadExternal...load error', error, url);
        });
    }
    else if (url.endsWith('.js')) {
      if (isModule) {
        importModuleUrl(
          url,
          function() {
            const callThese = window.smartdownJSModules[url].loadedCallbacks;
            window.smartdownJSModules[url].loaded = true;
            window.smartdownJSModules[url].loadedCallbacks = [];
            callThese.forEach((loadedCb: Function) => {
              loadedCb();
            });
          },
          function(error: string): void {
            console.log('loadExternal...load error', error, url);
          });
      }
      else {
        importScriptUrl(
          url,
          function() {
            const callThese = window.smartdownJSModules[url].loadedCallbacks;
            window.smartdownJSModules[url].loaded = true;
            window.smartdownJSModules[url].loadedCallbacks = [];
            callThese.forEach((loadedCb: Function) => {
              loadedCb();
            });
          },
          function(error: string): void {
            console.log('loadExternal...load error', error, url);
          });
      }
    }
    else {
      console.log('loadExternal...unknown extension type: ', url);
    }

  }
}

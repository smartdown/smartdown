import {importScriptUrl} from 'importers';

window.smartdownJSModules = {};

// https://stackoverflow.com/a/12709880/5667222
declare global {
    interface Window {
      smartdown: any;
      smartdownJSModules: any;
    }
}


/**
 * Register a named extension
 *
 * The external library will not be loaded until ensureExtension()
 * is called.
 *
 * @param {name} - Extension name (e.g., 'd3')
 * @param {resources} - List of URLs to load for this extension
 *
 */

export function registerExtension(name: string, resources: string[]): void {
  if (window.smartdownJSModules[name]) {
    console.log('#registerExtension error: already registered', name, resources);
  }
  else {
    console.log('#registerExtension: registering', name, resources);

    window.smartdownJSModules[name] = {
      loader: function(): void {
        console.log('Default loader for ', name);
      },
      loaded: null,
      resources: resources,
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

export function ensureExtension(name: string, loaded: () => void): void {
  if (!window.smartdownJSModules[name]) {
    console.log('#ensureExtension error: not registered', name);
  }
  else {
    console.log('#ensureExtension', name);

    if (window.smartdownJSModules[name].loaded) {
      loaded();
    }
    else if (window.smartdownJSModules[name].loadedCallbacks.length > 0) {
      window.smartdownJSModules[name].loadedCallbacks.push(loaded);
      // console.log('ensureExtension...External is still loading', name);
    }
    else {
      window.smartdownJSModules[name].loadedCallbacks.push(loaded);

      let url: string = window.smartdownJSModules[name].resources[0];
      if (url.indexOf('http') === 0) {  // Should be a regex.. FIXME
        url = window.smartdown.baseURL + url;
      }

      console.log('ensureExtension...External initiate load', name, url);

      importScriptUrl(
        url,
        function() {
          console.log('ensureExtension...load complete', name, url);
          const callThese = window.smartdownJSModules[name].loadedCallbacks;
          window.smartdownJSModules[name].loaded = true;
          window.smartdownJSModules[name].loadedCallbacks = [];
          callThese.forEach((loadedCb: Function) => {
            loadedCb();
          });
        },
        function(error: string): void {
          console.log('#ensureExtension load error:', error, name);
        });
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

export function loadExternal(external: string, loaded: () => void): void {
  // console.log('loadExternal...', external);
  if (!window.smartdownJSModules[external]) {
    window.smartdownJSModules[external] = {
      loader: function(): void {
        console.log('why you callin loadExternal', external);
      },
      loaded: null,
      loadedCallbacks: []
    };
  }

  if (window.smartdownJSModules[external].loaded) {
    loaded();
  }
  else if (window.smartdownJSModules[external].loadedCallbacks.length > 0) {
    window.smartdownJSModules[external].loadedCallbacks.push(loaded);
    // console.log('loadExternal...External is still loading', external);
  }
  else {
    window.smartdownJSModules[external].loadedCallbacks.push(loaded);
    // console.log('loadExternal...External initiate load', external);

    importScriptUrl(
      external,
      function() {
        // console.log('loadExternal...load complete', external);
        const callThese = window.smartdownJSModules[external].loadedCallbacks;
        window.smartdownJSModules[external].loaded = true;
        window.smartdownJSModules[external].loadedCallbacks = [];
        callThese.forEach((loadedCb: Function) => {
          loadedCb();
        });
      },
      function(error: string): void {
        console.log('loadExternal...load error', error);
      });
  }
}

import {importScriptUrl} from 'importers';

window.smartdownJSModules = {};

// https://stackoverflow.com/a/12709880/5667222
declare global {
    interface Window {
      smartdownJSModules: any;
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

/* eslint @typescript-eslint/ban-types: 0 */

/**
 * Load a script URL into the DOM by adding a script element
 *
 * Note that this doesn't check whether the script is already loaded.
 *
 * @param {sSrc} - URL
 * @param {fOnload} Called on successful load
 * @param {fOnerror} Called on error
 *
 */

function expandSrc(sSrc: string): string {
  const basePrefix = 'smartdownBase:';
  let expandedSrc = sSrc;
  if (expandedSrc.indexOf(basePrefix) === 0) {
    expandedSrc = window.smartdown.baseURL + expandedSrc.slice(basePrefix.length);
  }

  return expandedSrc;
}


function importScriptUrlWithModule(sSrc: string, isModule: boolean, fOnload: Function, fOnerror: Function): void {
  const oHead = document.head || document.getElementsByTagName('head')[0];
  const expandedSrc = expandSrc(sSrc);

  function loadError(oError: Event | string): void {
    if (fOnerror) {
      console.log('calling fOnerror');
      fOnerror(oError);
    }
    else {
      throw new URIError('The script ' + expandedSrc + ' is not accessible.');
    }
  }

  const oScript = document.createElement('script');
  oScript.type = isModule ? 'module' : 'text\/javascript';
  oScript.onerror = loadError;
  oScript.async = true;
  oScript.src = expandedSrc; // Do this last

  if (fOnload) {
    oScript.onload = function (evt: Event): void {
      fOnload(evt);
    };
  }

  (oHead as any).appendChild(oScript);

}

export function importScriptUrl(sSrc: string, fOnload: Function, fOnerror: Function): void {
  importScriptUrlWithModule(sSrc, false, fOnload, fOnerror);
}


export function importModuleUrl(sSrc: string, fOnload: Function, fOnerror: Function): void {
  importScriptUrlWithModule(sSrc, true, fOnload, fOnerror);
}


/**
 * Load the contents of a URL via XMLHttpRequest
 *
 * If successful, the {fOnload} function is called with the text
 * returned from the request.
 *
 * If error, the {fOnerror} function is called with the error code.
 *
 * @param {sSrc} - URL
 * @param {fOnload} Called on successful load
 * @param {fOnerror} Called on error
 *
 */

export function importTextUrl(sSrc: string, fOnload: (error: string) => void, fOnerror: Function): void {
  const expandedSrc = expandSrc(sSrc);

  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function (): void {
    if (this.readyState === 4) {
      if (this.status === 200) {
        fOnload(this.responseText);
      }
      else {
        fOnerror(this.status);
      }
    }
  };
  xhr.open('GET', expandedSrc);
  xhr.send();
}


export function importCssCode(cssCode: string): void {
  const styleElement: HTMLStyleElement = document.createElement('style');
  styleElement.type = 'text/css';
  (styleElement as any).appendChild(document.createTextNode(cssCode));
  (document.getElementsByTagName('head')[0] as any).appendChild(styleElement);
}


export function importCssUrl(sSrc: string, fOnload: Function, fOnerror: Function): void {
  const oHead = document.head || document.getElementsByTagName('head')[0];

  const expandedSrc = expandSrc(sSrc);

  function loadError(oError: Event | string): void {
    if (fOnerror) {
      console.log('calling fOnerror');
      fOnerror(oError);
    }
    else {
      throw new URIError('The stylesheet ' + expandedSrc + ' is not accessible.');
    }
  }

  const oLink: HTMLLinkElement = document.createElement('link');
  oLink.rel  = 'stylesheet';
  oLink.type = 'text/css';
  oLink.onerror = loadError;
  oLink.href = expandedSrc;
  (oHead as any).appendChild(oLink);
  if (fOnload) {
    oLink.onload = function (evt: Event): void {
      fOnload(evt);
    };
  }
}

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

export function importScriptUrl(sSrc: string, fOnload: Function, fOnerror: Function): void {
  var oHead = document.head || document.getElementsByTagName('head')[0];
  function loadError(oError: Event | string): void {
    if (fOnerror) {
      console.log('calling fOnerror');
      fOnerror(oError);
    }
    else {
      throw new URIError('The script ' + sSrc + ' is not accessible.');
    }
  }

  var oScript = document.createElement('script');
  oScript.type = 'text\/javascript';
  oScript.onerror = loadError;
  oScript.async = true;
  oScript.src = sSrc;
  oHead.appendChild(oScript);
  if (fOnload) {
    oScript.onload = function (evt: Event): void {
      console.log
      fOnload(evt);
    };
  }
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

export function importTextUrl(url: string, fOnload: (error: string) => void, fOnerror: Function): void {
  // console.log('importTextUrl', url);
  var xhr = new XMLHttpRequest();
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
  xhr.open('GET', url);
  xhr.send();
}


export function importCssCode(cssCode: string): void {
  var styleElement = document.createElement('style') as HTMLStyleElement;
  styleElement.type = 'text/css';
  styleElement.appendChild(document.createTextNode(cssCode));
  document.getElementsByTagName('head')[0].appendChild(styleElement);
}


export function importCssUrl(href: string, fOnload: Function, fOnerror: Function): void {
  var oHead = document.head || document.getElementsByTagName('head')[0];
  function loadError(oError: Event | string): void {
    if (fOnerror) {
      console.log('calling fOnerror');
      fOnerror(oError);
    }
    else {
      throw new URIError('The stylesheet ' + href + ' is not accessible.');
    }
  }

  var oLink = document.createElement('link');
  oLink.rel  = 'stylesheet';
  oLink.type = 'text/css';
  oLink.onerror = loadError;
  oLink.href = href;
  oHead.appendChild(oLink);
  if (fOnload) {
    oLink.onload = function (evt: Event): void {
      console.log
      fOnload(evt);
    };
  }
}

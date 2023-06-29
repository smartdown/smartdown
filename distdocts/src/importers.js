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
function expandSrc(sSrc) {
    var basePrefix = 'smartdownBase:';
    var expandedSrc = sSrc;
    if (expandedSrc.indexOf(basePrefix) === 0) {
        expandedSrc = window.smartdown.baseURL + expandedSrc.slice(basePrefix.length);
    }
    return expandedSrc;
}
function importScriptUrlWithModule(sSrc, isModule, fOnload, fOnerror) {
    var oHead = document.head || document.getElementsByTagName('head')[0];
    var expandedSrc = expandSrc(sSrc);
    function loadError(oError) {
        if (fOnerror) {
            console.log('calling fOnerror');
            fOnerror(oError);
        }
        else {
            throw new URIError('The script ' + expandedSrc + ' is not accessible.');
        }
    }
    var oScript = document.createElement('script');
    oScript.type = isModule ? 'module' : 'text/javascript';
    oScript.onerror = loadError;
    oScript.async = true;
    oScript.src = expandedSrc; // Do this last
    if (fOnload) {
        oScript.onload = function (evt) {
            fOnload(evt);
        };
    }
    oHead.appendChild(oScript);
}
export function importScriptUrl(sSrc, fOnload, fOnerror) {
    importScriptUrlWithModule(sSrc, false, fOnload, fOnerror);
}
export function importModuleUrl(sSrc, fOnload, fOnerror) {
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
export function importTextUrl(sSrc, fOnload, fOnerror) {
    var expandedSrc = expandSrc(sSrc);
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
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
export function importCssCode(cssCode) {
    var styleElement = document.createElement('style');
    styleElement.type = 'text/css';
    styleElement.appendChild(document.createTextNode(cssCode));
    document.getElementsByTagName('head')[0].appendChild(styleElement);
}
export function importCssUrl(sSrc, fOnload, fOnerror) {
    var oHead = document.head || document.getElementsByTagName('head')[0];
    var expandedSrc = expandSrc(sSrc);
    function loadError(oError) {
        if (fOnerror) {
            console.log('calling fOnerror');
            fOnerror(oError);
        }
        else {
            throw new URIError('The stylesheet ' + expandedSrc + ' is not accessible.');
        }
    }
    var oLink = document.createElement('link');
    oLink.rel = 'stylesheet';
    oLink.type = 'text/css';
    oLink.onerror = loadError;
    oLink.href = expandedSrc;
    oHead.appendChild(oLink);
    if (fOnload) {
        oLink.onload = function (evt) {
            fOnload(evt);
        };
    }
}
//# sourceMappingURL=importers.js.map
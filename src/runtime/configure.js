/* global smartdown */
/* xglobal useFileSaver */
/* global useMathJax */

import StackTrace from 'stacktrace-js/dist/stacktrace.min';

import {
  importScriptUrl,
  // importModuleUrl,
  // importTextUrl,
  // importCssCode,
  // importCssUrl,
} from '../importers';
import mathjaxConfigure from '../extensions/MathJax';
import globalState from '../util/globalState';
import setLinkRules from '../util/setLinkRules';
import expandHrefWithLinkRules from '../util/expandHrefWithLinkRules';
import setVisibility from '../util/setVisibility';
import enhanceMarkedAndOpts from '../util/enhanceMarkedAndOpts';

/**
 * Configure the smartdown runtime.
 *
 * This function should be called once per page, and is responsible
 * for loading Smartdown and its dependent libraries, initializing per-page
 * data structures, and optionally loading an initial Smartdown document.
 * Upon the asynchronous completion of these tasks, the loadedHandler
 * will be called.
 *
 * @param {object} [options={}] - Configuration options
 * @param {object} options.media - media
 * @param {string} options.baseURL - baseURL
 * @param {function} options.cardLoader
 * This cardLoader function is called whenever Smartdown needs to load
 * a new Smartdown document into a particular div. This can be on initial
 * load, and via the result of a {@link tunnel} operation.
 * @param {object} options.calcHandlers - calcHandlers
 * @param {object} options.linkRules - linkRules
 * @param {function} [loadedHandler=null] - Called when loading and configuration
 * is completed.
 *
 */

export default function configure(options, loadedHandler) {
  function svgLoaded() {
    const sourceText = this.responseText;
    const svgMedia = smartdown.mediaRegistry[this.svgKey];
    svgMedia.svgData = sourceText;
    svgMedia.type = 'svginline';
  }

  global.smartdown = window.smartdown; // Needed for MochaJS/JSDom usage

  smartdown.currentRenderDiv = null;
  smartdown.currentBackpatches = {};
  smartdown.smartdownCells = {};
  smartdown.smartdownVariables = {};
  smartdown.uniqueCellIndex = 0;
  smartdown.mediaRegistry = {};

  const media = options.media;
  const _baseURL = options.baseURL;
  const _cardLoader = options.cardLoader;
  const _calcHandlers = options.calcHandlers;
  const _linkRules = options.linkRules;

  window.smartdown.baseURL = _baseURL || (window.location.origin + '/');
  window.xypicURL = options.xypicURL || (window.smartdown.baseURL + 'lib/xypic.js');

  const handleVisibilityChange = () => {
    setVisibility(!document.hidden);
  };

  document.addEventListener('visibilitychange', handleVisibilityChange);

  if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
    document.querySelector('meta[name=viewport]')
      .setAttribute(
        'content',
        'initial-scale=1.0001, minimum-scale=1.0001, maximum-scale=1.0001, user-scalable=no'
      );
  }

  globalState.cardLoader = _cardLoader;
  globalState.calcHandlers = _calcHandlers;

  if (_linkRules) {
    setLinkRules(_linkRules);
  }

  smartdown.mediaRegistry = media || {};
  window.mediaRegistry = smartdown.mediaRegistry;

  /* global MathJax */
  /* eslint new-cap: 0 */
  /* eslint no-native-reassign: 0 */
  /* eslint no-trailing-spaces: 0 */
  
  Object.keys(smartdown.mediaRegistry).forEach((key) => {
    const url = smartdown.mediaRegistry[key];
    smartdown.mediaRegistry[key] = {
      type: '',
      url: '',
      expandedurl: '',
      svgData: '',
    };

    if (url.indexOf('<svg ') === 0) {
      smartdown.mediaRegistry[key].type = 'svg';
      smartdown.mediaRegistry[key].url = key;
      smartdown.mediaRegistry[key].expandedurl = key;
      smartdown.mediaRegistry[key].svgData = url;
    }
    else if (url.endsWith('.svg')) {
      const oReq = new XMLHttpRequest();
      oReq.svgKey = key;
      oReq.addEventListener('load', svgLoaded);
      smartdown.mediaRegistry[key].type = 'svg';
      smartdown.mediaRegistry[key].url = url;
      smartdown.mediaRegistry[key].expandedurl = expandHrefWithLinkRules(url);
      oReq.open('GET', smartdown.mediaRegistry[key].expandedurl);
      oReq.send();
    }
    else {
      smartdown.mediaRegistry[key].type = 'url';
      smartdown.mediaRegistry[key].url = url;
      smartdown.mediaRegistry[key].expandedurl = expandHrefWithLinkRules(url);
    }
  });

  const st = StackTrace.getSync();
  let currentBase = st[0].fileName;
  if (currentBase.indexOf('http') === -1) {
    // hack because stacktrace doesn't work with safari on unpkg.com
    currentBase = window.smartdown.baseURL + 'lib/smartdown.js';
    // console.log('currentBase adjusted because stacktrace.js does not like Safari', currentBase);
  }
  const lastSlash = currentBase.lastIndexOf('/');
  __webpack_public_path__ = currentBase.slice(0, lastSlash + 1);
  // console.log('__webpack_# smartdown.configurepublic_path__', __webpack_public_path__, currentBase);

  if (window.smartdown.baseURL === 'https://mochalocalhost/') {
    window.xypicURL = 'https://unpkg.com/smartdown/dist/lib/xypic.js';
  }

  window.MathJax = global.MathJax = {
    delayStartupUntil: 'configured',
    AuthorInit: function() {
      const MathJax = window.MathJax;
      MathJax.Ajax.fileRev = function (file) {
        let ver = MathJax.cdnFileVersions[file] || MathJax.cdnVersion || '';
        if (ver) {
          ver = '?ver=' + ver;
        }
        if (file.indexOf('xypic.js') !== -1) {
          ver = '';
        }
        return ver;
      };
    }
  };

  function completeStartup() {
    enhanceMarkedAndOpts();
    window.setTimeout(() => {
      loadedHandler();
    }, 0);
  }

  if (useMathJax) {
    const mathjaxURL = 'https://cdn.jsdelivr.net/npm/mathjax@2/MathJax.js?config=TeX-MML-AM_HTMLorMML-full&delayStartupUntil=configured';

    importScriptUrl(
      mathjaxURL,
      // xyjax doesn't work here
      function() {
        mathjaxConfigure();

        MathJax.Hub.Register.StartupHook(
          'End',
          function() {
            completeStartup();
          });

        MathJax.Hub.Configured();
      });
  }
  else {
    completeStartup();
  }
}


/* global smartdown */
/* global window */
/* global document */
/* global smartdownBaseURL */
/* global smartdownDefaultHome */
/* global smartdownGistPathPrefix */
/* global smartdownGistHashPrefix */
/* global smartdownResourceURL */
/* global smartdownRawPrefix */
/* global smartdownOutputDivSelector */
/* global smartdownPostLoadMutator */
/* global smartdownMedia */
/* global XMLHttpRequest */
/* eslint no-var: 0 */

var themeName = '';

/**
 * A convenient way to initialize Smartdown with common defaults.
 *
 * Although smartdown.configure() can be used directly by certain applications,
 * for many of the common Smartdown examples, this starter.js file can be used
 * to invoke smartdown.configure() with credible default behavior, and the ability
 * to customize this behavior to a reasonable degree.
 *
 * @param {object} [basePrefix=undefined] - Configuration options
 *
 * @example
 * // Use the smartdown/starter.js convenience wrapper to initialize smartdown.
 * // See smartdown/src/SimpleSiteExample/ for usage within an index.html.
 * <script src="lib/starter.js"></script>
 * <script>
 *   window.smartdownResourceURL = '';
 *   window.smartdownBaseURL = '/';
 *   window.smartdownStarter();
 * </script>
 */

function starter(basePrefix) {
  var defaultHome = 'Home';
  var baseURL = 'https://smartdown.site/';
  var resourceURL = baseURL + 'lib/resources/';
  var rawPrefix = window.location.origin + window.location.pathname;
  var gistPathPrefix = '';
  var gistHashPrefix = 'gist/';
  var outputDivSelector = '#smartdown-output';
  var postLoadMutator = null;
  var media = {
    cloud: '/gallery/resources/cloud.jpg',
    badge: '/gallery/resources/badge.svg',
    hypercube: '/gallery/resources/Hypercube.svg',
    StalactiteStalagmite: '/gallery/resources/StalactiteStalagmite.svg',
    church: '/gallery/resources/church.svg',
    lighthouse: '/gallery/resources/lighthouse.svg',
    barn: '/gallery/resources/barn.svg',
    'medieval-gate': '/gallery/resources/medieval-gate.svg'
  };
  var multiparts = {};
  var inhibitHash = '';
  var gistOrg = '';
  var gistID = '';


  if (typeof smartdownBaseURL === 'string') {
    baseURL = smartdownBaseURL;
  }
  if (typeof smartdownResourceURL === 'string') {
    resourceURL = smartdownResourceURL;
  }
  if (typeof smartdownDefaultHome === 'string') {
    defaultHome = smartdownDefaultHome;
  }
  if (typeof smartdownGistPathPrefix === 'string') {
    gistPathPrefix = smartdownGistPathPrefix;
  }
  if (typeof smartdownGistHashPrefix === 'string') {
    gistHashPrefix = smartdownGistHashPrefix;
  }
  if (typeof smartdownRawPrefix === 'string') {
    rawPrefix = smartdownRawPrefix;
  }
  if (typeof smartdownOutputDivSelector === 'string') {
    outputDivSelector = smartdownOutputDivSelector;
  }
  if (typeof smartdownPostLoadMutator === 'function') {
    postLoadMutator = smartdownPostLoadMutator;
  }

  if (typeof smartdownMedia === 'object') {
    media = Object.assign(media, smartdownMedia);
  }

  var lastLoadedRawPrefix = rawPrefix;

  /* Common code above between inline/blocks helpers */

  function cardLoaded(sourceText, cardKey, cardURL) {
    if (postLoadMutator) {
      sourceText = postLoadMutator(sourceText, cardKey, cardURL, defaultHome);
    }
    multiparts = smartdown.partitionMultipart(sourceText);
    var output = document.querySelectorAll(outputDivSelector)[0];
    inhibitHash = '#' + cardKey;
    if (lastLoadedRawPrefix !== rawPrefix) {
      inhibitHash = '#' + cardURL;
      // console.log('inhibitHash', inhibitHash);
    }
    if (inhibitHash !== window.location.hash) {
      // console.log('inhibitHash', inhibitHash, window.location.hash);
      window.location.hash = inhibitHash;
    }
    if (themeName !== '') {
      window.location.search = `?theme=${themeName}`;
    }
    // console.log('cardLoaded', cardKey, window.location.hash, window.location.search, window.location);

    let defaultPart = '_default_';
    if (cardKey.indexOf(':') >= 0) {
      const keyParts = cardKey.split(':');
      defaultPart = keyParts[keyParts.length - 1];
    }
    smartdown.setHome(multiparts[defaultPart], output, function() {
      document.body.scrollTop = 0; // For Chrome, Safari and Opera
      document.documentElement.scrollTop = 0; // For IE and Firefox

      if (!output.id) {
        output.id = 'smartdown-output-' + String(Math.random()).slice(2);
      }
      smartdown.startAutoplay(output);
    });
  }

  function loadAsyncCard(cardKey, cardURL) {
    // console.log('loadAsyncCard', cardKey, cardURL);
    var oReq = new XMLHttpRequest();
    oReq.addEventListener('load', function() {
      cardLoaded(this.responseText, cardKey, cardURL);
    });
    oReq.open('GET', cardURL);
    oReq.send();
  }


  function relativeCardLoader(cardKey) {
    // console.log('relativeCardLoader', cardKey, window.location.hash, window.location.pathname);
    cardKey = cardKey.replace(/#/g, '');
    // console.log('# cardKey', cardKey);
    // console.log('# lastLoadedRawPrefix', lastLoadedRawPrefix);
    // console.log('# gistPathPrefix', gistPathPrefix);
    // console.log('# gistHashPrefix', gistHashPrefix);
    // console.log('# window.location.pathname', window.location.pathname);
    // var re = '^/?(' + gistPathPrefix + ')?' + gistHashPrefix + '([^/]+)/([^/]+)(/(\\w*))?$';
    var re = '^/?(' + gistPathPrefix + ')?' + gistHashPrefix + '([^/]+)/([^/]+)(/(\\w*))?$';
    // var re = `^/?(${gistPathPrefix})?${gistHashPrefix}([^/]+)/([^/]+)(/(\\w*))?$`;
    var gistRE = new RegExp(re, 'g');
    var match = gistRE.exec(cardKey);
    if (match) {
      // console.log('#re match', cardKey, re, window.location.pathname, match);
      gistOrg = match[2];
      gistID = match[3];
      var newCardKey = match[5] || 'Home';
      // console.log('cardKey', cardKey, gistOrg, gistID, newCardKey);
      cardKey = newCardKey;
    }

    var part = multiparts[cardKey];
    if (part) {
      var output = document.querySelectorAll(outputDivSelector)[0];
      smartdown.setHome(part, output, function() {
        if (!output.id) {
          output.id = 'smartdown-output-' + String(Math.random()).slice(2);
        }
        smartdown.startAutoplay(output);
      });
    }
    else if (cardKey.indexOf('http') === 0) {
      gistOrg = '';
      gistID = '';
      var endOfPath = cardKey.lastIndexOf('/');
      if (endOfPath > 0) {
        lastLoadedRawPrefix = cardKey.slice(0, endOfPath + 1);
        // console.log('...lastLoadedRawPrefix1', lastLoadedRawPrefix);
      }
      loadAsyncCard(cardKey, cardKey);
    }
    else if (cardKey.indexOf('/') === 0) {
      gistOrg = '';
      gistID = '';
      lastLoadedRawPrefix = rawPrefix;
      // console.log('...lastLoadedRawPrefix2', lastLoadedRawPrefix);
      loadAsyncCard(cardKey, cardKey);
    }
    else if (gistOrg !== '' && gistID !== '') {
      var gistAPIBase = 'https://api.github.com/gists/' + gistID;
      // console.log('gistAPIBase', gistAPIBase);

      var oReq = new XMLHttpRequest();
      oReq.addEventListener('load', function() {
        var gistResponse = JSON.parse(this.responseText);
        // console.log('gist Response', gistResponse);
        var gistFile = gistResponse.files[cardKey + '.md'];
        if (!gistFile) {
          console.log('Unable to locate Gist for "', cardKey, '" ', gistAPIBase);
        }
        else {
          // console.log('gistFile', gistFile);
          var gistFileURL = gistFile.raw_url;
          cardKey = gistHashPrefix + gistOrg + '/' + gistID + '/' + cardKey;
          loadAsyncCard(cardKey, gistFileURL);
        }
      });
      oReq.open('GET', gistAPIBase);
      oReq.send();
    }
    else {
      gistOrg = '';
      gistID = '';
      var suffix = (cardKey === '') ? '' : (cardKey + '.md');
      var cardURL = lastLoadedRawPrefix + suffix;
      loadAsyncCard(cardKey, cardURL);
    }
  }

  function loadHome(baseHash) {
    var hash = window.location.hash;
    if (baseHash) {
      var hashElements = hash.split('/');
      // console.log('hashElements', hashElements);
      var baseHashElements = baseHash.split('/');
      // console.log('baseHashElements', baseHashElements);

      hash = baseHash;
      if (baseHashElements.length === 4 &&
          hashElements.length === 4) {
        baseHashElements[3] = hashElements[3];
        hash = baseHashElements.join('/');
        // console.log('newHash', hash);
      }
    }
    var search = window.location.search;
    // console.log('loadHome', hash, search);
    var args = '';
    var argsPos = hash.indexOf('?');
    if (argsPos >= 0) {
      args = hash.slice(argsPos + 1);
      hash = hash.slice(0, argsPos);
      // console.log('loadHome hashargs', hash, args, window.location.search);
      if (args.indexOf('theme=') === 0) {
        themeName = args.slice('theme='.length);
        console.log('args themeName', themeName);
      }
    }

    if (themeName === '') {
      if (search.indexOf('?theme=') === 0) {
        themeName = search.slice('?theme='.length);
        console.log('search themeName', themeName);
      }
    }

    var container = document.getElementById('smartdown-outer-container');
    if (container) {
      container.classList.remove('smartdown-theme-chat');
      container.classList.remove('smartdown-theme-dark');

      if (themeName !== '') {
        container.classList.add('smartdown-theme-' + themeName);
      }
    }

    if (hash === '') {
      hash = defaultHome;
    }
    relativeCardLoader(hash);
  }

  var calcHandlers = smartdown.defaultCalcHandlers;
  var replace = rawPrefix;
  function gistPrefix() {
    var result = lastLoadedRawPrefix;
    var hash = window.location.hash;
    var args = '';
    var argsPos = hash.indexOf('?');
    if (argsPos >= 0) {
      args = hash.slice(argsPos);
      hash = hash.slice(0, argsPos);
      // console.log('gistPrefix hashargs', hash, args, window.location.search);
    }

    /* eslint-disable block-scoped-var */
    /* eslint-disable no-redeclare */
    if (gistPathPrefix.length > 0 && window.location.pathname.endsWith(gistPathPrefix)) {
      var re = '^/?(' + gistPathPrefix + ')?' + gistHashPrefix + '([^/]+)/([^/]+)(/(\\w*))?$';
      var gistRE = new RegExp(re, 'g');
      var match = gistRE.exec(hash);
      if (match) {
        var matchGistOrg = match[2].replace('#', '');
        var matchGistID = match[3];
        result = 'https://gist.githubusercontent.com/' + matchGistOrg + '/' + matchGistID + '/raw/';
      }
    }
    else if (gistHashPrefix.length > 0 && hash.indexOf('#' + gistHashPrefix) === 0) {
      var re = '^#' + gistHashPrefix + '([^/]+)/([^/]+)(/(\\w*))?$';
      var gistRE = new RegExp(re, 'g');
      var match = gistRE.exec(hash);
      if (match) {
        var matchGistOrg = match[1];
        var matchGistID = match[2];
        result = 'https://gist.githubusercontent.com/' + matchGistOrg + '/' + matchGistID + '/raw/';
      }
    }
    /* eslint-enable block-scoped-var */
    /* eslint-enable no-redeclare */

    return result;
  }


  const linkRules = [
    {
      prefix: '/block/',
      replace: gistPrefix
    },
    {
      prefix: 'block/',
      replace: gistPrefix
    },
    {
      prefix: 'assets/',
      replace: replace + 'assets/'
    },
    {
      prefix: '/assets/',
      replace: replace + 'assets/'
    },
    {
      prefix: 'content/',
      replace: replace + 'content/'
    },
    {
      prefix: '/content/',
      replace: replace + 'content/'
    },
    {
      prefix: '/gallery/resources/',
      replace: resourceURL === '' ? '/gallery/resources/' : resourceURL
    },
    {
      prefix: '/gallery/DataElements.csv',
      replace: baseURL === '/smartdown/' ? '/smartdown/gallery/DataElements.csv' : '/gallery/DataElements.csv'
    },
    {
      prefix: '/resources/',
      replace: resourceURL === '' ? '/resources/' : resourceURL
    },
  ];

  function locationHashChanged() {
    // console.log('locationHashChanged', window.location.hash, window.location.pathname, inhibitHash);
    var hash = window.location.hash;
    var args = '';
    var argsPos = hash.indexOf('?');
    if (argsPos >= 0) {
      args = hash.slice(argsPos + 1);
      hash = hash.slice(0, argsPos);
      if (args.indexOf('theme=') === 0) {
        themeName = args.slice('theme='.length);
        console.log('hashchange themeName', themeName);
      }

      var container = document.getElementById('smartdown-outer-container');
      if (container) {
        container.classList.remove('smartdown-theme-chat');
        container.classList.remove('smartdown-theme-dark');

        if (themeName !== '') {
          container.classList.add('smartdown-theme-' + themeName);
        }
      }
    }

    if (inhibitHash === hash) {
      // console.log('...locationHashChanged INHIBIT', window.location.hash, hash, inhibitHash);
    }
    else {
      // console.log('...locationHashChanged', window.location.hash, hash, inhibitHash);
      var cardKey = hash.slice(1);
      if (cardKey.indexOf('/') === -1) {
        gistOrg = '';
        gistID = '';
      }

      if (cardKey === '') {
        cardKey = defaultHome;
      }
      relativeCardLoader(cardKey);
    }

    return false;
  }

  window.onhashchange = locationHashChanged;
  // window.onpopstate = locationHashChanged;

  function loadHomeDefault() {
    loadHome(basePrefix);
  }
  smartdown.initialize(media, baseURL, loadHomeDefault, relativeCardLoader, calcHandlers, linkRules);
}

window.smartdownStarter = starter;

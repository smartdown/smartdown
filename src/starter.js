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


function scrollToSubHash(cardKeySubhash) {
  let scrollToTop = true;

  if (cardKeySubhash) {
    const target = document.getElementById(cardKeySubhash);
    if (target) {
      scrollToTop = false;
      window.setTimeout(() => {
        target.scrollIntoView({
          behavior: 'smooth',
        });
      }, 300);
    }
  }

  if (scrollToTop) {
    window.scrollTo({top: 0, behavior: 'smooth'});

    // document.body.scrollTop = 0; // For Chrome, Safari and Opera
    // document.documentElement.scrollTop = 0; // For IE and Firefox
  }
}


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
 * <script src="lib/starter.js">< /script>
 * <script>
 *   window.smartdownResourceURL = '';
 *   window.smartdownBaseURL = '/';
 *   window.smartdownStarter();
 * < /script>
 */


function starter(basePrefix, doneHandler) {
  var defaultHome = 'Home';

  var baseURL = 'https://unpkg.com/smartdown/dist/';
  var resourceURL = baseURL + 'lib/resources/';
  var rawPrefix = window.location.origin + window.location.pathname;
  var gistPathPrefix = '';
  var gistHashPrefix = 'gist/';
  var outputDivSelector = '#smartdown-output';
  var postLoadMutator = null;
  var adjustHash = true;
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
  var rootHash = '';
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
  if (typeof smartdownAdjustHash === 'boolean') {
    adjustHash = smartdownAdjustHash;
  }

  if (typeof smartdownMedia === 'object') {
    media = Object.assign(media, smartdownMedia);
  }

  var lastLoadedRawPrefix = rawPrefix;

  /* Common code above between inline/blocks helpers */

  function cardLoaded(sourceText, cardKey, cardURL, outputDivId, cardKeySubhash) {
    // console.log('cardLoaded', cardURL, cardKey, cardKeySubhash);
    if (postLoadMutator) {
      sourceText = postLoadMutator(sourceText, cardKey, cardURL, defaultHome);
    }
    multiparts = smartdown.partitionMultipart(sourceText);
    var output = document.getElementById(outputDivId);
    rootHash = '#' + cardKey;
    if (lastLoadedRawPrefix !== rawPrefix) {
      rootHash = '#' + cardURL;
      // console.log('rootHash', rootHash);
    }

    // if (adjustHash &&
    //     window.location.hash.indexOf(rootHash) !== 0) {
    //   if (window.location.hash.indexOf('#SD_') === 0) {
    //     window.location.hash = `${rootHash}${window.location.hash}`;
    //   }
    //   else {
    //     window.location.hash = rootHash;
    //   }
    // }

    if (themeName !== '') {
      window.location.search = `?theme=${themeName}`;
    }

    let defaultPart = '_default_';
    if (cardKey.indexOf('http:') !== 0 &&
        cardKey.indexOf('https:') !== 0 &&
        cardKey.indexOf(':') >= 0) {
      const keyParts = cardKey.split(':');
      defaultPart = keyParts[keyParts.length - 1];
    }

    // console.log(sourceText);
    // console.log('defaultPart', defaultPart);
    // console.log(JSON.stringify(multiparts, null, 2));
    smartdown.setHome(multiparts[defaultPart], output, function() {
      let newHash = '#' + cardKey;

      if (cardKeySubhash && cardKeySubhash !== 'undefined') {
        newHash += '#' + cardKeySubhash;
      }

      history.pushState({}, '', newHash);
      scrollToSubHash(cardKeySubhash);

      if (!output.id) {
        output.id = 'smartdown-output-' + String(Math.random()).slice(2);
      }
      smartdown.startAutoplay(output);
    });
  }

  function loadAsyncCard(cardKey, cardURL, outputDivId, cardKeySubhash) {
    // console.log('loadAsyncCard', cardKey, cardURL, cardKeySubhash, rootHash, outputDivId);

    var oReq = new XMLHttpRequest();
    oReq.addEventListener('load', function() {
      cardLoaded(this.responseText, cardKey, cardURL, outputDivId, cardKeySubhash);
    });
    oReq.open('GET', cardURL);
    oReq.send();
  }


  function relativeCardLoader(cardKeyWithHash, outputDivId) {
    // console.log('relativeCardLoader', rootHash, cardKeyWithHash);

    let cardKey = null;
    let cardKeySubhash = null;
    if (cardKeyWithHash.indexOf('#') !== 0) {
      cardKeyWithHash = '#' + cardKeyWithHash;
    }

    const cardKeyHashParts = cardKeyWithHash.split('#');

    if (cardKeyHashParts.length > 1) {
      cardKey = cardKeyHashParts[1];
      cardKeySubhash = cardKeyHashParts[2];

      if (rootHash !== '' && ('#' + cardKey) === rootHash) {
        history.replaceState({}, '', cardKeyWithHash);
        scrollToSubHash(cardKeySubhash);

        return;
      }
      else {
        // console.log('empty roothash', cardKeyWithHash, cardKey, rootHash, cardKeySubhash);
      }
    }
    else {
      console.log('... illformatted cardKeyWithHash', cardKeyWithHash);
    }

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
      }
      loadAsyncCard(cardKey, cardKey, outputDivId, cardKeySubhash);
    }
    else if (cardKey.indexOf('/') === 0) {
      gistOrg = '';
      gistID = '';
      lastLoadedRawPrefix = rawPrefix;
      // console.log('...lastLoadedRawPrefix2', lastLoadedRawPrefix);
      loadAsyncCard(cardKey, cardKey, outputDivId);
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
          lastLoadedRawPrefix = 'https://gist.githubusercontent.com/' + gistOrg + '/' + gistID + '/raw/';

          loadAsyncCard(cardKey, gistFileURL, outputDivId, cardKeySubhash);
        }
      });
      oReq.open('GET', gistAPIBase);
      oReq.send();
    }
    else if (cardKey.indexOf(':') >= 0) {
      const keyParts = cardKey.split(':');
      const loadableKey = keyParts.slice(0, -1).join(':');
      const suffix = (loadableKey === '') ? '' : (loadableKey + '.md');
      const cardURL = lastLoadedRawPrefix + suffix;
      loadAsyncCard(cardKey, cardURL, outputDivId, cardKeySubhash);
    }
    else {
      gistOrg = '';
      gistID = '';
      const suffix = cardKey.endsWith('.md') ? '' : '.md';
      let cardURL = lastLoadedRawPrefix + cardKey + suffix;

      // Hack for Solid
      if (lastLoadedRawPrefix.endsWith('/public/smartdown/')) {
        const parts = lastLoadedRawPrefix.split('/');
        const minusLastPart = parts.slice(0, -2).join('/');
        cardURL = minusLastPart + '/' + cardKey + suffix;
      }

      loadAsyncCard(cardKey, cardURL, outputDivId, cardKeySubhash);
    }
  }


  function updateTheme(themeName) {
    var container = document.getElementById('smartdown-outer-container');
    if (container) {
      if (themeName !== '') {
        [...container.classList].forEach(c => {
          if (c.indexOf('smartdown-theme-') === 0) {
            // console.log('updateTheme: Removing class ', c);
            container.classList.remove(c);
          }
        });
        container.classList.add(`smartdown-theme-${themeName}`);
      }
    }
  }

  function loadHome(baseHash) {
    var hash = window.location.hash;
    if (baseHash) {
      var hashElements = hash.split('/');
      var baseHashElements = baseHash.split('/');

      hash = baseHash;
      if (baseHashElements.length === 4 &&
          hashElements.length === 4) {
        baseHashElements[3] = hashElements[3];
        hash = baseHashElements.join('/');
      }
    }
    var search = window.location.search;
    // console.log('loadHome', hash, search);
    var args = '';
    var argsPos = hash.indexOf('?');
    if (argsPos >= 0) {
      args = hash.slice(argsPos + 1);
      hash = hash.slice(0, argsPos);
      if (args.indexOf('theme=') === 0) {
        themeName = args.slice('theme='.length);
      }
    }

    if (themeName === '') {
      if (search.indexOf('?theme=') === 0) {
        themeName = search.slice('?theme='.length);
      }
    }

    updateTheme(themeName);

    if (hash === '') {
      hash = defaultHome;
    }

    relativeCardLoader(hash, document.querySelectorAll(outputDivSelector)[0].id);
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
    else if (hash.indexOf('#https://gist.githubusercontent.com/') === 0) {
      var re = '^#https://gist.githubusercontent.com/([^/]+)/([^/]+)/.*$';
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

    // console.log('gistPrefix', result, lastLoadedRawPrefix, hash);

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

  function locationHashChanged(event) {
    // console.log('#locationHashChanged', event, window.location.href, window.location.hash, window.location.pathname, rootHash);
    event.preventDefault();
    event.stopImmediatePropagation();

    var hash = window.location.hash;
    var args = '';
    var argsPos = hash.indexOf('?');
    if (argsPos >= 0) {
      args = hash.slice(argsPos + 1);
      hash = hash.slice(0, argsPos);
      if (args.indexOf('theme=') === 0) {
        themeName = args.slice('theme='.length);
        updateTheme(themeName);
      }
    }

    if (rootHash === hash) {
      // console.log('...locationHashChanged INHIBIT', window.location.hash, hash, rootHash);
      scrollToSubHash();
    }
    else {
      var cardKey = hash.slice(1);

      if (cardKey === '') {
        cardKey = defaultHome;
      }
      else if (cardKey.indexOf('/') === -1) {
        gistOrg = '';
        gistID = '';
        cardKey = '#' + cardKey;
      }

      let cardKeySubhash = null;
      const cardKeyHashParts = cardKey.split('#');

      if (cardKeyHashParts.length > 1) {
        cardKey = cardKeyHashParts[1];
        cardKeySubhash = cardKeyHashParts[2];

        if (cardKey === '') {
          cardKey = rootHash;
        }

        cardKey = cardKey + '#' + cardKeySubhash;
      }

      relativeCardLoader(cardKey, document.querySelectorAll(outputDivSelector)[0].id);
    }

    return false;
  }

  window.onhashchange = locationHashChanged;
  // window.onpopstate = locationHashChanged;

  function loadHomeDefault() {
    loadHome(basePrefix);
  }

  if (!doneHandler) {
    doneHandler = loadHomeDefault;
  }
  // console.log(JSON.stringify(media, null, 2));
  // console.log(JSON.stringify(linkRules, null, 2));
  smartdown.initialize(media, baseURL, doneHandler, relativeCardLoader, calcHandlers, linkRules);
}

window.smartdownStarter = starter;

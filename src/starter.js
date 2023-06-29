/* global smartdown */
/* global smartdownBaseURL */
/* global smartdownDefaultHome */
/* global smartdownGistPathPrefix */
/* global smartdownGistHashPrefix */
/* global smartdownResourceURL */
/* global smartdownRawPrefix */
/* global smartdownOutputDivSelector */
/* global smartdownPostLoadMutator */
/* global smartdownMedia */

let currentThemeName = '';

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
  let defaultHome = 'Home';
  let baseURL = 'https://unpkg.com/smartdown/dist/';
  let resourceURL = baseURL + 'lib/resources/';
  let rawPrefix = window.location.origin + window.location.pathname;
  let gistPathPrefix = '';
  let gistHashPrefix = 'gist/';
  let outputDivSelector = '#smartdown-output';
  let postLoadMutator = null;
  let media = {
    cloud: '/gallery/resources/cloud.jpg',
    badge: '/gallery/resources/badge.svg',
    hypercube: '/gallery/resources/Hypercube.svg',
    StalactiteStalagmite: '/gallery/resources/StalactiteStalagmite.svg',
    church: '/gallery/resources/church.svg',
    lighthouse: '/gallery/resources/lighthouse.svg',
    barn: '/gallery/resources/barn.svg',
    'medieval-gate': '/gallery/resources/medieval-gate.svg'
  };
  let multiparts = {};
  let rootHash = '';
  let gistOrg = '';
  let gistID = '';


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

  let lastLoadedRawPrefix = rawPrefix;

  /* Common code above between inline/blocks helpers */

  function cardLoaded(sourceText, cardKey, cardURL, outputDivId, cardKeySubhash) {
    // console.log('cardLoaded', cardURL, cardKey, cardKeySubhash);
    if (postLoadMutator) {
      sourceText = postLoadMutator(sourceText, cardKey, cardURL, defaultHome);
    }
    multiparts = smartdown.partitionMultipart(sourceText);
    const output = document.getElementById(outputDivId);
    rootHash = '#' + cardKey;
    if (lastLoadedRawPrefix !== rawPrefix) {
      rootHash = '#' + cardURL;
      // console.log('rootHash', rootHash);
    }

    let search = window.location.search;
    if (currentThemeName !== '') {
      search = `?theme=${currentThemeName}`;
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

      // console.log('newHash ignored', newHash, cardKeySubhash, window.location.pathname);
      window.history.pushState({}, '', window.location.pathname + newHash + search);
      scrollToSubHash(cardKeySubhash);

      if (!output.id) {
        output.id = 'smartdown-output-' + String(Math.random()).slice(2);
      }
      smartdown.startAutoplay(output);
    });
  }

  function loadAsyncCard(cardKey, cardURL, outputDivId, cardKeySubhash) {
    // console.log('loadAsyncCard', cardKey, cardURL, cardKeySubhash, rootHash, outputDivId);

    const oReq = new XMLHttpRequest();
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
      if (cardKeySubhash) {
        cardKeySubhash = cardKeySubhash.split('?')[0];
      }

      if (rootHash !== '' && ('#' + cardKey) === rootHash) {
        window.history.replaceState({}, '', window.location.pathname + cardKeyWithHash);
        scrollToSubHash(cardKeySubhash);

        return;
      }
      // else
      // {
      //   // console.log('empty roothash', cardKeyWithHash, cardKey, rootHash, cardKeySubhash);
      // }
    }
    else {
      console.log('... illformatted cardKeyWithHash', cardKeyWithHash);
    }

    // console.log('# cardKey', cardKey);
    // console.log('# lastLoadedRawPrefix', lastLoadedRawPrefix);
    // console.log('# gistPathPrefix', gistPathPrefix);
    // console.log('# gistHashPrefix', gistHashPrefix);
    // console.log('# window.location.pathname', window.location.pathname);
    // const re = '^/?(' + gistPathPrefix + ')?' + gistHashPrefix + '([^/]+)/([^/]+)(/(\\w*))?$';
    const re = '^/?(' + gistPathPrefix + ')?' + gistHashPrefix + '([^/]+)/([^/]+)(/(\\w*))?$';
    // const re = `^/?(${gistPathPrefix})?${gistHashPrefix}([^/]+)/([^/]+)(/(\\w*))?$`;
    const gistRE = new RegExp(re, 'g');
    const match = gistRE.exec(cardKey);
    if (match) {
      // console.log('#re match', cardKey, re, window.location.pathname, match);
      gistOrg = match[2];
      gistID = match[3];
      const newCardKey = match[5] || 'Home';
      // console.log('cardKey', cardKey, gistOrg, gistID, newCardKey);
      cardKey = newCardKey;
    }

    const part = multiparts[cardKey];
    if (part) {
      const output = document.querySelectorAll(outputDivSelector)[0];
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
      const endOfPath = cardKey.lastIndexOf('/');
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
      const gistAPIBase = 'https://api.github.com/gists/' + gistID;
      // console.log('gistAPIBase', gistAPIBase);

      const oReq = new XMLHttpRequest();
      oReq.addEventListener('load', function() {
        const gistResponse = JSON.parse(this.responseText);
        // console.log('gist Response', gistResponse);
        const gistFile = gistResponse.files[cardKey + '.md'];
        if (!gistFile) {
          console.log('Unable to locate Gist for "', cardKey, '" ', gistAPIBase);
        }
        else {
          // console.log('gistFile', gistFile);
          const gistFileURL = gistFile.raw_url;
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

  function updateTheme(newThemeName) {
    const container = document.getElementById('smartdown-outer-container');
    if (container) {
      if (newThemeName !== '') {
        [...container.classList].forEach((c) => {
          if (c.indexOf('smartdown-theme-') === 0) {
            // console.log('updateTheme: Removing class ', c);
            container.classList.remove(c);
          }
        });
        container.classList.add(`smartdown-theme-${newThemeName}`);
      }
    }
  }

  function loadHome(baseHash) {
    let hash = window.location.hash;
    if (baseHash) {
      const hashElements = hash.split('/');
      const baseHashElements = baseHash.split('/');

      hash = baseHash;
      if (baseHashElements.length === 4 &&
          hashElements.length === 4) {
        baseHashElements[3] = hashElements[3];
        hash = baseHashElements.join('/');
      }
    }

    // https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
    // https://localhost:4000/#Astronomy?theme=dark?theme=dark


    // console.log(searchParams.has('topic'));               // true
    // console.log(searchParams.get('topic') === "api");     // true
    // console.log(searchParams.getAll('topic'));            // ["api"]
    // console.log(searchParams.get('foo') === null);        // true
    // console.log(searchParams.append('topic', 'webdev'));

    let args = '';
    const argsPos = hash.indexOf('?');
    if (argsPos >= 0) {
      args = hash.slice(argsPos + 1);
      hash = hash.slice(0, argsPos);

      const extraArgPos = args.indexOf('?');

      if (extraArgPos >= 0) {
        args = args.slice(0, extraArgPos);
      }

      const argsParams = new URLSearchParams(args);
      currentThemeName = argsParams.get('theme') || '';
    }

    if (currentThemeName === '') {
      const search = window.location.search;
      const searchParams = new URLSearchParams(search);
      currentThemeName = searchParams.get('theme') || '';
    }

    updateTheme(currentThemeName);

    if (hash === '') {
      hash = defaultHome;
    }

    relativeCardLoader(hash, document.querySelectorAll(outputDivSelector)[0].id);
  }

  const calcHandlers = smartdown.defaultCalcHandlers;
  const replace = rawPrefix;
  function gistPrefix() {
    let result = lastLoadedRawPrefix;
    let hash = window.location.hash;
    // const args = '';
    const argsPos = hash.indexOf('?');
    if (argsPos >= 0) {
      // args = hash.slice(argsPos);
      hash = hash.slice(0, argsPos);
      // console.log('gistPrefix hashargs', hash, args, window.location.search);
    }

    if (gistPathPrefix.length > 0 && window.location.pathname.endsWith(gistPathPrefix)) {
      const re = '^/?(' + gistPathPrefix + ')?' + gistHashPrefix + '([^/]+)/([^/]+)(/(\\w*))?$';
      const gistRE = new RegExp(re, 'g');
      const match = gistRE.exec(hash);
      if (match) {
        const matchGistOrg = match[2].replace('#', '');
        const matchGistID = match[3];
        result = 'https://gist.githubusercontent.com/' + matchGistOrg + '/' + matchGistID + '/raw/';
      }
    }
    else if (gistHashPrefix.length > 0 && hash.indexOf('#' + gistHashPrefix) === 0) {
      const re = '^#' + gistHashPrefix + '([^/]+)/([^/]+)(/(\\w*))?$';
      const gistRE = new RegExp(re, 'g');
      const match = gistRE.exec(hash);
      if (match) {
        const matchGistOrg = match[1];
        const matchGistID = match[2];
        result = 'https://gist.githubusercontent.com/' + matchGistOrg + '/' + matchGistID + '/raw/';
      }
    }
    else if (hash.indexOf('#https://gist.githubusercontent.com/') === 0) {
      const re = '^#https://gist.githubusercontent.com/([^/]+)/([^/]+)/.*$';
      const gistRE = new RegExp(re, 'g');
      const match = gistRE.exec(hash);
      if (match) {
        const matchGistOrg = match[1];
        const matchGistID = match[2];
        result = 'https://gist.githubusercontent.com/' + matchGistOrg + '/' + matchGistID + '/raw/';
      }
    }

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
    // console.log('#locationHashChanged', event, window.location.href, window.location.hash, JSON.stringify(window.location.search), window.location.pathname, rootHash);

    const oldURL = event.oldURL;
    const oldHashPos = oldURL.indexOf('#');
    const oldSearchPos = oldURL.indexOf('?');
    let oldSearch = '';
    if (oldSearchPos >= 0) {
      if (oldHashPos > oldSearchPos) {
        oldSearch = oldURL.slice(oldSearchPos, oldHashPos - 1);
      }
      else {
        oldSearch = oldURL.slice(oldSearchPos);
      }

      // console.log('oldURL', oldURL, oldSearch, oldHashPos, oldSearchPos);
    }

    let hash = window.location.hash;
    let args = '';
    const argsPos = hash.indexOf('?');
    if (argsPos >= 0) {
      args = hash.slice(argsPos + 1);
      hash = hash.slice(0, argsPos);
      if (args.indexOf('theme=') === 0) {
        currentThemeName = args.slice('theme='.length);
        updateTheme(currentThemeName);
      }
    }

    if (rootHash === hash) {
      console.log('...locationHashChanged INHIBIT', window.location.hash, hash, rootHash);
      scrollToSubHash();
    }
    else {
      let cardKey = hash.slice(1);

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

        cardKey = cardKey + '#' + cardKeySubhash + oldSearch;
      }

      relativeCardLoader(cardKey, document.querySelectorAll(outputDivSelector)[0].id);
      event.preventDefault();
      event.stopImmediatePropagation();
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

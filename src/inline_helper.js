/* eslint-disable */
/* global smartdown */
var defaultHome = 'Home';
var baseURL = 'https://smartdown.site/';
if (typeof smartdownBaseURL === 'string') {
  baseURL = smartdownBaseURL;
}
if (typeof smartdownDefaultHome === 'string') {
  defaultHome = smartdownDefaultHome;
}

/* Stuff needed for inline-mode */

var scriptMap;
var gistPathPrefix = '';
var gistHashPrefix = 'gist/';

function cardLoaded(sourceText, cardKey, cardURL) {
  document.body.scrollTop = 0; // For Chrome, Safari and Opera
  document.documentElement.scrollTop = 0; // For IE and Firefox
  /* eslint no-invalid-this: 0 */
  multiparts = smartdown.partitionMultipart(sourceText);
  var output = document.getElementById('smartdown-output');
  smartdown.setHome(multiparts._default_, output, function() {
    document.body.scrollTop = 0; // For Chrome, Safari and Opera
    document.documentElement.scrollTop = 0; // For IE and Firefox
    smartdown.startAutoplay(output);
    inhibitHash = '#' + cardKey;
    window.location.hash = inhibitHash;
  });
}


function loadAsyncCard(cardKey, cardURL) {
  // console.log('loadAsyncCard', cardKey, cardURL);
  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", function() {
    cardLoaded(this.responseText, cardKey, cardURL);
  });
  oReq.open("GET", cardURL);
  oReq.send();
}



function relativeCardLoaderInline(cardKey) {
  var re = `^/?(${gistPathPrefix})?${gistHashPrefix}([^/]+)/([^/]+)(/(\\w*))?$`;
  var gistRE = new RegExp(re, 'g');
  var match = gistRE.exec(cardKey);
  if (match) {
    gistOrg = match[2];
    gistID = match[3];
    var newCardKey = match[5] || 'Home';
    // console.log('cardKey', cardKey, gistOrg, gistID, newCardKey);
    cardKey = newCardKey;
    // console.log('match', match, gistOrg, gistID, cardKey);
  }

  var part = multiparts[cardKey];
  if (part) {
    var output = document.getElementById('smartdown-output');
    smartdown.setHome(part, output, function() {
      smartdown.startAutoplay(output);
    });
  }
  else {
    var cardURL = window.location.origin + window.location.pathname + cardKey + '.md';
    if (cardKey.indexOf('http') === 0) {
      gistOrg = '';
      gistID = '';
      cardURL = cardKey;
      loadAsyncCard(cardKey, cardURL);
    }
    else if (cardKey.indexOf('/') === 0) {
      gistOrg = '';
      gistID = '';
      cardURL = cardKey;
      loadAsyncCard(cardKey, cardURL);
    }
    else if (gistOrg !== '' && gistID !== '') {
      var gistAPIBase = `https://api.github.com/gists/${gistID}`;
      // console.log('gistAPIBase', gistAPIBase);

      var oReq = new XMLHttpRequest();
      oReq.addEventListener("load", function() {
        var gistResponse = JSON.parse(this.responseText);
        // console.log('gist Response', gistResponse);
        var gistFile = gistResponse.files[cardKey + '.md'];
        // console.log('gistFile', gistFile);
        var gistFileURL = gistFile.raw_url;
        cardKey = `${gistHashPrefix}${gistOrg}/${gistID}/${cardKey}`;
        loadAsyncCard(cardKey, gistFileURL);
      });
      oReq.open("GET", gistAPIBase);
      oReq.send();
    }
    else {
      gistOrg = '';
      gistID = '';

      if (!cardKey.endsWith('.md')) {
        cardKey += '.md';
      }
      if (cardKey.indexOf('./') === 0) {
        cardKey = cardKey.slice(2);
      }
      var text = scriptMap[cardKey] || '';
      text = smartdown.decodeInlineScript(text);
      cardLoaded(text, cardKey, cardURL);
    }
  }
}


function buildScriptMapThenLoadHome() {
  smartdown.loadCardsFromDocumentScripts();
  scriptMap = {};
  smartdown.smartdownScripts.forEach(function(s) {
    var text = s.text;
    if (false) {
      if (s.id === 'README.md') {
        text += '\n\n---\n\n[Back to Home](:@Home)\n\n';
      }
    }
    scriptMap[s.id] = text;
  });
  loadHome();
}


/* EndStuff needed for inline-mode */


var svgIcons = {
  'hypercube': '/gallery/resources/Hypercube.svg',
  'Hypercube': '/gallery/resources/Hypercube.svg',
  'badge': '/gallery/resources/badge.svg',
  'StalactiteStalagmite': '/gallery/resources/StalactiteStalagmite.svg',
  'church': '/gallery/resources/church.svg',
  'lighthouse': '/gallery/resources/lighthouse.svg',
  'barn': '/gallery/resources/barn.svg',
  'medieval-gate': '/gallery/resources/medieval-gate.svg'
};

var multiparts = {};
var inhibitHash = '';
var gistOrg = '';
var gistID = '';

function loadHome() {
  var hash = window.parent.location.hash || window.location.hash;
  if (hash === '') {
    hash = defaultHome;
  }
  hash = hash.replace(/#/g, '');
  relativeCardLoaderInline(hash);
}

var calcHandlers = smartdown.defaultCalcHandlers;
const replace = window.location.origin + window.location.pathname;
const linkRules = [
];

function locationHashChanged() {
  if (inhibitHash !== location.hash) {
    // relativeCardLoaderInline(location.hash.slice(1));
  }
}
window.onhashchange = locationHashChanged;

smartdown.initialize(svgIcons, baseURL, buildScriptMapThenLoadHome, relativeCardLoaderInline, calcHandlers, linkRules);

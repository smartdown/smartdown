// 'use strict';

//
// Smartdown
// Copyright 2015, Daniel B Keith
//

/* global document */
/* global window */

/* global useFileSaver */
/* global useLocalForage */
/* global useGifffer */
/* global useMathJax */
/* global XMLHttpRequest */

import './polyfills';
import createDOMPurify from 'dompurify';

import emoji from 'emojiJS';
const emojiInstance = new emoji();
const emojiReplacer = match => emojiInstance.replace_colons(match);
import axios from 'axios';

import {importScriptUrl, importModuleUrl, importTextUrl, importCssCode, importCssUrl} from 'importers';

require('./styles.css');

const markedModule = require('marked');

const each = window.lodashEach = require('lodash/forEach');
const map = window.lodashMap = require('lodash/map');
const isEqual = window.lodashIsEqual = require('lodash/isEqual');

const hljs = require('hljs');
const vdomToHtml = require('vdom-to-html');

window.jsyaml = require('js-yaml');

const StackTrace = require('stacktraceJS');


import {isExtensionRegistered, loadExternal, registerExtension, ensureExtension} from 'extensions';

const mathjaxConfigure = require('./extensions/MathJax');

import registerABC from './extensions/ABC';
import registerD3 from './extensions/D3';
import registerThree from './extensions/Three';
import registerPlotly from './extensions/Plotly';
import registerOpenJSCAD from './extensions/OpenJSCAD';
import registerLeaflet from './extensions/Leaflet';
import React from './extensions/React';
import Typescript from './extensions/Typescript';
import Mermaid from './extensions/Mermaid';
import Stdlib from './extensions/Stdlib';

const Brython = require('./extensions/Brython');
const graphvizImages = require('./extensions/Graphviz');

var P5 = require('./extensions/P5.js');


let fileSaver = {};
if (useFileSaver) {
  fileSaver = require('file-saver');
}

let localForage = {};
if (useLocalForage) {
  localForage = require('localforage');
}

let Gifffer = {};
if (useGifffer) {
  Gifffer = require('gifffer');
}

const localForageSmartdownPrefix = 'smartdownVariable/';
const inlinePrefix = '^^InLiNe^^';

let twitterLoading = false;
var cardLoader = null;
var calcHandlers = null;
var linkRules = [];
var currentHomeDiv = null;
var currentMD = null;
const playableTypes = {
  'brython': {
    highlight: 'python',
    javascript: true
  },
  'go': {
    highlight: 'go',
    transform: 'gopherjs',
    javascript: true
  },
  'javascript': {
    highlight: 'javascript',
    javascript: true
  },
  'typescript': {
    highlight: 'TypeScript',
    javascript: true
  },
  'react': {
    highlight: 'javascript',
    javascript: true
  },
  'd3': {
    highlight: 'javascript',
    javascript: true
  },
  'leaflet': {
    highlight: 'javascript',
    javascript: true
  },
  'plotly': {
    highlight: 'javascript',
    javascript: true
  },
  'openjscad': {
    highlight: 'javascript',
    javascript: true
  },
  'stdlib': {
    highlight: 'javascript',
    javascript: true
  },
  'three': {
    highlight: 'javascript',
    javascript: true
  },
  'p5js': {
    highlight: 'javascript',
    javascript: true
  },
  'P5JS': {
    highlight: 'javascript',
    javascript: true
  },
  'smartdown': {
    highlight: 'markdown',
    javascript: false
  },
  'graphviz': {
    highlight: 'graphviz',
    javascript: false
  },
  'abc': {
    highlight: 'abc',
    javascript: false
  },
  'abcmidi': {
    highlight: 'abc',
    javascript: false
  },
  'abcsheet': {
    highlight: 'abc',
    javascript: false
  },
  'mermaid': {
    highlight: 'mermaid',
    javascript: false
  }
};

const playableArgNames = [
  'playable',
  'env',
  'P5',
  'd3',
  'fc',
  'dc',
  'topojson',
  'Plotly',
  'L',
  'stdlib',
  'THREE',
  'smartdown',
  'p5'
];
const playableArgNamesQuoted = playableArgNames.map(n => `'${n}'`).join(',');

var perPageState = {
  expressionsRegistered: {},
  playablesRegistered: {},
  playablesRegisteredOrder: [],
};
var currentRenderDiv = null;
var currentBackpatches = {};

var uniqueCellIndex = 0;
var smartdownCells = {};

var cardLoading = false;

var smartdownVariables = {};
var smartdownScripts = [];
var smartdownScriptsMap = {};
var es6Playables = {};

var mediaRegistry = {};
var uniquePlayableIndex = 0;

function entityEscape(html, encode) {
  return html
    .replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const escape = entityEscape;

var markedOpts = {
  renderer: 'crashNoRenderer',
  headerIds: true,
  headerPrefix: 'SD_',
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  langPrefix: 'hljs ',
  highlight: function (code, lang) {    // , callback)
    var playableType = playableTypes[lang];
    var result;
    if (lang && playableType) {
      var mappedLanguage = playableType ? playableType.highlight : lang;
      result = hljs.highlightAuto(code, [mappedLanguage]);
    }
    else {
      result = hljs.highlightAuto(code, [lang]);
    }

    return result.value;
  }
};

function registerDefaultExtensions() {
  registerABC();
  registerD3();
  registerThree();
  registerPlotly();
  registerLeaflet();
  registerOpenJSCAD();
  React.register();
  Typescript.register();
  Mermaid.register();
  Stdlib.register();
}

registerDefaultExtensions();


function expandHrefWithLinkRules(href) {
  var result = href;

  for (var i = 0; i < linkRules.length; ++i) {
    const rule = linkRules[i];
    if (href.indexOf(rule.prefix) === 0) {
      if ((typeof rule.replace) === 'string') {
        var newHRef = rule.replace + href.slice(rule.prefix.length);
        if (newHRef.indexOf(window.location.origin) === 0) {
          newHRef = newHRef.slice(window.location.origin.length);
        }
        result = newHRef;
        break;
      }
      else if ((typeof rule.replace) === 'function') {
        var replacer = rule.replace(href);
        result = replacer + href.slice(rule.prefix.length);
      }
    }
  }

  // console.log('expandHrefWithLinkRules', linkRules, href, result);
  // console.log(JSON.stringify(linkRules, null, 2));

  return result;
}


// Copied from https://github.com/jashkenas/underscore/blob/e944e0275abb3e1f366417ba8facb5754a7ad273/underscore.js#L1458

var unescapeMap = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#x27;': '\'',
  '&#39;': '\'',
  '&#x60;': '`'
};

// Functions for escaping and unescaping strings to/from HTML interpolation.
function createEscaper(translationMap) {
  function escaper(match) {
    return translationMap[match];
  }
  // Regexes for identifying a key that needs to be escaped.
  var source = '(?:' + Object.keys(translationMap).join('|') + ')';
  var testRegexp = RegExp(source);
  var replaceRegexp = RegExp(source, 'g');
  return function (string) {
    string = string == null ? '' : '' + string;
    return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
  };
}
const decodeInlineScript = createEscaper(unescapeMap);

const youtubeDimensions = {
  thumbnail: 'width="426" height="240"',
  halfwidth: 'width="640" height="360"',
  fullwidth: 'width="1280" height="720"',
};
const youtubeClasses = {
  thumbnail: 'thumbnail',
  halfwidth: 'halfwidth',
  fullwidth: 'fullwidth',
};

var uniqueYouTubeId = 0;

function convertYoutubeFragmentToEmbed(href, title) {
  // console.log('convertYoutubeFragmentToEmbed', href, title);
  var result = null;
  var titleParts = title.split('|');
  title = titleParts[0];
  var shortPrefixes = ['http://youtu.be/', 'https://youtu.be/'];
  var longPrefixes = ['http://www.youtube.com/watch?v=', 'https://www.youtube.com/watch?v='];

  const sizing = youtubeDimensions[title] || '';
  const classList = youtubeClasses[title] || '';

  shortPrefixes.every(prefix => {
    if (href.indexOf(prefix) === 0) {
      var suffix = href.substr(prefix.length);
      ++uniqueYouTubeId;

      let enablejsapi = '';
      let apiButton = '';
      let apiPlayerKey = `player_${uniqueYouTubeId}`;
      if (titleParts.length > 1) {
        const apiParts = titleParts[1].split('=');
        if (apiParts[0] === 'api') {
          if (apiParts.length > 1) {
            apiPlayerKey = apiParts[1];
          }
          enablejsapi = '&enablejsapi=1';
          apiButton =
            `
            <button
              type="button"
              id="youtube-api-${uniqueYouTubeId}"
              href="#"
              onclick="smartdown.setupYouTubePlayer('youtube-iframe-${uniqueYouTubeId}', '${apiPlayerKey}')"
              class="api-button">
              Enable API for player <b>${apiPlayerKey}</b>
            </button>
            `;
        }
      }

      result =
        `<div class="video-container youtube ${classList}">
          <iframe
            id="youtube-iframe-${uniqueYouTubeId}"
            ${sizing}
            src="https://www.youtube.com/embed/${suffix}?html5=1&ecver=2&modestbranding=1${enablejsapi}"
            frameborder="0"
            allow="camera;microphone;autoplay;encrypted-media;picture-in-picture"
            allowfullscreen>
          </iframe>
        </div>
        ${apiButton}
        `;

      return false;
    }
    else {
      return true;
    }
  });

  if (!result) {
    longPrefixes.every(prefix => {
      if (href.indexOf(prefix) === 0) {
        var suffix = href.substr(prefix.length);
        result =
`<div
  class="video-container youtube c2 ${classList}">
  <iframe
    ${sizing}
    class="cc2"
    src="https://www.youtube.com/embed/${suffix}"
    frameborder="0"
    allow="camera;microphone;autoplay;encrypted-media;picture-in-picture"
    allowfullscreen>
  </iframe>
</div>
`;
        return false;
      }
      else {
        return true;
      }
    });
  }

  return result;
}


function convertVimeoFragmentToEmbed(href, title) {
  var result = null;
  var shortPrefixes = ['http://vimeo.com/', 'https://vimeo.com/'];
  var classList = (title === 'thumbnail') ? 'thumbnail' : 'fullwidth';

  shortPrefixes.every(prefix => {
    if (href.indexOf(prefix) === 0) {
      var suffix = href.substr(prefix.length);
      var opts = '?title=0&byline=0&portrait=0&badge=0';

      result =
`<div class="video-container vimeo ${classList}">
  <iframe
    src="https://player.vimeo.com/video/${suffix}${opts}"
    width="640"
    height="360"
    frameborder="0"
    allow="camera;microphone;autoplay;encrypted-media;picture-in-picture"
    webkitallowfullscreen
    mozallowfullscreen
    allowfullscreen>
  </iframe>
</div>
`;

      return false;
    }
    else {
      return true;
    }
  });

  return result;
}

function renderABCIntoDivs(baseId, abcType, abcText) {
  if (window.ABCJS.midi) {
    window.ABCJS.midi.stopPlaying();
  }
  const params = {
    responsive: 'resize',
  };
  if (abcType !== 'abcmidi') {
    const sheetDiv = document.getElementById(`${baseId}-sheet`);
    window.ABCJS.renderAbc([sheetDiv], abcText, params);
  }
  if (abcType !== 'abcsheet') {
    const midiDiv = document.getElementById(`${baseId}-midi`);
    window.ABCJS.renderMidi([midiDiv], abcText, params);
  }
}

function queueContentLoad(contentType, baseId, href, title, text) {
  // console.log('queueContentLoad', contentType, baseId, href, title, text);

  axios.get(href)
    .then(function(result) {
      ensureExtension('abc',
        function () {
          renderABCIntoDivs(baseId, text, result.data);
        });
    })
    .catch(function(err) {
      console.log('queueContentLoad error', err);
    });
}


function areValuesSameEnough(varname, oldValue, newValue) {
  // const oldValueJSON = JSON.stringify(oldValue);
  // const newValueJSON = JSON.stringify(newValue);
  // const result = oldValueJSON === newValueJSON;

  // const result = oldValue === newValue;

  const result = isEqual(oldValue, newValue);

  //  let result = oldValue === newValue;
  //
  //  if ((typeof oldValue === 'number') && isNaN(oldValue) &&
  //      (typeof newValue === 'number') && isNaN(newValue)) {
  //    result = true;
  //  }
  //
  //  if (!result) {
  //    console.log('areValuesSameEnough', oldValue, newValue, typeof oldValue, typeof newValue);
  //  }

  return result;
}


//
// Marked rendering extensions
//


function recursivelyLoadIncludes(prefixCode, includesRemaining, done) {
  if (includesRemaining.length > 0) {
    const nextInclude = includesRemaining.shift();
    // console.log('nextInclude', nextInclude);

    importTextUrl(
      nextInclude,
      function (nextIncludeText) {
        // console.log('recursivelyLoadIncludes success', nextInclude, nextIncludeText.slice(0, 50));

        recursivelyLoadIncludes(
          prefixCode + nextIncludeText,
          includesRemaining,
          done);
      },
      function (error) {
        console.log('recursivelyLoadIncludes error', nextInclude, error);

        const errorText =
`
//
// Unable to include ${nextInclude}: ${error}
//
`;
        recursivelyLoadIncludes(
          prefixCode + errorText,
          includesRemaining,
          done);
      }
    );
  }
  else if (done) {
    done(prefixCode);
  }
}


function getPrelude(language, code) {
  const playableType = playableTypes[language];
  const imports = [];
  const includes = [];

  const loadableLanguages = [
    'd3',
    'brython',
    'stdlib',
    'p5js',
    'P5JS',
    'three',
    'leaflet',
    'plotly',
    'openjscad',
    'typescript',
    'react',
    'graphviz',
    'abc',
    'abcsheet',
    'abcmidi',
    'mermaid',
  ];

  // If a playable is declared with a specific language that has
  // a shorthand in loadableLanguages, then add that language's extension
  // as an import. Note that extension may be renamed to plugin, so think
  // that there's a relation between language and extension/plugin.
  // E.g., a d3-language playable would have an implicit import of the d3 extension.
  //

  if (loadableLanguages.indexOf(language) >= 0) {
    imports.push([language, false]);
  }

  if (playableType && (playableType.javascript || language === 'graphviz')) {
    const lines = code.split('\n');
    const usePrefix = '//smartdown.import=';
    const usePrefixM = '//smartdown.importmodule=';
    const includePrefix = '//smartdown.include=';
    lines.forEach(line => {
      if (line.indexOf(usePrefix) === 0) {
        const rhs = line.slice(usePrefix.length);
        imports.push([rhs, false]);
      }
      else if (line.indexOf(usePrefixM) === 0) {
        const rhs = line.slice(usePrefixM.length);
        imports.push([rhs, true]);
      }
      else if (line.indexOf(includePrefix) === 0) {
        const rhs = line.slice(includePrefix.length);
        includes.push(rhs);
      }
    });
  }

  // console.log('getPrelude', language, imports, includes);

  return {
    imports: imports,
    includes: includes
  };
}

function renderCodeInternal(renderDivId, code, language, languageOpts, prelude) {
  var playable = languageOpts.indexOf('playable') >= 0;
  var autoplay = languageOpts.indexOf('autoplay') >= 0;
  var isModule = languageOpts.indexOf('module') >= 0;
  var debug = languageOpts.indexOf('debug') >= 0;
  var kiosk = languageOpts.indexOf('kiosk') >= 0;
  var kioskable = languageOpts.indexOf('kioskable') >= 0;
  var inline = languageOpts.indexOf('inline') >= 0;
  var center = languageOpts.indexOf('center') >= 0;
  var targetDivId = null;

  var playableType = playableTypes[language];
  if (playableType && (playable || autoplay)) {
    // console.log('renderCodeInternal', renderDivId, code, language, languageOpts, prelude);

    ++uniquePlayableIndex;
    var divId = `div_playable_${uniquePlayableIndex}`;
    var preId = `pre_playable_${uniquePlayableIndex}`;
    var dbgId = `dbg_playable_${uniquePlayableIndex}`;
    var dbgToggleId = `${dbgId}-toggle`;
    var consoleId = `console_playable_${uniquePlayableIndex}`;
    var consoleToggleId = `${consoleId}-toggle`;
    var functionId = `function_playable_${uniquePlayableIndex}`;
    var kioskId = `kiosk_playable_${uniquePlayableIndex}`;
    var playId = `play_playable_${uniquePlayableIndex}`;
    var stopId = `stop_playable_${uniquePlayableIndex}`;
    var progressId = `progress_playable_${uniquePlayableIndex}`;

    languageOpts.forEach(o => {
      if (o.indexOf('&') === 0) {
        targetDivId = 'inline-target-' + o.slice(1);
        divId = targetDivId;
      }
    });

    var registeredPlayable = smartdown.registerPlayable(
      prelude,
      language,
      renderDivId,
      divId,
      preId,
      dbgId,
      dbgToggleId,
      consoleId,
      consoleToggleId,
      functionId,
      playId,
      stopId,
      progressId,
      autoplay,
      isModule,
      code,
      playableType.transform,
      targetDivId
    );

    var highlightLanguage = playableType ? playableType.highlight : 'javascript';
    var highlightedCode = hljs.highlightAuto(code, [highlightLanguage]).value;
    var highlightedAugmentedCode = hljs.highlightAuto(registeredPlayable.augmentedCode, ['javascript']).value;
    var debugIsHidden = debug ? '' : 'hidden';

    var kioskClass = kiosk ? 'smartdown-playable-kiosk' : '';
    var kioskToggle = !(kiosk || kioskable) ? '' :
`
  <button type="button"
    href="#"
    id="${kioskId}"
    onclick="smartdown.toggleKiosk('${divId}', event)"
    class="kiosk-button">
    <span>&#9713;</span>
  </button>
`;
    var wrapperWrapperElement = 'div';
    var wrapperWrapperClass = 'playable-wrapper-wrapper';
    var progressClass = 'smartdown-progress';

    if (inline) {
      wrapperWrapperElement = 'span';
      wrapperWrapperClass = 'playable-wrapper-wrapper-inline';
      progressClass += ' smartdown-progress-inline';
    }
    else if (center) {
      wrapperWrapperClass = 'playable-wrapper-wrapper-center';
    }

    var playableAutoplayClass = autoplay ? 'playable-autoplay' : '';
    if (autoplay && !playable) {
      var playableDiv =
`
<div class="smartdown-playable smartdown-${language}" id="${divId}"></div>
</div>
`;
      if (targetDivId) {
        playableDiv = '';
      }

      var playableWrapper =
`
<${wrapperWrapperElement} class="${wrapperWrapperClass}">
<div class="playable-wrapper ${kioskClass}">

<div class="playable-buttons">
${kioskToggle}
</div>

${playableDiv}

<div id="${progressId}" class="${progressClass}">
    <div
      class="smartdown-progress-bar smartdown-progress-active"
      data-percent="100"
      style="width: 100%;">
      <span class="smartdown-progress-label"></span>
    </div>
    </div>
</div>
</${wrapperWrapperElement}>
`;

      return playableWrapper;
    }
    else {
      var playableButtons =
`
  <button type="button"
    href="#"
    id="${playId}"
    onclick="smartdown.playPlayable('${language}', '${divId}')"
    class="playable-button playable-button-play">
    <span>&nbsp;&#x25B6;&nbsp;&nbsp;&nbsp;Play&nbsp;&nbsp;&nbsp;&#x25B6;&nbsp;</span>
  </button>
  <button type="button"
    id="${stopId}"
    style="display: none"
    href="#"
    onclick="smartdown.resetPlayable('${language}', '${divId}', false)"
    class="playable-button playable-button-stop">
    <span>&nbsp;&#x25A3;&nbsp;&nbsp;&nbsp;Stop&nbsp;&nbsp;&nbsp;&#x25A3;&nbsp;</span>
  </button>
`;

      var playableCodeDisplay =
`
<${wrapperWrapperElement} class="${wrapperWrapperClass}">
<div class="playable-wrapper ${kioskClass}">

<div class="playable-buttons">
${playableButtons}
${kioskToggle}
</div>

<div class="smartdown-playable smartdown-${language}" id="${divId}"></div>

<div id="${progressId}" class="${progressClass}">
  <div
    class="smartdown-progress-bar smartdown-progress-active"
    data-percent="100"
    style="width: 100%;">
    <span class="smartdown-progress-label"></span>
  </div>
</div>

</div>
</${wrapperWrapperElement}>

<div id="${preId}" class="playable-source ${playableAutoplayClass}">
  <pre><code class="${playableType.highlight} hljs">${highlightedCode}</code></pre>
</div>


<button
  type="button"
  id="${dbgToggleId}"
  href="#"
  onclick="smartdown.toggleDebug('${dbgId}')"
  ${debugIsHidden}
  class="playable-debug-button">
  Augmented Javascript
</button>

<pre
  id="${dbgId}"
  class="playable-debug-source">
<code class="hljs javascript">
${highlightedAugmentedCode}
</code>
</pre>


<button
  type="button"
  id="${consoleToggleId}"
  href="#"
  onclick="smartdown.toggleConsole('${consoleId}')"
  hidden
  class="playable-console-button">
  Console
</button>

<div
   id="${consoleId}"
   class="playable-console"><pre id="${consoleId}-pre"></pre></div>
`;

      return playableCodeDisplay;
    }
  }
  else {
    // console.log('renderCode2', code, language);

    const renderedCode = markedOpts.renderer.baseCodeRenderer(code, language);
    return renderedCode;
  }
}


function renderCode(code, languageString) {
  languageString = (languageString || '').replace(/ /g, '');
  var languageElements = languageString.split('/');
  var languageOpts = languageElements.slice(1);
  var playable = languageOpts.indexOf('playable') >= 0;
  var autoplay = languageOpts.indexOf('autoplay') >= 0;
  // // var debug = languageOpts.indexOf('debug') >= 0;

  let language = languageElements[0];
  if (language === 'javascript') {
    languageOpts.forEach(o => {
      if (playableTypes[o] && playableTypes[o].javascript) {
        language = o;
      }
    });
  }

  const prelude = getPrelude(language, code);

  const bp = currentBackpatches[currentRenderDiv.id];

  if ((playable || autoplay) && prelude.includes.length > 0) {
    const backpatchIndex = bp.length;
    const deferredCode =
`<pre>backpatch_${backpatchIndex}_${currentRenderDiv.id}</pre>`;
    const backpatch = {
      currentRenderDiv: currentRenderDiv,
      key: deferredCode,
      replace: null
    };
    bp.push(backpatch);
    // console.log('renderCode added bp', deferredCode, currentRenderDiv.id);

    const includesRemaining = prelude.includes.slice(0);  // Copy
    const prefixCode = '';
    recursivelyLoadIncludes(prefixCode, includesRemaining, function(includedCode) {
      const saveRenderDiv = currentRenderDiv;
      currentRenderDiv = backpatch.currentRenderDiv;
      const renderedExpandedCode = renderCodeInternal(currentRenderDiv.id, includedCode, language, languageOpts, prelude);
      currentRenderDiv = saveRenderDiv;
      const patch = bp[backpatchIndex];

      if (patch.key === deferredCode) {
        patch.replace = renderedExpandedCode;
      }
      else {
        console.log('renderCode patch anomaly', backpatchIndex);
        console.log(deferredCode);
        console.log(patch.key);
      }
    });

    return deferredCode;
  }
  else {
    return renderCodeInternal(currentRenderDiv.id, code, language, languageOpts, prelude);
  }
}


function edit(regex, opt) {
  regex = regex.source || regex;
  opt = opt || '';
  return {
    replace: function(name, val) {
      val = val.source || val;
      val = val.replace(/(^|[^\[])\^/g, '$1');
      regex = regex.replace(name, val);
      return this;
    },
    getRegex: function() {
      return new RegExp(regex, opt);
    }
  };
}


function smartdownLexer(src) {
  let out = '';
  let link;
  let text;
  let href;
  let title;
  let cap;
  let prevCapZero;

  const mathRules = /^(\$+)[^$]*\1/;
  const kludgeGFMURLRules =
    edit(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*/)
    // .replace('email', inline._email)
      .getRegex();

  const renderer = markedOpts.renderer;
  /* eslint-disable no-cond-assign, brace-style */

  while (src) {
    // math
    if (cap = mathRules.exec(src)) {
      src = src.substring(cap[0].length);
      var escaped = cap[0].replace(/</g, '< ');
      out += escaped;
      continue;
    }

    // escape
    if (cap = this.rules.escape.exec(src)) {
      src = src.substring(cap[0].length);
      out += cap[1];
      continue;
    }

    // autolink
    if (cap = this.rules.autolink.exec(src)) {
      src = src.substring(cap[0].length);
      if (cap[2] === '@') {
        text = escape(this.mangle(cap[1]));
        href = 'mailto:' + text;
      } else {
        text = escape(cap[1]);
        href = text;
      }
      out += renderer.link(href, null, text);
      continue;
    }

    // // url (gfm)
    // if (!this.inLink && (cap = this.rules.url.exec(src))) {
    if (!this.inLink && (cap = kludgeGFMURLRules.exec(src))) {
      do {
        prevCapZero = cap[0];
        cap[0] = this.rules._backpedal.exec(cap[0])[0];
      } while (prevCapZero !== cap[0]);
      src = src.substring(cap[0].length);
      if (cap[2] === '@') {
        text = escape(cap[0]);
        href = 'mailto:' + text;
      } else {
        text = escape(cap[0]);
        if (cap[1] === 'www.') {
          href = 'http://' + text;
        } else {
          href = text;
        }
      }
      out += renderer.link(href, null, text);
      continue;
    }

    // tag
    if (cap = this.rules.tag.exec(src)) {
      if (!this.inLink && /^<a /i.test(cap[0])) {
        this.inLink = true;
      } else if (this.inLink && /^<\/a>/i.test(cap[0])) {
        this.inLink = false;
      }
      src = src.substring(cap[0].length);
      out += this.options.sanitize
        ? this.options.sanitizer
          ? this.options.sanitizer(cap[0])
          : escape(cap[0])
        : cap[0];
      continue;
    }

    // link
    if (cap = this.rules.link.exec(src)) {
      src = src.substring(cap[0].length);
      this.inLink = true;
      href = cap[2];
      if (this.options.pedantic) {
        link = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(href);

        if (link) {
          href = link[1];
          title = link[3];
        } else {
          title = '';
        }
      } else {
        title = cap[3] ? cap[3].slice(1, -1) : '';
      }
      href = href.trim().replace(/^<([\s\S]*)>$/, '$1');
      out += this.outputLink(cap, {
        href: markedModule.InlineLexer.escapes(href),
        title: markedModule.InlineLexer.escapes(title)
      });
      this.inLink = false;
      continue;
    }

    // reflink, nolink
    if ((cap = this.rules.reflink.exec(src))
        || (cap = this.rules.nolink.exec(src))) {
      src = src.substring(cap[0].length);
      link = (cap[2] || cap[1]).replace(/\s+/g, ' ');
      link = this.links[link.toLowerCase()];
      if (!link || !link.href) {
        out += cap[0].charAt(0);
        src = cap[0].substring(1) + src;
        continue;
      }
      this.inLink = true;
      out += this.outputLink(cap, link);
      this.inLink = false;
      continue;
    }

    // strong
    if (cap = this.rules.strong.exec(src)) {
      src = src.substring(cap[0].length);
      out += renderer.strong(this.output(cap[4] || cap[3] || cap[2] || cap[1]));
      continue;
    }

    // em
    if (cap = this.rules.em.exec(src)) {
      src = src.substring(cap[0].length);
      out += renderer.em(this.output(cap[6] || cap[5] || cap[4] || cap[3] || cap[2] || cap[1]));
      continue;
    }

    // code
    if (cap = this.rules.code.exec(src)) {
      src = src.substring(cap[0].length);
      out += renderer.codespan(cap[2].trim());
      continue;
    }

    // br
    if (cap = this.rules.br.exec(src)) {
      src = src.substring(cap[0].length);
      out += renderer.br();
      continue;
    }

    // del (gfm)
    if (cap = this.rules.del.exec(src)) {
      src = src.substring(cap[0].length);
      out += renderer.del(this.output(cap[1]));
      continue;
    }

    // text
    if (cap = this.rules.text.exec(src)) {
      src = src.substring(cap[0].length);
      cap[0] = cap[0].replace(/:([A-Za-z0-9_\-\+]+?):/g, emojiReplacer);
      out += renderer.text(escape(this.smartypants(cap[0])));

      continue;
    }

    if (src) {
      throw new Error('Infinite loop on byte: ' + src.charCodeAt(0));
    }
  }

  /* eslint-enable no-cond-assign, brace-style */

  return out;
}

function isGIF(href) {
  return (href.endsWith('.gif') || href.indexOf('data:image/gif;base64') === 0);
}


function isGifferable(href, title, tokens) {
  const isGif = isGIF(href);

  let useGiffer = false;
  tokens.forEach(t => {
    if (t === 'player') {
      useGiffer = true;
    }
  });
  return isGif && useGiffer;
}

const imageStyles = {
  default: '',
  icon: 'icon',
  thumbnail: 'thumbnail',
  halfwidth: 'halfwidth',
  fullwidth: 'fullwidth',
};

function renderImage(href, title, text) {
  href = expandHrefWithLinkRules(href);
  var out = '';
  var specialClass = null;
  var mediaLink = href.lastIndexOf('/media/', 0) >= 0;
  if (mediaLink) {
    var pathElements = href.split('/').reverse();
    // console.log('render', href, pathElements);
    var e1 = pathElements.pop();
    if (e1 !== '') {
      console.log('Unexpected /media syntax: ', href);
    }
    var e2 = pathElements.pop();
    if (e2 === 'media') {
      var imageName = pathElements.pop();
      var imageClass = pathElements.pop() || '';

      var fgClass = `media-image ${imageClass}`;
      var media = mediaRegistry[imageName];
      if (media) {
        var inlineData = media.svgData;
        out += '<div class="' + fgClass + '">';
        out += inlineData;
        out += '</div>';
      }
      else {
        console.log('Media not found', imageName);
        out += '<h6 style="color:red;">';
        out += `Media not found: ${imageName}`;
        out += '</h6>';
      }
    }
  }
  else if (href.indexOf('https://twitter.com') === 0) {
    var showCards = (/\&amp\;showmedia$/i.test(href));
    out = '<blockquote class="twitter-tweet"';
    out += ' data-width="250"';
    out += ' align="center"';
    if (!showCards) {
      out += ' data-cards="hidden"';
    }
    out += ' data-conversation="none"';
    out += ' data-dnt="true"';
    out += ' style="border:4px solid darkgray;">';
    out += '<a href="' + href + '">' + (text || href) + '</a>';
    out += '</blockquote>';
  }
  else if (isGIF(href)) {
    const tokens = text.split(' ');
    const usePlayer = isGifferable(href, title, tokens);

    let width = '50%';
    if (tokens.indexOf('fullwidth') >= 0) {
      width = '100%';
    }
    else if (tokens.indexOf('thumbnail') >= 0) {
      width = '320px';
    }
    else if (tokens.indexOf('icon') >= 0) {
      width = '200px';
    }
    // console.log('isGIF', href, text, tokens, width);

    if (usePlayer) {
      out += `<div style="width:${width};margin:auto;padding:0;" class="gifffer-container"><img style="padding:0;" data-gifffer-width="100%" data-gifffer="${href}" data-gifffer-alt="${text}"`;
    }
    else {
      var gifClassName = imageStyles[text] || imageStyles.default;

      out += '<img class="' + gifClassName + '" src="' + href + '" alt="' + text + '"';
      if (title) {
        out += ' title="' + title + '"';
      }
      if (specialClass) {
        out += ' class="' + specialClass + '"';
      }
    }
    if (title) {
      out += ' title="' + title + '"';
    }
    if (specialClass) {
      out += ' class="' + specialClass + '"';
    }
    out += this.options.xhtml ? '/>' : '></div>';
  }
  else if (text === 'iframe') {
    out +=
      `
      <div class="resp-iframe-container">
        <iframe
          src="${href}"
          xwidth="800"
          xheight="600"
          frameborder="0"
          allowfullscreen>
        </iframe>
      </div>`;
  }
  else if (href.endsWith('.mp3')) {
    out += '<div style="margin:auto;padding:0;">\n';
    out += '<audio preload="auto" controls>\n';
    out += '<source type="audio/mpeg" src="' + href + '"/>\n';
    out += '</audio>\n';
    out += '</div>\n';
  }
  else if (href.endsWith('.abc')) {
    const abcIndex = uniqueCellIndex++;
    const abcBaseId = `abc-wrapper-${abcIndex}`;
    out +=
`
  <div class="abc-wrapper">
    <div
      id="${abcBaseId}-sheet"
      class="smartdown-abcsheet">
    </div>
    <div
      id="${abcBaseId}-midi"
      class="smartdown-abcmidi">
    </div>
  </div>
`;
    let contentType = 'abc';
    if (text === 'abcsheet') {
      contentType = text;
    }
    else if (text === 'abcmidi') {
      contentType = text;
    }
    queueContentLoad(contentType, abcBaseId, href, title, text);
  }
  else {
    var youtubeEmbed = convertYoutubeFragmentToEmbed(href, text);
    var vimeoEmbed = convertVimeoFragmentToEmbed(href, text);

    if (youtubeEmbed) {
      out += youtubeEmbed;
    }
    else if (vimeoEmbed) {
      out += vimeoEmbed;
    }
    else if (text === 'swatch') {
      const bgColor = href || 'pink';
      out += `<div class="smartdown-swatch" style="background:${bgColor}"></div>`;
    }
    else {
      var className = imageStyles[text] || imageStyles.default;

      out += '<img class="' + className + '" src="' + href + '" alt="' + text + '"';
      if (title) {
        out += ' title="' + title + '"';
      }
      if (specialClass) {
        out += ' class="' + specialClass + '"';
      }
      out += this.options.xhtml ? '/>' : '>';
    }
  }

  return out;
}


function renderLink(href, title, text) {
  const smartdownTag = ':';

  var useNewWindow = true;
  var handled = false;
  for (var i = 0; i < linkRules.length; ++i) {
    const rule = linkRules[i];
    if (href.indexOf(rule.prefix) === 0) {
      const newHRef = rule.replace + href.slice(rule.prefix.length);
      // console.log('linkRule', href, newHRef, rule);
      href = newHRef;
      handled = true;
      useNewWindow = false;
      break;
    }
  }

  if (handled) {
    //
  }
  else if (href.indexOf(smartdownTag) === 0) {
    // x
  }

  const titleAttr = title ? `title="${title}" ` : '';
  var linkHead = '<a ' + titleAttr +
                 ' class="smartdown-link" href="' +
                 href;
  if (useNewWindow) {
    linkHead += '" target="_blank" rel="noreferrer noopener">';
  }
  else {
    linkHead += '">';
  }

  var linkBody = text;
  var lowerhref = href.toLowerCase();
  var linkTail = '</a>';
  var result = linkHead + linkBody + linkTail;

  if (lowerhref.indexOf(smartdownTag) === 0) {
    var cellscript = decodeInlineScript(href.slice(smartdownTag.length));

    var op = null;
    var lhs = null;
    var rhs = null;

    if (cellscript.indexOf('?') === 0) {
      op = 'INPUT';
      lhs = cellscript.slice(1);
    }
    else if (cellscript.indexOf('-') === 0) {
      op = 'INPUTRANGE';
      lhs = cellscript.slice(1);
    }
    else if (cellscript.indexOf('X') === 0) {
      op = 'INPUTCHECKBOX';
      lhs = cellscript.slice(1);
    }
    else if (cellscript.indexOf('!') === 0) {
      op = 'GET';
      lhs = cellscript.slice(1);
    }
    else if (cellscript.indexOf('@') === 0) {
      op = 'GO';
      lhs = cellscript.slice(1);
    }
    else if (cellscript.indexOf('&') === 0) {
      op = 'DIV';
      lhs = cellscript.slice(1);
    }
    else if (cellscript.indexOf('=') === 0) {
      op = 'CALC';
      cellscript = cellscript.slice(1);
      var exprs = cellscript.split(';');
      if (exprs.length === 1) {
        const eqIndex = cellscript.indexOf('=');
        lhs = [cellscript.slice(0, eqIndex)];
        rhs = [cellscript.slice(eqIndex + 1)];
      }
      else {
        lhs = [];
        rhs = [];
        exprs.forEach(e => {
          const eqIndex = e.indexOf('=');
          lhs.push(e.slice(0, eqIndex));
          rhs.push(e.slice(eqIndex + 1));
        });
      }
      // console.log('lhs/rhs', lhs, rhs);
    }
    else if (cellscript.indexOf('/') === 0) {
      var parts2 = cellscript.split('@');
      op = parts2[0];
      lhs = parts2[1];
    }
    else if (cellscript.indexOf(':') === 0) {
      op = 'REVEAL';
      cellscript = cellscript.slice(1);
      if (cellscript.indexOf('/') >= 0) {
        const parts = cellscript.split('/');
        lhs = parts[0];
        rhs = parts.slice(1).join(',');
      }
      else {
        lhs = cellscript;
      }
    }

    var newHTML = '';
    var hasLabel = !!(text && text.length > 0);
    if (op === 'INPUT') {
      uniqueCellIndex++;
      var inputCellId = 'INPUT' + uniqueCellIndex;
      const inputCellIdParts = lhs.split(/[\|\!]/g);
      var inputType = 'text';
      var liveBlur = false;
      if (inputCellIdParts.length > 1) {
        lhs = inputCellIdParts[0];
        inputType = inputCellIdParts[1];
      }
      else {
        liveBlur = true;
      }

      smartdownCells[inputCellId] = {
        cellBinding: lhs,
        cellID: inputCellId,
        cellType: 'input',
        datatype: inputType
      };

      if (hasLabel) {
        newHTML += '<span class="infocell-group">\n';

        newHTML += '<span class="infocell-group-addon"><span class="infocell-label">' + decodeURIComponent(text) + '</span></span>';
        if (inputType === 'number') {
          newHTML += '<input type="number" class="infocell-input"';
        }
        else {
          newHTML += '<textarea rows="1" type="text" class="infocell-textarea"';
        }
      }
      else if (inputType === 'number') {
        newHTML += '<input type="number" class="infocell-input"';
      }
      else {
        newHTML += '<textarea rows="1" type="text" class="infocell-textarea"';
      }

      if (inputType === 'number' || !liveBlur) {
        newHTML += ' onblur="smartdown.setVariable(\'' + lhs + '\', this.value, \'' + inputType + '\')"';
      }
      else {
        newHTML += ' onkeyup="smartdown.setVariable(\'' + lhs + '\', this.value, \'' + inputType + '\')"';
      }
      newHTML += ' id="' + inputCellId + '"';
      // newHTML += ' placeholder="' + decodeURIComponent(text) + '" aria-describedby="' + lhs + '"';
      newHTML += '>';

      if (inputType === 'number') {
        newHTML += '\n';
      }
      else {
        newHTML += '</textarea>\n';
      }

      if (hasLabel) {
        newHTML += '</span>';
      }
    }
    else if (op === 'INPUTRANGE') {
      uniqueCellIndex++;
      var inputRangeCellId = 'INPUTRANGE' + uniqueCellIndex;

      var lhsElements = lhs.split('/');
      lhs = lhsElements[0];

      var min = lhsElements[1];
      var max = lhsElements[2];
      var step = lhsElements[3];

      min = (min && min.length > 0) ? min : 0.0;
      max = (max && max.length > 0) ? max : 100.0;
      step = (step && step.length > 0) ? step : 1.0;

      smartdownCells[inputRangeCellId] = {
        cellBinding: lhs,
        cellID: inputRangeCellId,
        cellType: 'inputrange',
        datatype: 'number'
      };

      if (hasLabel) {
        newHTML += '<span class="infocell-group">\n';
        newHTML += '<span class="infocell-group-addon" id="' + lhs + '"><span class="infocell-label">' + decodeURIComponent(text) + '</span></span>';
      }

      // <input type="range" min="5" max="10" step="0.01">
      newHTML += '<input type="range"';
      newHTML += ' class="infocell-input-range"';
      newHTML += ' style="width:40%;"';
      newHTML += ' min="' + min + '"';
      newHTML += ' max="' + max + '"';
      newHTML += ' step="' + step + '"';
      newHTML += ' id="' + inputRangeCellId + '"';
      newHTML += ' oninput="smartdown.setVariable(\'' + lhs + '\', this.valueAsNumber, \'number\')"';
      newHTML += '</input>';
      if (hasLabel) {
        newHTML += '</span>';
      }
    }
    else if (op === 'INPUTCHECKBOX') {
      uniqueCellIndex++;
      var inputCheckboxCellId = 'INPUTCHECKBOX' + uniqueCellIndex;

      smartdownCells[inputCheckboxCellId] = {
        cellBinding: lhs,
        cellID: inputCheckboxCellId,
        cellType: 'inputcheckbox',
        datatype: 'boolean'
      };

      if (hasLabel) {
        newHTML += '<span class="infocell-group">\n';
        newHTML += '<span class="infocell-group-addon" id="' + lhs + '"><span class="infocell-label">' + decodeURIComponent(text) + '</span></span>';
      }

      newHTML += '<input class="smartdown-checkbox" type="checkbox"';
      newHTML += ' id="' + inputCheckboxCellId + '"';
      newHTML += ' onchange="smartdown.setVariable(\'' + lhs + '\', this.checked, \'boolean\')"';
      newHTML += '</input>';
      if (hasLabel) {
        newHTML += '</span>';
      }
    }
    else if (op === 'CALC') {
      ++uniqueCellIndex;
      var manualInvoke = hasLabel;
      if (hasLabel) {
        text = text.replace(/<code class="hljs-inline">(.+)<\/code>/g, '`$1`');
      }
      var expr = smartdown.registerExpression(uniqueCellIndex, text, lhs, rhs, hasLabel);
      if (manualInvoke) {
        newHTML +=
`<button
  class="btn-infocell btn-infocell-calc"
  onclick="smartdown.computeStoredExpression('${expr.exprId}')">
  <span id="${expr.labelId}">${decodeURIComponent(expr.labelText)}</span>
</button>`;
      }
      else {
        newHTML += `<span style="display:none;" id="${expr.labelId}"></span>`;
      }
    }
    else if (op === 'GO') {
      newHTML += '<button class="btn-infocell btn-infocell-go" onclick="smartdown.goToCard(\'' +
      lhs +
      '\', event, \'' +
      currentRenderDiv.id +
      '\')">' +
      decodeURIComponent(text) +
      '</button>';
    }
    else if (op === 'DIV') {
      if (hasLabel) {
        newHTML += '<span class="infocell-group">\n';
        if (text && text.length > 0) {
          newHTML += '<span class="infocell-group-addon infocell-group-inline"><span class="infocell-label">' + decodeURIComponent(text) + '</span></span>';
        }
      }

      newHTML +=
`<span
  class="smartdown-playable inline-target-div"
  id="inline-target-${lhs}">
</span>
`;
    }
    else if (op === 'GET') {
      uniqueCellIndex++;
      var outputCellId = 'OUTPUT_' + uniqueCellIndex;

      const outputCellIdParts = lhs.split(/[\|\!]/g);
      var outputType = 'text';
      let flavors = '';
      if (outputCellIdParts.length > 1) {
        lhs = outputCellIdParts[0];
        outputType = outputCellIdParts[1];
        if (outputType === '') {
          outputType = 'text';
        }
        const tmp = outputCellIdParts.slice(2);
        tmp.unshift('');
        flavors = tmp.join(' smartdown-flavor-');
      }

      smartdownCells[outputCellId] = {
        cellBinding: lhs,
        cellID: outputCellId,
        cellType: 'output',
        datatype: outputType
      };

      if (hasLabel) {
        newHTML += '<span class="infocell-group">\n';
        if (text && text.length > 0) {
          newHTML += '<span class="infocell-group-addon"><span class="infocell-label">' + decodeURIComponent(text) + '</span></span>';
        }
      }

      // DRY this up. It's stupidly repetitive
      if (outputType !== '' && outputType !== 'text' && outputType !== 'url') {
        var smartdownClass = 'smartdown-' + outputType;
        newHTML += `<div class="infocell-output ${smartdownClass} ${flavors}" id="${outputCellId}"></div>`;
      }
      else {
        newHTML += `<span class="infocell-output ${flavors}" id="${outputCellId}"></span>`;
      }
      if (hasLabel) {
        newHTML += '</span>';
      }
    }
    else if (op === 'REVEAL') {
      uniqueCellIndex++;
      const body = decodeURIComponent(text);

      if (rhs === null) {
        rhs = 'button';
      }
      var settings = rhs.split(',');
      if (settings.includes('link') || settings.includes('tooltip')) {
        rhs = 'link';
      }
      else {
        rhs = 'button';
      }
      let settingsStr = '';
      if (settings.length >= 1) {
        settingsStr = settings.join(',');
      }

      if (rhs === 'button') {
        newHTML += `<button
                  id="trigger_${lhs}"
                  class="btn-infocell disclosable-trigger-button"
                  onclick="smartdown.toggleDisclosure('${lhs}', 'trigger_${lhs}', '${settingsStr}');">
                  <span id="span_${lhs}_closed">${body}</span>
                  <span id="span_${lhs}_opened" style="display: none">${body}</span>
                  </button>`;
      }
      else if (rhs === 'link') {
        newHTML += `<span
                      class="disclosable-trigger-tooltip-wrapper"
                      onmouseleave="smartdown.linkWrapperExit('${lhs}', '${settingsStr}');">
                    <a
                      id="trigger_${lhs}_${uniqueCellIndex}"
                      class="disclosable-trigger-tooltip"
                      onmouseenter="smartdown.showDisclosure('${lhs}', 'trigger_${lhs}_${uniqueCellIndex}', '${settingsStr}');">
                      ${body}
                    </a></span>`;
      }
    }

    result = newHTML;
  }

  return result;
}

function renderParagraph(text) {
  const isInline = (text.indexOf(inlinePrefix) === 0);

  if (isInline) {
    text = text.slice(inlinePrefix.length);
  }

  const pClass = isInline ? 'smartdown_p_inline' : 'smartdown_p';
  var result =
`<p class="${pClass}">${text}</p>
`;

  return result.trim();
}

function renderBr() {
  return this.options.xhtml ? '<br/>' : '<br class="smartdown_br">';
}


let disclosableDivsOpened = 0;
let decorationDivsOpened = 0;

function renderHeading(text, level, raw, slugger) {
  let result = ``;
  const disclosableI = text.lastIndexOf('::::');
  const decorationI = text.lastIndexOf('--');

  if (disclosableI >= 0 || decorationI >= 0) {
    if (disclosableI >= 0) {
      const disclosableDeclaration = text.slice(disclosableI + 4).trim();
      text = text.slice(0, disclosableI);

      if (disclosableDivsOpened > 0 && disclosableDeclaration.length === 0) {
        disclosableDivsOpened -= 1;
        result += `</div></div>`;
      }
      else {

        disclosableDivsOpened += 1;

        result += `
                <div
                  id="${disclosableDeclaration}"
                  class="disclosable-wrapper"
                >
                  <div
                    id="${disclosableDeclaration}_header"
                    class="disclosable-header"></div>
                  <div
                    class="disclosable-content">`;
      }
    }
    else if (decorationI >= 0) {
      text = text.slice(decorationI + 2);
      const parts = text.split(' ');
      const decorationType = parts[0];
      let id = '';
      if (parts.length > 1) {
        id = parts[1];
      }

      if (decorationDivsOpened > 0 && id === '') {
        decorationDivsOpened -= 1;
        result += `</div>`;
      }
      else {
        decorationDivsOpened += 1;

        result += `
                <div
                  id="${id}"
                  class="decoration-${decorationType}"
                > `;
      }
    }
  }
  else {
    const headingId = markedOpts.headerPrefix + slugger.slug(raw);
    const anchor = `<a class="smartdown-h-anchor" href="#${headingId}">&#x1F517;</a>`;
    result = `<h${level} id="${headingId}">${text}${anchor}</h${level}>`;
  }

  return result;
}


// function renderList(body, ordered, start) {
//   var result = markedModule.Renderer.prototype.list(body, ordered, start);
//   return result.trim();
// }


// function renderListItem(text) {
//   var result = markedModule.Renderer.prototype.listitem(text);
//   return result.trim();
// }


// function renderTableCell(content, flags) {
//   console.log('renderTableCell', content, flags);
//   var type = flags.header ? 'th' : 'td';
//   var tag = flags.align
//     ? '<' + type + ' style="text-align:' + flags.align + '">'
//     : '<' + type + '>';
//   return tag + content + '</' + type + '>\n';
// }


function enhanceMarkedAndOpts() {
  markedModule.InlineLexer.prototype.output = smartdownLexer;
  markedModule.InlineLexer.prototype.output.bind(markedModule.InlineLexer.prototype);

  var renderer = new markedModule.Renderer();

  function replace(regex, opt) {
    regex = regex.source;
    opt = opt || '';
    return function self(name, val) {
      if (!name) {
        return new RegExp(regex, opt);
      }
      val = val.source || val;
      val = val.replace(/(^|[^\[])\^/g, '$1');
      regex = regex.replace(name, val);
      return self;
    };
  }

  /* eslint no-spaced-func: 0 */
  /* eslint no-unexpected-multiline: 0 */

  markedOpts.renderer = renderer;
  // var aLexer = new markedModule.Lexer(markedOpts);
  // aLexer.rules.paragraph = replace(aLexer.rules.paragraph)
  //   ('*(#{1,6}) +', '*(#{1,6}) *')
  //   ();
  // aLexer.rules.heading = replace(aLexer.rules.heading)
  //   ('*(#{1,6}) +', '*(#{1,6}) *')
  //   ();

  // renderer.$compile = null;
  // renderer.$scope = null;

  renderer.baseCodeRenderer = renderer.code;
  renderer.code = renderCode;
  renderer.codespan = function(text) {
    const result = hljs.highlightAuto(text).value; // '<code>' + text + '</code>';
    return `<code class="hljs-inline">${result}</code>`;
  };

  renderer.link = renderLink;
  renderer.image = renderImage;
  renderer.paragraph = renderParagraph;
  renderer.br = renderBr;
  renderer.baseHeadingRenderer = renderer.heading;
  renderer.heading = renderHeading;
  // renderer.list = renderList;
  // renderer.listitem = renderListItem;

  // renderer.tablecell = renderTableCell;
}

//
// End of marked.js extensions
//


function partitionMultipart(markdown) {
  markdown = '\n' + markdown; // deal with lack of leading \n
  var splits = markdown.split(/\n# ([a-zA-Z0-9_]+)\n\-\-\-\n/);
  var result = {
  };
  var firstKey = null;
  for (var i = 1; i < splits.length; i += 2) {
    result[splits[i]] = splits[i + 1];
    if (!firstKey) {
      firstKey = splits[i];
    }
  }

  const defaultKeyName = '_default_';
  if (!firstKey) {
    result[defaultKeyName] = markdown;
  }
  else {
    result[defaultKeyName] = result[firstKey];
  }

  return result;
}

function registerExpression(cellIndex, labelText, lhss, rhss, manual) {
  // console.log('registerExpression', cellIndex, labelText, lhss, rhss, manual);

  if (lhss.length !== rhss.length) {
    console.log('###registerExpression, lhss.length !== rhss.length', lhss, rhss);
    return null;
  }

  labelText = decodeInlineScript(labelText);
  labelText = labelText.replace(/<code>/g, '`');
  labelText = labelText.replace(/<\/code>/g, '`');

  var types = [];

  for (let i = 0; i < lhss.length; ++i) {
    let lhs = lhss[i];
    const calcCellIdParts = lhs.split(/[\|\!]/g);
    var calcType = 'text';
    if (calcCellIdParts.length > 1) {
      lhs = calcCellIdParts[0];
      calcType = calcCellIdParts[1];
    }
    lhss[i] = lhs;
    types.push(calcType);
  }

  var rootDivId = currentRenderDiv.id;
  var exprId = `expr-${cellIndex}`;
  var labelId = `label-${exprId}`;

  var expr = {
    rootDivId: rootDivId,
    exprId: exprId,
    labelId: labelId,
    labelText: labelText,
    manual: manual,
    lhss: lhss,
    rhss: rhss,
    types: types,
    dependsOn: [],
    computed: false,
  };
  perPageState.expressionsRegistered[exprId] = expr;

  return expr;
}


function expandStringWithSubstitutions(expr) {
  if (expr.indexOf('`') >= 0) {
    var newExpr = '';
    var splits = expr.split('`');
    for (var i = 0; i < splits.length; ++i) {
      var prefix = splits[i];
      newExpr += prefix;
      if (i < splits.length - 1) {
        var varName = splits[++i];
        var varValue = smartdownVariables[varName];
        if (varValue) {
          newExpr += `${varValue}`;
        }
        else {
          newExpr += `\`${varName}\``;
        }
      }
    }
    expr = newExpr;
  }

  return expr;
}


function computeExpressions() {
  // console.log('computeExpressions', perPageState.expressionsRegistered);
  /* eslint-disable guard-for-in */

  for (var exprId in perPageState.expressionsRegistered) {
    const entry = perPageState.expressionsRegistered[exprId];
    if (!entry) {
      console.log('computeExpressions DELETED', exprId);
    }
    else if (entry.manual) {
      // console.log('compute manual', entry, entry.labelId);
      if (entry.labelId) {
        var rootDiv = document.getElementById(entry.rootDivId);
        var labelElement = document.getElementById(entry.labelId);
        if (!labelElement) {
          // console.log('computeExpressions NO LABEL', entry, entry.labelId, entry.rootDivId, rootDiv);
          // debugger;
        }
        else {
          labelElement.innerHTML = expandStringWithSubstitutions(entry.labelText);
        }
      }
      else {
        console.log('computeExpressions NO LABEL for manual expression', entry);
      }
    }
    else { /* if (true || !entry.computed) { */ // Currently disabled until entry.dependsOn is derived from rhs
      entry.computed = true;
      smartdown.computeExpression(entry);
    }
  }
  /* eslint-enable guard-for-in */
}

function registerPlayable(prelude, language, renderDivId, divId, preId, dbgId, dbgToggleId, consoleId, consoleToggleId, functionId, playId, stopId, progressId, autoplay, isModule, code, transform, targetDivId) {
  var augmentedCode = code;
  var playableType = playableTypes[language];

  const imports = prelude.imports;
  const includes = prelude.includes;

  // console.log('registerPlayable', prelude, language, renderDivId, divId, preId, code.slice(0, 50), playId, stopId);

  if (playableType.javascript) {
    if (language === 'go' && playableType.transform) {
      augmentedCode =
`
// Augmented JS to support GoDown
// console.log('playable:${uniquePlayableIndex}:', playable);
eval(playable.transformedCode);
//        this.div.innerHTML='<pre><code>' + playable.transformedCode + '</code></pre>';
`;
    }
    else if (language === 'react') {
      augmentedCode = React.generateAugmentedPlayable();
    }
    else if (language === 'typescript') {
      augmentedCode = Typescript.generateAugmentedPlayable(divId, isModule);
    }
    else if (language === 'brython') {
      const brythonScriptId = divId + '_brython';
      augmentedCode =
`
const pythonSource =
\`${code}\`;


let s = document.getElementById('${brythonScriptId}');
if (!s) {
  s = document.createElement('script');
  s.type = 'text/python3';
  s.id = '${brythonScriptId}';
}

s.innerHTML = '';

try {
  s.appendChild(document.createTextNode(pythonSource));
  document.body.appendChild(s);
} catch (e) {
  s.text = code;
  document.body.appendChild(s);
}

const div = document.getElementById("${divId}");
const smartdownPlayableContext = {
  smartdown: smartdown,
  divId: "${divId}",
  div: div,
  this: this,
  env: env
};

if (typeof __BRYTHON__ === 'object') {
  if (!__BRYTHON__.isConfiguredForSmartdown) {
    window.$locals___main__ = {};
    const brythonResult = brython({
     debug: 1,
     static_stdlib_import: false,
     ipy_id: []});
    __BRYTHON__.isConfiguredForSmartdown = true;
  }

  const moduleName = '${brythonScriptId}'; // '__main__';
  const localsId = '${brythonScriptId}';
  const lineInfo = null;

  // https://github.com/brython-dev/brython/wiki/How-Brython-works
  __BRYTHON__.$options = {
    debug: 1
  };

  window['$locals_' + moduleName] = {};
  const tree = __BRYTHON__.py2js(
                pythonSource,
                moduleName,
                moduleName, // localsId,
                lineInfo); // .to_js();
  let js = tree.to_js();
  var ns = __BRYTHON__.$call(__BRYTHON__.builtins.dict)();
  __BRYTHON__.smartdown = smartdownPlayableContext;
  __BRYTHON__.__ARGV = [smartdownPlayableContext];

  eval(js, ns);
}
else {
  const errorMsg = '__BRYTHON__ is not defined. Probably due to debugging or some failure to load the Brython library';
  console.log(errorMsg);
  div.innerHTML = '<h4>' + errorMsg + '</h4>';
}
`;
    }
    else if (language.toLowerCase() === 'p5js') {
      if (language === 'P5JS') {
        augmentedCode =
`
// Augmented P5JS script to support Global Mode emulation.
// function(${playableArgNames.join(', ')})
p5.TriOsc = P5.TriOsc;
p5.FFT = P5.FFT;
p5.Vector = P5.Vector;

//P5.SystemVarDecls
${P5.SystemVarDecls}

//P5.VarDefs
${P5.VarDefs}

// -----------------
// Begin User Script
${code}
// End User Script
// -----------------

//P5.UserFunctionDefs
${P5.UserFunctionDefs}
`;

        // console.log('P5JS augmentedCode in registerplayable');
        // console.log(augmentedCode);
      }
      else {
        augmentedCode =
`
// Begin Augmented script
// function(${playableArgNames.join(', ')})

p5.TriOsc = P5.TriOsc;
p5.FFT = P5.FFT;
p5.Vector = P5.Vector;

// End Augmented script

// Begin User Script
${code}
// End User Script
`;
      }
    }
    else if (language === 'openjscad') {
      const innerHTML =
`
  <div
    class="openjscad-container">
    <div
      id="${divId}-viewerContext"
      class="viewerContext"
      oncontextmenu="return false;"
    >
      <div id="${divId}-viewerDiv">
      </div>
    </div>
    <canvas
      id="${divId}-viewerCanvas"
      class="viewerCanvas"
    ></canvas>
    <div
      class="viewer-footer">
      <button
        onclick="window.resetCamera${divId}()">
        Reset Camera
      </button>
      <button
        onclick="window.exportSTL${divId}()">
        Export STL
      </button>

      <table
        id="${divId}-parametersTable"
        class="openjscad-parametersTable">
      </table>
    </div>
  </div>
`;

      augmentedCode =
`
// Begin Augmented script
// function(${playableArgNames.join(', ')})

this.div.innerHTML =
\`
${innerHTML}
\`;


const viewerContextId = '${divId}-viewerContext';
const viewerCanvasId = '${divId}-viewerCanvas';
const viewerDivId = '${divId}-viewerDiv';
const parametersTableId = '${divId}-parametersTable';

const viewerContext = document.getElementById(viewerContextId);
const viewerCanvas = document.getElementById(viewerCanvasId);
const viewerDiv = document.getElementById(viewerDivId);
const parametersTable = document.getElementById(parametersTableId);

const camera = {
  position: { x: 0, y: 0, z: 90 },
  clip: { min: 1, max: 1000 },
};

const axis = {
  draw: true,
};

const panel = {
  size: 223
};

function onUpdate(data) {
  if (data.outputFile) {
    console.log('data.outputFile', data.outputFile);
    smartdown.fileSaver.saveAs(data.outputFile.data, data.outputFile.downloadAttribute);
  }
  else {
    // console.log('onUpdate', data);
  }
}

const jscadViewer = openjscad(viewerContext, {
  processor: {
    viewerContext: viewerContext,
    viewerCanvas: viewerCanvas,
    viewerdiv: viewerDiv,
    parameterstable: parametersTable,
    setStatus: (status, data) => {
    },
    instantUpdate: true,
    onUpdate: onUpdate,
    useAsync: true
  },
  viewer: {
    axis: axis,
    camera: camera,
    panel: panel,
    glOptions: {
      canvas: viewerCanvas
    }
  }
});

window.resetCamera${divId} = function() {
  jscadViewer.resetCamera();
};

window.exportSTL${divId} = function() {
  jscadViewer.generateOutputFile({
    name: 'stla',
    extension: 'stl',
  });
};


const diagramSource =
\`
${code}
\`;

jscadViewer.setJsCad(diagramSource);
`;
    }
    else if (isModule) {
      augmentedCode =
`
${code}

if (typeof start !== 'undefined') {
  smartdown.es6Playables['${divId}'].start = start;
}
`;
    }
    else {
      augmentedCode =
`
(async () => {

  ${code}

})();

`;
    }
  }

  perPageState.playablesRegistered[divId] = {
    language: language,
    rootDivId: renderDivId,
    divId: divId,
    preId: preId,
    dbgId: dbgId,
    dbgToggleId: dbgToggleId,
    consoleId: consoleId,
    consoleToggleId: consoleToggleId,
    functionId: functionId,
    playId: playId,
    stopId: stopId,
    progressId: progressId,
    autoplay: autoplay,
    isModule: isModule,
    es6ModuleScript: null,
    playing: false,
    dependLastValues: {},
    p5: null,
    embedThis: {},
    index: perPageState.playablesRegisteredOrder.length,
    code: code,
    transform: transform,
    transformedCode: null,
    augmentedCode: augmentedCode,
    imports: imports,
    includes: includes,
    targetDivId: targetDivId,
  };

  perPageState.playablesRegisteredOrder.push(perPageState.playablesRegistered[divId]);

  return perPageState.playablesRegistered[divId];
}

async function runFunction(code, embedThis, argValues, language, div) {
  const func = new Function(...playableArgNames, code);
  let embedResult = null;
  try {
    embedResult = await func.apply(embedThis, argValues);
  }
  catch (e) {
    embedThis.log(`# Error playing ${language} playable: ${e}`);
    if (div) {
      div.innerHTML =
`
<pre><code style="color:maroon;">
<b>Error Playing ${language} playable</b>
<hr>
${e}
</code></pre>
`;
    };
  }

  return embedResult;
}


async function runModule(playable, argValues, language) {
  const divId = playable.divId;
  const code = playable.augmentedCode;
  const embedThis = playable.embedThis;
  // console.log('runModule', playable, embedThis, code.slice(0, 50));

  var s = document.createElement('script');
  playable.es6ModuleScript = s;
  if (smartdown.es6Playables[divId]) {
    console.log('runModule error: smartdown.es6Playables[divId] exists', divId, smartdown.es6Playables[divId]);
  }
  smartdown.es6Playables[divId] = {
    script: s,
    start: null,
  }
  s.type = 'module';
  s.onload = function (evt) {
    // console.log('...onload', evt, divId, smartdown.es6Playables[divId]);
    if (smartdown.es6Playables[divId].start) {
      smartdown.es6Playables[divId].start(embedThis, ...argValues);
    }
  };
  s.onerror = function (error) {
    console.log('runModule...onerror', error);
  };
  s.async = false;
  s.text = code;

  document.head.appendChild(s);
  const embedResult = null;

  return embedResult;
}


async function playPlayableInternal(language, divId) {
  // console.log('playPlayableInternal', divId);

  var playable = perPageState.playablesRegistered[divId];
  var div = document.getElementById(playable.divId);
  var divPre = document.getElementById(playable.preId);
  // var divDbg = document.getElementById(playable.dbgId);
  // var divDbgToggle = document.getElementById(playable.dbgToggleId);
  var play = document.getElementById(playable.playId);
  var stop = document.getElementById(playable.stopId);
  var progress = document.getElementById(playable.progressId);
  if (play) {
    play.style.display = 'none';
    stop.style.display = 'inline-block';
  }
  if (divPre) {
    divPre.style.display = 'none';
  }
  if (progress) {
    progress.style.display = playable.targetDivId ? 'inline-block' : 'block';
  }
  playable.playing = true;
  div.parentElement.classList.add('playable-playing');
  if (div) {
    div.style.display = playable.targetDivId ? 'inline' : 'block';
  }
  var playableType = playableTypes[language];
  if (playableType.javascript) {
    /* eslint no-new-func: 0 */
    var argValues = [
      playable,
      smartdownVariables,
      P5.Loader,
      window.d3v5,
      window.d3fc,
      window.d3dc,
      window.topojson,
      window.Plotly,
      window.Leaflet,
      window.Stdlib,
      window.THREE,
      module.exports, // smartdown
      {}    // This will be a p5 obj in the case of using P5.Loader
    ];
    playable.embedThis = {
      // env: smartdownVariables,
      div: div,
      progress: progress,
      dependOn: {},
      depend: null,
      log: function(...args) {
        smartdown.consoleWrite(playable, args);
      },
      atExitHandlers: [],
      atExit: function(func) {
        // console.log('atExit', func, this);
        this.atExitHandlers.push(func);
      }
    };

    if (language.toLowerCase() !== 'p5js') {
      if (playable.isModule) {
        if (playable.language === 'typescript') {
          const embedResult = await smartdown.runFunction(playable.augmentedCode, playable.embedThis, argValues, language, div);
        }
        else {
          const embedResult = await smartdown.runModule(playable, argValues, language);
        }
      }
      else {
        const embedResult = await smartdown.runFunction(playable.augmentedCode, playable.embedThis, argValues, language, div);
        if (language === 'leaflet' && !playable.embedThis.leafletMap) {
          playable.embedThis.leafletMap = embedResult;
        }
      }
    }
    else {
      /* xeslint no-eval: 0 */

      /* eslint no-inner-declarations: 0 */
      function patchedDisposeSound() {
        /* eslint no-invalid-this: 0 */
        for (var i = 0; i < P5.Loader.soundOut.soundArray.length; i++) {
          var soundResource = P5.Loader.soundOut.soundArray[i];
          if (!soundResource.owner ||
              soundResource.owner === this) {
            // console.log('DISPOSE [' + i + '] disposeSound soundResource:', soundResource);
            soundResource.dispose();
          }
        }
      }

      var removeHandlers = P5.Loader.prototype._registeredMethods.remove;
      for (var i = 0; i < removeHandlers.length; ++i) {
        if (removeHandlers[i] === P5.Loader.prototype.disposeSound) {
          removeHandlers[i] = patchedDisposeSound;
        }
      }

      // var oldmousemove = P5.Loader.prototype._onmousemove;
      // P5.Loader.prototype._onmousemove = function(e) {
      //   console.log('onmousemove', e);
      // };
      // var oldtouchend = P5.Loader.prototype._ontouchend;
      P5.Loader.prototype._ontouchend = function (e) {
        // Smartdown addition to capture page dimensions
        e.clientX = e.pageX;
        e.clientY = e.pageY;
        // return oldtouchend.apply(this, arguments);


        // This code will be needed until a fix is made to 0.5.8 of P5JS
        // Copied from 0.5.8 of P5JS
        // Working around bug in https://github.com/processing/p5.js/pull/1820/files

        this._updateTouchCoords(e);
        this._updateNextMouseCoords(e);
        if (this.touches.length === 0) {
          this._setProperty('touchIsDown', false);
        }
        var context = this._isGlobal ? window : this;
        var executeDefault;
        if (typeof context.touchEnded === 'function') {
          executeDefault = context.touchEnded(e);
          if (executeDefault === false) {
            e.preventDefault();
          }
        }
        else if (typeof context.mouseReleased === 'function') {
          executeDefault = context.mouseReleased(e);
          if (executeDefault === false) {
            e.preventDefault();
          }
        }
      };

      let func = new Function(...playableArgNames, playable.augmentedCode);
      playable.embedThis.IAMP5 = 'IAMP5';
      func = func.bind(
        playable.embedThis,
        ...(argValues.slice(0, -1))
      );

      try {
        var myP5 = new P5.Loader(func, div);
        if (myP5._targetFrameRate === 60) {
          myP5.frameRate(16);
        }
        myP5._onresize();
        function keydownHandler(e) {
          // console.log('keydownHandler', e.target.tagName, e);
          var ignoreKeys = [
            myP5.LEFT_ARROW,
            myP5.RIGHT_ARROW,
            myP5.UP_ARROW,
            myP5.DOWN_ARROW,
            32
          ];

          if (e.target.tagName === 'BODY' && ignoreKeys.indexOf(e.keyCode) >= 0) {
            // console.log('ignoring', e);
            e.preventDefault();
          }
        }
        myP5.keydownHandler = keydownHandler;
        window.addEventListener('keydown', keydownHandler, false);

        playable.p5 = myP5;
      }
      catch (e) {
        console.log('#### Error initializing P5JS', e);
        div.innerHTML =
`
<pre><code style="color:tomato;">
<b>Error Initializing P5JS</b>
${e}
</code></pre>
`;
        // resetPlayable(language, divId);
      }
    }

    if (playable && playable.playing) {
      const { depend, dependOn } = playable.embedThis;
      const progress = playable.embedThis.progress;
      let atLeastOneDefined = false;

      if (Array.isArray(dependOn)) {
        // Legacy mode with a single .depend() method
        if (!depend) {
          atLeastOneDefined = true; // To drop the progress bar
        }
        else {
          let atLeastOneUndefined = false;
          dependOn.forEach(varname => {
            const newValue = smartdownVariables[varname];
            if (newValue === undefined) {
              atLeastOneUndefined = true;
            }
            playable.dependLastValues[varname] = newValue;
          });

          if (!atLeastOneUndefined) {
            atLeastOneDefined = true;
            await depend.apply(playable.embedThis);
          }
        }
      }
      else if (dependOn) {
        let atLeastOneEvaluated = false;
        for (const varname in dependOn) {
          atLeastOneEvaluated = true;
          const newValue = smartdownVariables[varname];
          playable.dependLastValues[varname] = newValue;

          if (newValue !== undefined) {
            atLeastOneDefined = true;
            dependOn[varname].apply(playable.embedThis);
          }
        }

        if (!atLeastOneEvaluated) {
          atLeastOneDefined = true; // To drop the progress bar
        }
      }

      if (atLeastOneDefined) {
        if (progress) {
          progress.style.display = 'none';
        }
      }
    }
  }
  else if (language === 'mermaid') {
    Mermaid.mermaidRender(div, playable.code);

    if (progress) {
      progress.style.display = 'none';
    }
  }
  else if (language === 'graphviz') {
    div.innerHTML = '<i>...rendering graphviz...</i>';
    window.smartdownJSModules.graphviz.loader(function () {
      var options = {
        images: graphvizImages
      };

      (new window.Viz()).renderString(playable.code, options).then(result => {
        if (progress) {
          progress.style.display = 'none';
        }
        div.innerHTML = result;
      });
    });
  }
  else if (language.indexOf('abc') === 0) {
    const abcBaseId = div.id;
    div.innerHTML =
`
  <div class="abc-wrapper">
    <div
      id="${abcBaseId}-sheet"
      class="smartdown-abcsheet">
    </div>
    <div
      id="${abcBaseId}-midi"
      class="smartdown-abcmidi">
    </div>
  </div>
`;

    ensureExtension(
      'abc',
      function () {
        renderABCIntoDivs(abcBaseId, language, playable.code);

        if (progress) {
          progress.style.display = 'none';
        }
      });
  }
  else {
    console.log('language: ', language);
  }
}


function recursivelyLoadImports(language, divId, importsRemaining, done) {
  // console.log('recursivelyLoadImports', language, divId, JSON.stringify(importsRemaining), importsRemaining.length);
  if (importsRemaining.length > 0) {
    const nextImportPair = importsRemaining.shift();
    const nextImport = nextImportPair[0];
    const nextImportIsModule = nextImportPair[1];

    // DRY THIS UP

    if (isExtensionRegistered(nextImport)) {
      ensureExtension(nextImport, function() {
        recursivelyLoadImports(language, divId, importsRemaining, done);
      });
    }
    else if (nextImport === 'brython') {
      window.smartdownJSModules.brython.loader(function () {
        recursivelyLoadImports(language, divId, importsRemaining, done);
      });
    }
    else if (nextImport.toLowerCase() === 'p5js') {
      window.smartdownJSModules.p5js.loader(function () {
        recursivelyLoadImports(language, divId, importsRemaining, done);
      });
    }
    else if (nextImport === 'graphviz') {
      window.smartdownJSModules.graphviz.loader(function () {
        recursivelyLoadImports(language, divId, importsRemaining, done);
      });
    }
    else {
      loadExternal(nextImport, nextImportIsModule, function () {
        recursivelyLoadImports(language, divId, importsRemaining, done);
      });
    }
  }
  else if (done) {
    done();
  }
}

function playPlayable(language, divId) {
  // console.log('playPlayable', divId);
  var playable = perPageState.playablesRegistered[divId];
  if (playable) {
    const importsRemaining = playable.imports.slice(0);  // Copy

    var progress = document.getElementById(playable.progressId);
    progress.style.display = playable.targetDivId ? 'inline-block' : 'block';

    recursivelyLoadImports(language, divId, importsRemaining, function() {
      progress.style.display = 'none';
      playPlayableInternal(language, divId);
    });
  }
  else {
    console.log('playPlayable... not found', language, divId, perPageState.playablesRegistered, perPageState.playablesRegisteredOrder);
  }
}


function resetPlayable(language, divId, throwAway) {
  var playable = perPageState.playablesRegistered[divId];
  if (!playable.playing) {
    // console.log('resetPlayable NOT PLAYING', language, divId);
  }
  else {
    // console.log('resetPlayable PLAYING', playable.divId, playable);
    var div = document.getElementById(playable.divId);
    var play = document.getElementById(playable.playId);
    var stop = document.getElementById(playable.stopId);
    var progress = document.getElementById(playable.progressId);
    if (play) {
      play.style.display = 'inline-block';
      stop.style.display = 'none';
    }

    if (progress) {
      progress.style.display = 'none';
    }

    var divPre = document.getElementById(playable.preId);
    if (divPre && !throwAway) {
      divPre.style.display = 'block';
    }

    var playableType = playableTypes[language];

    playable.playing = false;
    div.parentElement.classList.remove('playable-playing');

    div.style.display = 'none';
    if (playableType.javascript) {
      const atExitHandlers = playable.embedThis.atExitHandlers;
      atExitHandlers.forEach(function(func) {
        // console.log('resetPlayable... calling atExitHandler', func);
        func();
      });
      if (language.toLowerCase() === 'p5js') {
        var myP5 = playable.p5;
        if (myP5) {
          window.removeEventListener('keydown', myP5.keydownHandler);
          // myP5.noLoop();
          playable.p5 = null;
          myP5.remove();
          if (div) {
            var canvas = div.getElementsByTagName('canvas');
            if (canvas && canvas.length > 0) {
              div.removeChild(canvas[0]);
            }
          }
        }
      }
      else if (language === 'leaflet') {
        if (!playable.embedThis) {
          console.log('   playable.embedThis', playable.embedThis, playable, divId);
        }
        if (playable.embedThis.leafletMap) {
          // console.log('leaflet playable.embedThis.leafletMap', playable.embedThis.leafletMap);
          playable.embedThis.leafletMap.remove();
          delete playable.embedThis.leafletMap;
        }
      }
      else if (language === 'go') {
        if (playable.isGodownMain) {
          try {
            /* global Godown_Shutdown */
            Godown_Shutdown();
          }
          catch (e) {
            console.log('exception from runtime.Goexit', e);
          }
        }
      }

      if (playable.isModule) {
        console.log('resetPlayable isModule', playable.es6ModuleScript);
        playable.es6ModuleScript.remove();
        playable.es6ModuleScript = null;
      }
    }

    div.innerHTML = '';
  }
}


function toggleDebug(divId) {
  var div = document.getElementById(divId);
  const newStyle = (div.style.display === 'block' ? 'none' : 'block');
  div.style.display = newStyle;
}



function toggleConsole(divId) {
  var div = document.getElementById(divId);
  if (div) {
    const newStyle = (div.style.display === 'block' ? 'none' : 'block');
    div.style.display = newStyle;
  }
}


function consoleWrite(playable, args) {
  let msg = '';
  args.forEach((arg) => {
    if (typeof arg === 'object') {
      arg = JSON.stringify(arg, null, 2);
    }
    msg += arg + ' ';
  });

  const div = document.getElementById(playable.consoleId);
  if (div) {
    div.style.display = 'block';
    const pre = document.getElementById(playable.consoleId + '-pre');
    pre.innerText = pre.innerText + msg + '\n';
    div.scrollTop = div.scrollHeight;
    const nLines = pre.innerText.split('\n').length;
    const maxLinesClip = 10;
    const nLinesClipped = Math.min(nLines, maxLinesClip);
    const lineHeight = 25;
    const newHeight = nLinesClipped * lineHeight;
    if (newHeight > div.scrollHeight) {
      div.style.height = `${newHeight}px`;
    }
  }
  const toggle = document.getElementById(playable.consoleToggleId);
  if (toggle) {
    toggle.style.display = 'block';
  }
}


function activateDraggableDisclosure(divId) {
  var div = document.getElementById(divId);
  const body = document.getElementsByTagName('body')[0];
  const baseContainer = div.parentElement;
  var divHeader = document.getElementById(divId + '_header');
  var offsetX = 0;
  var offsetY = 0;

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }

  //
  // Note to the future about draggable things within CSS-transformed things like
  // smartdown/impress...
  //
  // I spent a lot of time trying to get this dragging code to work on draggable disclosables
  // in two different contexts:
  // - Ordinary smartdown div.
  // - Smartdown div within a CSS-transformed environment such as smartdown/impress.
  // I need to commit this PR so I'm calling it quits on making this perfect, for now.
  //
  // I eventually got the smartdown/impress mode 'sort of working', and favored the primary
  // use case of a typical smartdown div without transform.
  //
  // Things to fix/test include:
  //  - Verify that dragging a disclosable is bounded by the visible window size. This is the part
  // that is broken for smartdown/impress.
  //  - Verify that dragging 'feels right' and that the mouse cursor tracks the draggable position.
  //  - Verify that dragging respects the visible window boundary, even when the contents of
  //  the window are vertically scrolled and the contents are not in their scrollTop==0 state.
  //
  function elementDrag(e) {
    const x = 0;

    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    let newX = e.clientX - offsetX;
    let newY = e.clientY - offsetY;

    // // keep it inside the window
    if (newY > window.innerHeight + baseContainer.scrollTop - div.offsetHeight) {
      // console.log(newY, window.innerHeight + baseContainer.scrollTop + div.offsetHeight, window.innerHeight, baseContainer.scrollTop, div.offsetHeight);
      newY = window.innerHeight + baseContainer.scrollTop - div.offsetHeight;
    }
    if (newY < 0) {
      newY = 0;
    }
    if (newX > window.innerWidth - div.offsetWidth) {
      newX = window.innerWidth - div.offsetWidth;
    }
    if (newX < 0) {
      newX = 0;
    }

    // set the element's new position:
    div.style.top = `${newY}px`;
    div.style.left = `${newX}px`;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    offsetX = e.clientX - div.offsetLeft;
    offsetY = e.clientY - div.offsetTop;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  divHeader.onmousedown = dragMouseDown;

}

function deactivateOnMouseLeave(divId, overrideLocked) {
  var div = document.getElementById(divId);

  if (overrideLocked || !div.disclosableLocked) {
    window.clearTimeout(div.disclosableTimer);
    div.disclosableTimer = null;
    div.disclosableLocked = false;
    div.onmouseenter = null;
    div.onmouseleave = null;
  }
}


function setDisclosureLocation(div, contentDiv, triggerId, settings) {

  // this code is dependent on the css for diclosable-position
  // I can't seem to get reliable offsetHeight and offsetWidth
  // This is a hack to mostly make it work.
  if (settings.display === 'position') {
    div.classList.add('disclosable-position');
    let top = 0;
    let left = 0;
    const height = div.offsetHeight;  // height is max 50%
    const width = div.offsetWidth;    // width is max 50%
    const divBound = div.getBoundingClientRect();

    const baseContainer = div.parentElement;
    const bound = baseContainer.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    const visibleHeight = Math.min(bound.height, viewportHeight);
    const visibleWidth = Math.min(bound.width, viewportWidth);
    const padding = 25;

    switch (settings.location) {
      case 'center':
        top = (visibleHeight - height) / 2 + baseContainer.scrollTop;
        left = (visibleWidth - width) / 2 + baseContainer.scrollLeft;

        // console.log('top left',
        //   top, left);
        // console.log('h w',
        //   height, width);
        // console.log('vh vw',
        //   visibleHeight, visibleWidth);
        // console.log('vph vpw',
        //   viewportHeight, viewportWidth);
        // console.log(bound);
        // console.log(divBound);
        // console.log('scrolltop', baseContainer.scrollTop, div.scrollTop, window.scrollTop);
        // console.log('scrollLeft', baseContainer.scrollLeft, div.scrollLeft, window.scrollLeft);
        break;
      case 'topleft':
        top = 0 + padding;
        left = 0 + padding;
        break;
      case 'topright':
        top = 0 + padding;
        left = (visibleWidth - width - padding);
        break;
      case 'bottomleft':
        top = (visibleHeight - height - padding);
        left = 0 + padding;
        break;
      case 'bottomright':
        top = (visibleHeight - height - padding);
        left = (visibleWidth - width - padding);
        break;
      default:
        break;
    }
    div.style.top = `${top}px`;
    div.style.left = `${left}px`;
  }
  else if (settings.display === 'attach') {
    const trigger = document.getElementById(triggerId);
    div.classList.add('disclosable-attach');
    div.style.top = `${trigger.offsetTop + trigger.offsetHeight}px`;

    //
    // Hack for InfoClay because the dnd-list there
    // has relative positioning. InfoClay will override
    // the default .disclosable-attach style to indicate
    // that it is using relative positioning.
    //
    const computedStyle = window.getComputedStyle(div);
    if (computedStyle.position === 'relative') {
      div.style.top = 0;
    }

    const divWidth = div.clientWidth; // Math.floor(2 * window.innerWidth / 3); // width: 66%;
    const paddingHack = 30;
    if ((trigger.offsetLeft + divWidth + paddingHack) < window.innerWidth) {
      // console.log('noadjust', trigger.offsetLeft, divWidth, (trigger.offsetLeft + divWidth), window.innerWidth, trigger.offsetWidth);
      div.style.left = `${trigger.offsetLeft}px`;
    }
    else {
      const left = Math.max(0, trigger.offsetLeft + trigger.offsetWidth - divWidth);
      // console.log('adjust', left, trigger.offsetLeft, divWidth, (trigger.offsetLeft + divWidth), window.innerWidth, trigger.offsetWidth);
      div.style.left = `${left}px`;
    }
  }
}


class DisclosableSettings {
  constructor() {
    this.showTrigger = 'button';
    this.display = 'inline';
    this.location = null;
    this.hideTrigger = null;
    this.decorations = [];
    this.decorationsInner = [];
    this.draggable = false;
  }

}

function parseDisclosureSettings(settingsStr) {
  const settings = new DisclosableSettings();
  let options = settingsStr.split(',');

  if (options.includes('transparent')) {

  }
  else {
    options.push('shadow');
    options.push('outline');
  }

  if (options.includes('tooltip')) {
    options.push('link');
    options.push('attach');
    options.push('onmouseleave');
  }

  if (options.includes('link')) {
    settings.showTrigger = 'link';
  }

  if (options.includes('attach')) {
    settings.display = 'attach';
  }
  else {
    let location = '';
    if (options.includes('center')) {
      location = 'center';
    }
    else if (options.includes('topleft') ||
             options.includes('upperleft')) {
      location = 'topleft';
    }
    else if (options.includes('topright') ||
             options.includes('upperright')) {
      location = 'topright';
    }
    else if (options.includes('bottomleft')) {
      location = 'bottomleft';
    }
    else if (options.includes('bottomright')) {
      location = 'bottomright';
    }
    if (location !== '') {
      settings.display = 'position';
      settings.location = location;
    }
  }

  if (settings.display === 'position') {
    if (options.includes('draggable')) {
      settings.draggable = true;
    }
    if (options.includes('scrollable')) {
      settings.scrollable = true;
    }
  }

  if (options.includes('onmouseleave')) {
    settings.hideTrigger = 'onmouseleave';
  }
  else if (options.includes('closeable')) {
    settings.hideTrigger = 'closeable';
  }

  // collect up any decorations into a list
  // this is not a great strategy for easy maintenance,
  // but it reduces the syntax burden on the author
  // because decorations just get added in with all the
  // other options

  if (options.includes('outline')) {
    if (settings.draggable) {
      settings.decorations.push('outline-draggable');
      settings.decorationsInner.push('outline-draggable-content');
    }
    else {
      settings.decorations.push('outline');
      settings.decorationsInner.push('outline-content');
    }
  }

  if (options.includes('shadow')) {
    settings.decorations.push('shadow');
    settings.decorationsInner.push('shadow-content');
  }

  if (options.includes('transparent')) {
    settings.decorations.push('transparent');
    settings.decorationsInner.push('transparent-content');
  }

  if (options.includes('lightbox')) {
    settings.decorations.push('lightbox');
    settings.decorationsInner.push('lightbox-content');
  }


  return settings;
}


function showDisclosure(divId, triggerId, settingsStr) {
  const settings = parseDisclosureSettings(settingsStr);

  var div = document.getElementById(divId);
  div.classList.remove('disclosable-draggable', 'disclosable-scrollable', 'disclosable-shadow', 'disclosable-lightbox', 'disclosable-outline', 'disclosable-transparent');

  var contentDiv = div.querySelector('.disclosable-content');
  contentDiv.classList.remove('disclosable-scrollable-content', 'disclosable-shadow-content', 'disclosable-lightbox-content', 'disclosable-outline-content', 'disclosable-transparent-content');
  div.classList.add('disclosable-open');
  if (settings.scrollable) {
    div.classList.add('disclosable-scrollable');
    contentDiv.classList.add('disclosable-scrollable-content');
  }

  for (var i = 0; i < settings.decorations.length; i++) {
    div.classList.add(`disclosable-${settings.decorations[i]}`);
  }

  for (var i = 0; i < settings.decorationsInner.length; i++) {
    contentDiv.classList.add(`disclosable-${settings.decorationsInner[i]}`);
  }

  var headerDiv = document.getElementById(`${divId}_header`);
  headerDiv.classList.remove('disclosable-header-position');

  if (settings.draggable) {
    headerDiv.classList.add('disclosable-header-position');
    if (settings.hideTrigger === 'closeable') {
      headerDiv.innerHTML = `<button class="disclosable-button-close" onclick="smartdown.hideDisclosure('${divId}','${settingsStr}')">&times;</button>`;
    }
    else {
      headerDiv.innerHTML = '&#9673;';
    }

    activateDraggableDisclosure(divId);
  }

  setDisclosureLocation(div, contentDiv, triggerId, settings);

  if (settings.hideTrigger === 'onmouseleave') {
    /* eslint-disable no-use-before-define */
    activateOnMouseLeave(divId, settingsStr);
    /* eslint-enable no-use-before-define */
  }
}


function hideDisclosure(divId, settingsStr) {
  const settings = parseDisclosureSettings(settingsStr);
  var div = document.getElementById(divId);
  var contentDiv = div.querySelector('.disclosable-content');

  div.classList.remove('disclosable-open');

  if (div.classList.contains('disclosable-position')) {
    div.classList.remove('disclosable-position');
  }

  if (div.classList.contains('disclosable-attach')) {
    div.classList.remove('disclosable-attach');
  }

  for (var i = 0; i < settings.decorations.length; i++) {
    if (div.classList.contains(`disclosable-${settings.decorations[i]}`)) {
      div.classList.remove(`disclosable-${settings.decorations[i]}`);
    }
  }

  for (var i = 0; i < settings.decorationsInner.length; i++) {
    if (contentDiv.classList.contains(`disclosable-${settings.decorationsInner[i]}`)) {
      contentDiv.classList.remove(`disclosable-${settings.decorationsInner[i]}`);
    }
  }

  if (settings.hideTrigger === 'onmouseleave') {
    div.disclosableTimer = window.setTimeout(_ => {
      deactivateOnMouseLeave(divId);
    }, 500);
  }
}

function isFullscreen() {
  return  document.fullscreenElement ||
          document.webkitFullscreenElement ||
          document.mozFullscreenElement ||
          document.msFullscreenElement;
}

// https://www.w3schools.com/howto/howto_js_fullscreen.asp
/* View in fullscreen */
function openFullscreen() {
  var elem = document.documentElement;
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
    elem.msRequestFullscreen();
  }
}

/* Close fullscreen */
function closeFullscreen() {
  var elem = document.documentElement;
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) { /* Firefox */
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE/Edge */
    document.msExitFullscreen();
  }
}

function toggleKiosk(divId, event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }

  var div = document.getElementById(divId);
  div.parentElement.classList.toggle('smartdown-playable-kiosk');
  div.scrollIntoView();

  var playable = perPageState.playablesRegistered[divId];
  if (playable && playable.p5) {
    playable.p5._onresize();
  }
}


function toggleDisclosure(divId, triggerId, settingsStr) {
  var div = document.getElementById(divId);
  const willBeOpen = !div.classList.contains('disclosable-open');

  if (willBeOpen) {
    showDisclosure(divId, triggerId, settingsStr);
  }
  else {
    hideDisclosure(divId, settingsStr);
  }


  // this will need to be added when we have a datastructure for
  // disclosables.  A list of triggers to update.
  // maybe we could make an updateTriggerButton function
  // var openedSpan = document.getElementById(`span_${divId}_opened`);
  // if (openedSpan) {
  //   openedSpan.style.display = willBeOpen ? 'inline' : 'none';
  // }
  // var closedSpan = document.getElementById(`span_${divId}_closed`);
  // if (closedSpan) {
  //   closedSpan.style.display = willBeOpen ? 'none' : 'inline';
  // }

}


function activateOnMouseLeave(divId, settingsStr) {
  var div = document.getElementById(divId);
  window.clearTimeout(div.disclosableTimer);
  div.disclosableTimer = null;
  div.disclosableLocked = false;

  div.onmouseenter = e => {
    div.disclosableLocked = true;
    window.clearTimeout(div.disclosableTimer);
    div.disclosableTimer = null;
  };

  div.onmouseleave = e => {
    if (
      (e.pageX <= div.offsetLeft) ||
      (e.pageX >= div.offsetLeft + div.offsetWidth) ||
      (e.pageY <= div.offsetTop) ||
      (e.pageY >= div.offsetTop + div.offsetHeight)) {
      // console.log('nonbogus mouseleave', e.clientY, e.pageY, div.offsetTop, div.offsetHeight, e);
      div.disclosableLocked = false;
      div.disclosableTimer = window.setTimeout(_ => {
        hideDisclosure(divId, settingsStr);
      }, 200);
    }
    else {
      // Scrolling induces mouseLeave events even thought the mouse
      // is within its element. The above code verifies that it is
      // an authentic mouseleave.
      // console.log('ignoring bogus mouseleave', e.clientY, e.pageY, div.offsetTop, div.offsetHeight, e);
    }
  };
}


function linkWrapperExit(divId, settingsStr) {
  var div = document.getElementById(divId);
  div.disclosableTimer = window.setTimeout(_ => {
    this.hideDisclosure(divId, settingsStr);
  }, 500);
}


function pause() {
  each(perPageState.playablesRegisteredOrder, function (playable) {
    if (playable && playable.p5) {
      playable.p5.getAudioContext().suspend();
    }
  });
}


function resume() {
  each(perPageState.playablesRegisteredOrder, function (playable) {
    if (playable && playable.p5) {
      playable.p5.getAudioContext().resume();
    }
  });
}


function handleVisibilityChange() {
  if (document.hidden) {
    pause();
  }
  else {
    resume();
  }
}


function startAutoplay(outputDiv) {
  // console.log('startAutoplay', outputDiv);
  if (outputDiv && outputDiv.id) {
    each(perPageState.playablesRegisteredOrder, function(playable) {
      // console.log('startAutoplay', outputDiv, outputDiv.id, playable);
      if (playable.autoplay && !playable.playing) {
        var sel = '#' + outputDiv.id + ' #' + playable.divId;
        var divHere = document.querySelectorAll(sel);
        if (divHere && divHere.length > 0) {
          playPlayable(
            playable.language,
            playable.divId);
        }
        else {
          // console.log('...startAutoplay DIV NOT FOUND', sel, outputDiv, outputDiv.id, playable);
        }
      }
    });
  }
}

function resetPerPageState() {
  perPageState.expressionsRegistered = {};
  perPageState.playablesRegistered = {};
  perPageState.playablesRegisteredOrder = [];
}


function cleanupOrphanedStuff() {
  const newER = {};
  /* eslint-disable guard-for-in */
  for (var exprId in perPageState.expressionsRegistered) {
    const expr = perPageState.expressionsRegistered[exprId];
    if (!expr) {
      // console.log('cleanupOrphanedStuff expr DELETED', exprId);
    }
    else {
      var element = document.getElementById(expr.rootDivId);
      var labelElement = document.getElementById(expr.labelId);
      // console.log('cleanupOrphanedStuff/expr', expr.rootDivId, expr);
      if (element && labelElement) {
        newER[expr.exprId] = expr;
        // console.log('...cleanupOrphanedStuff/expr div found', expr.rootDivId, expr, element);
      }
      else {
        // console.log('...cleanupOrphanedStuff/expr divs not found', expr.rootDivId, expr.labelId, expr, element, labelElement);
      }
    }
  }
  /* eslint-enable guard-for-in */

  perPageState.expressionsRegistered = newER;

  const newPRO = [];
  const newPR = {};

  each(perPageState.playablesRegisteredOrder, function (playable) {
    // console.log('cleanupOrphanedStuff/playable', playable.divId, playable);
    var element1 = document.getElementById(playable.divId);

    if (element1) {
      newPRO.push(playable);
      newPR[playable.divId] = playable;
      // console.log('...cleanupOrphanedStuff/playable div found', playable.playing, playable.divId, playable, element1, element2);
    }
    else {
      playable.deleted = true;
      // console.log('...cleanupOrphanedStuff/playable div not found', playable.playing, playable.divId, playable, element1, element2);
    }
  });


  perPageState.playablesRegistered = newPR;
  perPageState.playablesRegisteredOrder = newPRO;
}


function resetAllPlayables(outputDiv, throwAway) {
  // console.log('resetAllPlayables', perPageState.playablesRegisteredOrder);
  each(perPageState.playablesRegisteredOrder, function (playable) {
    if ((outputDiv.id === playable.rootDivId) && playable.divId) {
      const playableElement = document.getElementById(playable.divId);
      if (playableElement) {
        // console.log('resetAllPlayables', playable.divId, playableElement, perPageState.playablesRegisteredOrder);
        resetPlayable(
          playable.language,
          playable.divId,
          throwAway
        );
      }
      else {
        console.log('resetAllPlayables PLAYABLE DIV NOT FOUND', outputDiv.id, playable.divId, playable);
      }
    }
  });

  pause();
}


function transformPlayables(outputDiv, done) {
  var playablesToTransform = [];
  if (window.godownTranslate) {
    each(perPageState.playablesRegisteredOrder, function (playable) {
      if (playable.transform) {
        if (outputDiv.id) {
          var sel = '#' + outputDiv.id + ' #' + playable.divId;
          var divHere = document.querySelectorAll(sel);
          if (divHere && divHere.length > 0) {
            playablesToTransform.push(playable);
          }
        }
      }
    });
  }

  function recursiveTransform(slicedPlayablesToTransform, slicedDone) {
    if (slicedPlayablesToTransform.length === 0) {
      slicedDone();
    }
    else {
      var playable = slicedPlayablesToTransform[0];
      var code = playable.code;
      var packageIndex = code.indexOf('package ');

      if (packageIndex === 0) {
        var packageEndIndex = code.indexOf('\n');
        if (packageEndIndex !== 0) {
          var packageName = code.slice('package '.length, packageEndIndex);

          var divAccessCode =
`
window.godownDiv_${packageName} = '${playable.divId}';
console.log('window.godownDiv_${packageName}', window.godownDiv_${packageName});
`;
          try {
            window.godownTranslate(packageName, code, function (transformedCodeResult) {
              playable.isGodownMain = packageName === 'main';
              playable.transformedCode = divAccessCode + transformedCodeResult;
              recursiveTransform(slicedPlayablesToTransform.slice(1), slicedDone);
            });
          }
          catch (e) {
            console.log('# Exception during transform', e);
          }
        }
      }
    }
  }

  recursiveTransform(playablesToTransform, done);
}


function setLinkRules(_linkRules) {
  linkRules.length = 0;
  _linkRules.forEach(link => {
    linkRules.push(link);
  });
}


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

function configure(options, loadedHandler) {
  const media = options.media;
  const _baseURL = options.baseURL;
  const _cardLoader = options.cardLoader;
  const _calcHandlers = options.calcHandlers;
  const _linkRules = options.linkRules;

  document.addEventListener('visibilitychange', handleVisibilityChange);

  /* global navigator */
  if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
    document.querySelector('meta[name=viewport]')
      .setAttribute(
        'content',
        'initial-scale=1.0001, minimum-scale=1.0001, maximum-scale=1.0001, user-scalable=no'
      );
  }

  cardLoader = _cardLoader;
  calcHandlers = _calcHandlers;

  if (_linkRules) {
    setLinkRules(_linkRules);
  }

  mediaRegistry = media || {};
  window.mediaRegistry = mediaRegistry;

  /* global MathJax */
  /* eslint-disable */
  /* eslint new-cap: 0 */
  /* eslint no-native-reassign: 0 */
  /* eslint no-trailing-spaces: 0 */
  /* global smartdown */
  function svgLoaded() {
    /* eslint no-invalid-this: 0 */
    var sourceText = this.responseText;
    var media = mediaRegistry[this.svgKey];
    media.svgData = sourceText;
    media.type = 'svginline';
    // console.log('svgLoaded', this.svgKey, media, sourceText.slice(0, 40));
  }

  for (var key in mediaRegistry) {
    var url = mediaRegistry[key];
    mediaRegistry[key] = {
      type: '',
      url: '',
      expandedurl: '',
      svgData: '',
    };

    if (url.indexOf('<svg ') === 0) {
      mediaRegistry[key].type = 'svg';
      mediaRegistry[key].url = key;
      mediaRegistry[key].expandedurl = key;
      mediaRegistry[key].svgData = url;
    }
    else if (url.endsWith('.svg')) {
      var oReq = new XMLHttpRequest();
      oReq.svgKey = key;
      oReq.addEventListener('load', svgLoaded);
      mediaRegistry[key].type = 'svg';
      mediaRegistry[key].url = url;
      mediaRegistry[key].expandedurl = expandHrefWithLinkRules(url);
      oReq.open('GET', mediaRegistry[key].expandedurl);
      oReq.send();
    }
    else {
      mediaRegistry[key].type = 'url';
      mediaRegistry[key].url = url;
      mediaRegistry[key].expandedurl = expandHrefWithLinkRules(url);
    }
  }

  window.smartdown.baseURL = _baseURL || (window.location.origin + '/');

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
  window.xypicURL = window.smartdown.baseURL + 'lib/xypic.js';
  // console.log('__webpack_public_path__', __webpack_public_path__, window.smartdown.baseURL, window.location.origin, window.xypicURL);
  window.MathJax = global.MathJax = {
    delayStartupUntil: 'configured',
    AuthorInit: function() {
      const MathJax = window.MathJax;
      MathJax.Ajax.fileRev = function (file) {
        var ver = MathJax.cdnFileVersions[file] || MathJax.cdnVersion || '';
        if (ver) ver = '?ver='+ver;
        if (file.indexOf('xypic.js') !== -1) {
          ver = '';
        }
        return ver;
      }
    }
  };

  function completeStartup() {
    enhanceMarkedAndOpts();
    window.setTimeout(loadedHandler, 0);
  }

  const testing = process.env.BUILD === 'test';
  if (useMathJax) {
    const mathjaxURL = testing ?
      // 'https://localhost:8080/MathJax.js?config=TeX-MML-AM_HTMLorMML-full&delayStartupUntil=configured' :
      'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-MML-AM_HTMLorMML-full&delayStartupUntil=configured' :
      'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-MML-AM_HTMLorMML-full&delayStartupUntil=configured';

    importScriptUrl(
      mathjaxURL,
      //xyjax doesn't work here
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


/**
 * Initialize the smartdown runtime.
 *
 * @constructor
 * @param {object} media - media
 * @param {string} baseURL - baseURL
 * @param {function} loadedHandler - loadedHandler
 * @param {function} cardLoader - cardLoader
 * @param {object} calcHandlers - calcHandlers
 * @param {object} linkRules - linkRules
 *
 */


function initialize(media, baseURL, loadedHandler, cardLoader, calcHandlers, linkRules) {
  const options = {
    media: media,
    baseURL: baseURL,
    cardLoader: cardLoader,
    calcHandlers: calcHandlers,
    linkRules: linkRules
  };

  configure(options, loadedHandler);
}

var patchesUnresolvedKludgeLimit = 0;

function renderCell(cellID, variableId, newValue) {
  const cellInfo = smartdownCells[cellID];

  var element = document.getElementById(cellID);
  // console.log('renderCell', cellInfo, newValue, element, element.type, element.tagName, cellInfo.cellType, cellInfo.datatype, s);
  var s = JSON.stringify(newValue, null, 2);
  if (s) {
    s = s.slice(0, 20);
  }
  if (!element) {
    console.log('...renderCell cellID not found', cellID, variableId, newValue);
  }
  else if (element.type === 'checkbox') {
    element.checked = !!newValue;
  }
  else if (cellInfo.cellType === 'inputrange') {
    element.value = newValue;
  }
  else if (cellInfo.datatype === 'code') {
    if (newValue === undefined) {
      element.innerHTML = '';
    }
    else {
      element.innerHTML = '<pre class="infocell-output-pre">' + entityEscape(newValue) + '</pre>';
    }
  }
  else if (cellInfo.datatype === 'json') {
    if (newValue === undefined) {
      element.innerHTML = '';
    }
    else {
      const stringified = JSON.stringify(newValue, null, 2);
      const escaped = entityEscape(stringified, true);
      // console.log('stringified', stringified);
      element.innerHTML = '<pre class="infocell-output-pre">' + escaped + '</pre>';
    }
  }
  else if (cellInfo.datatype === 'url') {
    // console.log('cellInfo', cellInfo);
    element.innerHTML = `<a target="_blank" rel="noreferrer noopener" href="${newValue}" style="word-break:break-all;font-size:0.9em;line-height:1.15em;">${newValue}</a>`;
  }
  else if (cellInfo.datatype === 'markdown') {
    if (typeof newValue === 'string') {
      smartdown.setSmartdown(newValue, element);
    }
    else {
      element.innerHTML = '';
    }
  }
  else if (cellInfo.datatype === 'openjscad') {
    const divId = cellInfo.cellID;
    if (typeof newValue !== 'string') {
      element.innerHTML = '';
    }
    else {
      ensureExtension('openjscad', function() {
        element.innerHTML =
`
  <div
    class="openjscad-container">
    <div
      id="${divId}-viewerContext"
      class="viewerContext"
      oncontextmenu="return false;"
    >
      <div id="${divId}-viewerDiv">
      </div>
    </div>
    <canvas
      id="${divId}-viewerCanvas"
      class="viewerCanvas"
    ></canvas>
    <div
      class="viewer-footer">
      <button
        onclick="window.resetCamera${divId}()">
        Reset Camera
      </button>
      <button
        onclick="window.exportSTL${divId}()">
        Export STL
      </button>

      <table
        id="${divId}-parametersTable"
        class="openjscad-parametersTable">
      </table>
    </div>
  </div>
`;

        const viewerContextId = `${divId}-viewerContext`;
        const viewerCanvasId = `${divId}-viewerCanvas`;
        const viewerDivId = `${divId}-viewerDiv`;
        const parametersTableId = `${divId}-parametersTable`;

        const viewerContext = document.getElementById(viewerContextId);
        const viewerCanvas = document.getElementById(viewerCanvasId);
        const viewerDiv = document.getElementById(viewerDivId);
        const parametersTable = document.getElementById(parametersTableId);

        // console.log('viewerContext', viewerContextId, viewerContext);
        // console.log('viewerCanvas', viewerCanvasId, viewerCanvas);
        // console.log('viewerDiv', viewerDivId, viewerDiv);
        // console.log('parametersTable', parametersTableId, parametersTable);

        const camera = {
          position: { x: 0, y: 0, z: 90 },
          clip: { min: 1, max: 1000 },
        };

        const axis = {
          draw: true,
        };

        const panel = {
          size: 223
        };

        function onUpdate(data) {
          if (data.outputFile) {
            smartdown.fileSaver.saveAs(data.outputFile.data, data.outputFile.downloadAttribute);
          }
          else {
            // console.log('onUpdate', data);
          }
        }

        const jscadViewer = openjscad(viewerContext, {
          processor: {
            viewerContext: viewerContext,
            viewerCanvas: viewerCanvas,
            viewerdiv: viewerDiv,
            parameterstable: parametersTable,
            setStatus: (status, data) => {
            },
            instantUpdate: true,
            onUpdate: onUpdate,
            useAsync: true
          },
          viewer: {
            axis: axis,
            camera: camera,
            panel: panel,
            glOptions: {
              canvas: viewerCanvas
            }
          }
        });

        window[`resetCamera${divId}`] = function() {
          jscadViewer.resetCamera();
        };

        window[`exportSTL${divId}`] = function() {
          jscadViewer.generateOutputFile({
            name: 'stla',
            extension: 'stl',
          });
        };

        const diagramSource = newValue;
        jscadViewer.setJsCad(diagramSource);
      });
    }
  }
  else if (cellInfo.datatype.indexOf('abc') === 0) {
    const abcBaseId = element.id;
    element.innerHTML =
`
  <div class="abc-wrapper">
    <div
      id="${abcBaseId}-sheet"
      class="smartdown-abcsheet">
    </div>
    <div
      id="${abcBaseId}-midi"
      class="smartdown-abcmidi">
    </div>
  </div>
`;

    if (typeof newValue === 'string' && newValue.length > 0) {
      ensureExtension(
        'abc',
        function () {
          renderABCIntoDivs(abcBaseId, cellInfo.datatype, newValue);
        });
    }
  }
  else if (cellInfo.datatype === 'graphviz') {
    element.innerHTML = '<i>...rendering graphviz...</i>';
    if (typeof newValue === 'string' && newValue.length > 0) {
      window.smartdownJSModules.graphviz.loader(function () {
        var options = {
          images: graphvizImages
        };
        (new window.Viz()).renderString(newValue, options).then(result => {
          element.innerHTML = result;
        });
      });
    }
  }
  else if (cellInfo.datatype === 'svg') {
    element.innerHTML = newValue;
  }
  else if (cellInfo.datatype === 'mermaid') {
    if (newValue === undefined) {
      element.innerHTML = '';
    }
    else {
      Mermaid.mermaidRender(element, newValue);
    }
  }
  else if (Array.isArray(newValue)) {
    // console.log('array', newValue, newValue.elementType);
    const isImage = newValue.elementType === 'image';
    const isURLTitle = newValue.elementType === 'title/url';
    var elementList = '<ul class="infocell-output-list">';
    for (var elementIndex = 0; elementIndex < newValue.length; ++elementIndex) {
      var newElement = newValue[elementIndex];
      if (isImage) {
        elementList += '<li><img src="' + newElement + '"></li>';
      }
      else if (isURLTitle) {
        elementList += '<li><a target="_blank" rel="noreferrer noopener" href="' + newElement.url + '">' + newElement.title + '</a></li>';
      }
      else if (typeof newElement === 'string') {
        elementList += '<li>' + newElement + '</li>';
      }
      else {
        elementList += '<li>' + '<pre class="infocell-output-pre">' + JSON.stringify(newElement, null, 2) + '</pre>' + '</li>';
      }
    }
    elementList += '</ul>';
    element.innerHTML = elementList;
  }
  else if (typeof newValue === 'object') {
    element.innerHTML = '<pre class="infocell-output-pre">' + JSON.stringify(newValue, null, 2) + '</pre>';
    // element.value = newValue;
  }
  else if (typeof newValue === 'string' && newValue.indexOf('https://upload.wikimedia.org') === 0) {
    element.innerHTML = '<img src="' + newValue + '">';
  }
  else if (newValue === undefined) {
    element.innerHTML = '';
  }
  else {
    if (element.tagName === 'TEXTAREA') {
      element.value = newValue; // newValue.replace('\n', '<br>');
    }
    else if (typeof newValue === 'string') {
      element.innerHTML = entityEscape(newValue); // .replace(/\n/g, '<br>');
    }
    else {
      element.innerHTML = newValue; //  = newValue.replace(/\n/g, '<br>');
      element.value = newValue; //  = newValue.replace(/\n/g, '<br>');
    }
  }
}


function propagateModel() {
  ensureCells();
  ensureVariables();
  each(smartdownVariables, function (v, k) {
    propagateChangedVariable(k, v);
  });
}


async function updateProcesses(id, newValue) {
  smartdown.computeExpressions();

  if (id) {
    // each(smartdownCells, function(newCell, cellID) {
    //   console.log('........newCellCheck', id, newCell, newCell.cellBinding, cellID);
    // });
    each(smartdownCells, function(newCell, cellID) {
      // console.log('........newCell', id, newCell, newCell.cellBinding, cellID);

      if (id === newCell.cellBinding) {
        renderCell(cellID, newCell.cellBinding, newValue);
      }
    });
  }
  else {
    each(smartdownCells, function(newCell, cellID) {
      const oldValue = smartdownVariables[newCell.cellBinding];
      renderCell(cellID, newCell.cellBinding, oldValue);
    });
  }

  each(perPageState.playablesRegisteredOrder, async function (playable) {
    if (playable) {
      let progress = document.getElementById(playable.progressId);

      if (playable.playing) {
        const {depend, dependOn} = playable.embedThis;
        // console.log('.........playable', playable, dependOn, depend);
        if (Array.isArray(dependOn)) {
          if (depend) {
            let signal = false;

            if (dependOn) {
              let atLeastOneUndefined = false;
              dependOn.forEach(varname => {
                const oldValue = playable.dependLastValues[varname];
                const newValue = smartdownVariables[varname];
                playable.dependLastValues[varname] = newValue;
                if (newValue === undefined) {
                  atLeastOneUndefined = true;
                }

                // console.log('............varname', varname, oldValue, newValue);

                if (!areValuesSameEnough(varname, oldValue, newValue)) {
                  signal = true;
                }
              });
              if (atLeastOneUndefined) {
                signal = false;
              }
            }
            else {
              signal = true;
            }

            if (signal) {
              if (progress) {
                progress.style.display = 'none';
              }
              depend.apply(playable.embedThis);
            }
          }
        }
        else if (dependOn) {
          for (const varname in dependOn) {
            const oldValue = playable.dependLastValues[varname];
            const newValue = smartdownVariables[varname];
            playable.dependLastValues[varname] = newValue;

            if (!areValuesSameEnough(varname, oldValue, newValue)) {
              if (progress) {
                progress.style.display = 'none';
              }
              dependOn[varname].apply(playable.embedThis);
            }
          }
        }
      }
      else {
        if (progress) {
          progress.style.display = 'none';
        }
      }
    }
  });
}


function changeVariable(id, newValue) {
  smartdownVariables[id] = newValue;
  // console.log('changeVariable', id, newValue, useLocalForage, smartdown.persistence);
  if (useLocalForage && smartdown.persistence) {
    const key = localForageSmartdownPrefix + id;
    const value = newValue;
    localForage.setItem(key, value).then(function () {
    }).catch(function (err) {
      console.log('localForage STORE ERROR', key, value, err);
    });
  }
}

function propagateChangedVariable(id, newValue, force) {
  const oldValue = smartdownVariables[id];

  if (force || !areValuesSameEnough(id, oldValue, newValue)) {
    changeVariable(id, newValue);
    updateProcesses(id, newValue);
  }
}


function ensureCells() {
  each(smartdownCells, function(newCell, cellID) {
    var element = document.getElementById(cellID);
    if (!element) {
      // console.log('...ensureCells element for cellID not found', cellID, smartdownCells[cellID]);
      delete smartdownCells[cellID];
    }
  });
}


function ensureVariables() {
  each(smartdownCells, function(newCell, cellID) {
    let oldValue = smartdownVariables[newCell.cellBinding];
    changeVariable(newCell.cellBinding, oldValue);
  });
}

function resetVariables() {
  smartdownVariables = {};
  changeVariable(null, null);
  ensureVariables();
}

var scrollHoverDisableEnabled = false;
var lastY;

function setupScrollHoverDisable() {
  lastY = 0;
  if (!scrollHoverDisableEnabled) {
    var timer;
    scrollHoverDisableEnabled = true;
    // https://www.thecssninja.com/css/pointer-events-60fps
    var body = document.getElementsByTagName('body')[0];
    window.addEventListener('scroll', function(e) {
      var currentY = window.scrollY;
      var delta = Math.abs(lastY - currentY);

      if (delta > 25) {
        body.classList.add('disable-hover');

        clearTimeout(timer);
        timer = setTimeout(function() {
          body.classList.remove('disable-hover');
        }, 700);
      }
      lastY = currentY;
    }, false);  }
}


function getFrontmatter(md) {
  md = md.trim() + '\n';
  let resultFMText = null;
  let resultFM = null;
  let resultMD = md;
  const fmPrefix = '---\n';
  const fmSuffix = '\n---\n';
  if (md.indexOf(fmPrefix) === 0) {
    var frontMatterBegin = md.slice(fmPrefix.length - 1);
    var frontMatterEndIndex = frontMatterBegin.indexOf(fmSuffix);
    if (frontMatterEndIndex >= 0) {
      let frontMatterText = frontMatterBegin.slice(0, frontMatterEndIndex);
      resultFMText = frontMatterText; // frontMatterBegin.slice(frontMatterEndIndex + fmSuffix.length);
      resultFM = frontMatterText === '' ? {} : jsyaml.safeLoad(resultFMText);
      resultMD = frontMatterBegin.slice(frontMatterEndIndex + fmSuffix.length);
    }
  }

  return {
    frontmatterText: resultFMText,
    frontmatter: resultFM,
    markdown: resultMD
  };
}


function setSmartdown(md, outputDiv, setSmartdownCompleted) {
  if (currentRenderDiv) {
    console.log('setSmartdown REENTRANCY FAIL', currentRenderDiv.id, md.slice(0, 40));
  }
  else {
    currentRenderDiv = outputDiv;
  }
  currentBackpatches[outputDiv.id] = [];

  setupScrollHoverDisable();
  cleanupOrphanedStuff();
  resetAllPlayables(outputDiv, true);

  const fm = getFrontmatter(md);
  md = fm.markdown;
  outputDiv.frontmatter = fm.frontmatter;
  // window.getSelection().removeAllRanges();

  function completeTypeset() {
    var that = this;
    var resizeTimeout;

    function actualResizeHandler() {
      for (var k in perPageState.playablesRegistered) {
        var playable = perPageState.playablesRegistered[k];
        if (playable.playing) {
          var d = document.getElementById(playable.divId);
          if (d) {
            if (playable.language === 'plotly') {
              try {
                // Plotly.Plots.resize(d);
                var newLayout = {
                  autosize: true
                };
                if (smartdownVariables.PLOT_TITLE) {
                  newLayout.title = smartdownVariables.PLOT_TITLE;
                }
                Plotly.relayout(d, newLayout)
              }
              catch (e) {
                // console.log('plotly resize exception:', e);
                // throw e;
              }
            }
            else if (playable.embedThis && playable.embedThis.sizeChanged) {
              playable.embedThis.sizeChanged();
            }
          }
        }
      }
    }

    function resizeThrottler() {
      // ignore resize events as long as an actualResizeHandler execution is in the queue
      if (!resizeTimeout) {
        resizeTimeout = setTimeout(function() {
          resizeTimeout = null;
          actualResizeHandler();
         }, 500);
      }
    }

    function applyLocalStorage(done) {
      const doneHandler = done || function done() {};

      // console.log('applyLocalStorage', useLocalForage, smartdown.persistence, fm.markdown);
      if (useLocalForage && smartdown.persistence) {
        localForage.iterate(function(value, key, iterationNumber) {
          // Resulting key/value pair -- this callback
          // will be executed for every item in the
          // database.
          if (key.indexOf(localForageSmartdownPrefix) === 0) {
            const varName = key.slice(localForageSmartdownPrefix.length);
            if (value) {
              smartdownVariables[varName] = value;
            }
          }
        }).then(function() {
          // updateProcesses();

          doneHandler();
        }).catch(function(err) {
          // This code runs if there were any errors
          console.log(err);
          doneHandler();
        });
      }
      else {
        // updateProcesses();
        doneHandler();
      }
    }

    function finishLoad(done) {
      ensureCells();
      ensureVariables();
      // resetAllPlayables(outputDiv, false);

      if (window.twttr && window.twttr.widgets) {
        window.twttr.widgets.load(outputDiv);
      }

      if (useGifffer) {
        Gifffer({
          playButtonStyles: {
            'width': '60px',
            'height': '60px',
            'border-radius': '30px',
            'background': 'rgba(200, 200, 200, 0.5)',
            'position': 'absolute',
            'top': '50%',
            'left': '50%',
            'margin': '-30px 0 0 -30px'
          },
          playButtonIconStyles: {
            'width': '0',
            'height': '0',
            'border-top': '14px solid transparent',
            'border-bottom': '14px solid transparent',
            'border-left': '14px solid rgba(0, 0, 0, 0.5)',
            'position': 'absolute',
            'left': '26px',
            'top': '16px'
          }
        });

        //
        // To deal with integrations like Impress.js, we need to ensure
        // event.stopPropagation() so that Impress.js doesn't pick up a
        // DOM element that doesn't exist, because of the way that Gifffer
        // works. Not necessarily a completely accurate explanation, but
        // we'll see if it works.
        //

        const gifs = document.querySelectorAll('.gifffer-container button');

        gifs.forEach((g) => {
          g.addEventListener('click', function (event) {
            event.stopPropagation()
          });
        });
      }


      transformPlayables(outputDiv, function() {
        if (cardLoading) {
          cardLoading = false;
          propagateModel();
          updateProcesses();
        }

        if (done) {
          done();
        }
      });
    }

    // window.onresize = resizeThrottler;
    window.addEventListener('resize', resizeThrottler);

    const firstTweetIndex = md.search(/\!\[[^\]]*\]\(https\:\/\/twitter\.com\//);

    if (firstTweetIndex >= 0) {
      if (!twitterLoading) {
        twitterLoading = true;
        importScriptUrl(
          'https://platform.twitter.com/widgets.js',
          function () {
            console.log('Twitter loaded... window.twttr', window.twttr);
            finishLoad(function() {
              applyLocalStorage(setSmartdownCompleted);
            });
          //   window.setTimeout(function () {
          //     console.log('window.twttr.widgets.load');
          //     window.twttr.widgets.load();
          //   }, 5000);   // I hate myself
          });
      }
      else {
        finishLoad(function() {
          applyLocalStorage(setSmartdownCompleted);
        });
      }
    }
    else {
      finishLoad(function() {
        applyLocalStorage(setSmartdownCompleted);
      });
    }
  }

  const tokens = markedModule.lexer(md, markedOpts);
  let precedingParagraph = null;
  let precedingInlinedCodeblock = null; // This is a code block with /inline
  tokens.forEach((t) => {
    if (t.type === 'paragraph') {
      if (precedingInlinedCodeblock) {
        t.text = inlinePrefix + t.text;
      }
      precedingParagraph = t;
      precedingInlinedCodeblock = null;
    }
    else if (t.type === 'code') {
      const inlineCode = t.lang && t.lang.indexOf('/inline') >= 0;
      if (precedingParagraph &&
          inlineCode &&
          precedingParagraph.text.indexOf(inlinePrefix) !== 0) {
        precedingParagraph.text = inlinePrefix + precedingParagraph.text;
      }
      if (inlineCode) {
        precedingInlinedCodeblock = t;
      }
      else {
        precedingInlinedCodeblock = null;
      }
      precedingParagraph = null;
    }
    else if (t.type === 'space' || t.type === 'script') {
      // These elements may appear between a paragraph and an inline code
      // block.
    }
    else {
      precedingParagraph = null;
      precedingInlinedCodeblock = null;
    }
  });

  let result = markedModule.parser(tokens, markedOpts);

  // let result = markedModule(md, markedOpts);

  // https://github.com/cure53/DOMPurify/tree/master/demos#advanced-config-demo-link
  var config = {
    FORCE_BODY: true,
    ADD_TAGS: ['script', 'iframe'],
    ADD_ATTR: ['onblur', 'oninput', 'onchange', 'onclick', 'onmousedown', 'onmouseup', 'onmouseenter', 'onmouseleave', 'onkeydown', 'onkeyup', 'target', 'allow'],
  };

  var sanitized = createDOMPurify.sanitize(result, config);
  if (result !== sanitized) {
    // console.log('result !== sanitized', result.length, sanitized.length);
    // console.log('-------------------');
    // console.log(md);
    // console.log('-------------------');
    // console.log(result);
    // console.log('-------------------');
    // console.log('sanitized');
    // console.log('-------------------');
    // console.log(sanitized);
    result = sanitized;
  }

  currentRenderDiv = null;

  function applyBackpatches(done) {
    const bp = currentBackpatches[outputDiv.id];
    var patchesUnresolved = 0;
    bp.forEach(patch => {
      if (patch.key) {
        if (patch.replace) {
          // console.log('###Resolved patch', patch.key);
          result = result.replace(patch.key, patch.replace);
          patch.key = null;
        }
        else {
          // console.log('###Unresolved patch', patch.key);
          ++patchesUnresolved;
        }
      }
      else {
        console.log('applyBackpatches anomaly no key', outputDiv.id, patch);
      }
    });

    if (patchesUnresolved > 0) {
      if (--patchesUnresolvedKludgeLimit <= 0) {
        console.log('Aborting applyBackpatches recursion...', bp);
      }
      else {
        // console.log('patchesUnresolved', patchesUnresolved, patchesUnresolvedKludgeLimit);
        window.setTimeout(function() {
          applyBackpatches(function() {
            done();
          });
        }, 1000);
      }
    }
    else {
      done();
    }
  }

  patchesUnresolvedKludgeLimit = 5;
  // console.log('applyBackpatches BEGIN', outputDiv.id, currentRenderDiv);


  applyBackpatches(function() {
    if (useMathJax) {
      //
      // If you are changing this code, be sure that you
      // ensure that the mathjax menu still works. In the past,
      // I've tried to adjust the code to reduce flashing and it
      // has broken the mathjax menu.
      //

      // var renderDivId = outputDiv.id + '-render';
      // var renderDiv = document.getElementById(renderDivId);

      // if (!renderDiv) {
      //   renderDiv = document.createElement('div');
      //   renderDiv.id = renderDivId;
      //   outputDiv.appendChild(renderDiv);
      // }

      // renderDiv.style.display = 'none';
      // renderDiv.innerHTML = result;

      // function finishIt() {
      //   outputDiv.innerHTML = renderDiv.innerHTML;
      //   renderDiv.style.display = 'none';
      //   renderDiv.innerHTML = '';
      //   completeTypeset();
      // }

      // // MathJax.Hub.Typeset(renderDiv, finishIt);
      // MathJax.Hub.Queue(['Typeset', MathJax.Hub, renderDiv, finishIt]);

      function finishIt() {
        completeTypeset();
      }
      outputDiv.innerHTML = result;
      MathJax.Hub.Typeset(outputDiv, finishIt);
      // MathJax.Hub.Queue(['Typeset', MathJax.Hub, outputDiv, finishIt]);
    }
    else {
      outputDiv.innerHTML = result;
      completeTypeset();
    }
  });
}


//
// md may contain frontmatter.
//

function setHome(md, outputDiv, done) {
  // console.log('setHome', md.slice(0, 20), outputDiv);
  currentMD = md;
  currentHomeDiv = outputDiv;
  window.getSelection().removeAllRanges();
  resetAllPlayables(outputDiv, true);
  resetPerPageState();
  setSmartdown(md, outputDiv, function() {
    updateProcesses();
    done();
  });
}

/*
function forceVariable(id, newValue, type) {
  if (type === 'number') {
    newValue = Number(newValue);
  }
  try {
    ensureCells();
  }
  catch (e) {
    console.log('exception during ensureCells', id, e);
  }

  try {
    propagateChangedVariable(id, newValue, true);
  }
  catch (e) {
    console.log('exception during propagateChangedVariable', id, e);
  }
}
*/


function setVariable(id, newValue, type) {
  // console.log('setVariable', id, JSON.stringify(newValue).slice(0, 20), type);
  if (type === 'number') {
    newValue = Number(newValue);
  }
  try {
    ensureCells();
  }
  catch (e) {
    console.log('exception during ensureCells', id, e);
  }

  try {
    propagateChangedVariable(id, newValue);
  }
  catch (e) {
    console.log('exception during propagateChangedVariable', id, e);
  }
}

function set(varnameOrAssignments, varValue, varType) {
  if (arguments.length > 1) {
    setVariable(varnameOrAssignments, varValue, varType);
  }
  else {
    setVariables(varnameOrAssignments);
  }
}


function setVariables(assignments) {
  if (Array.isArray(assignments)) {
    each(assignments, assignment => {
      var newValue = assignment.rhs;
      if (assignment.type === 'number') {
        newValue = Number(newValue);
      }
      changeVariable(assignment.lhs, newValue);
    });
  }
  else {
    for (let varname in assignments) {
      changeVariable(varname, assignments[varname]);
    }
  }
  ensureCells();
  updateProcesses();
}


function computeStoredExpression(exprId) {
  // console.log('computeStoredExpression', exprId);
  var entry = perPageState.expressionsRegistered[exprId];
  if (!entry) {
    console.log('computeStoredExpression no such expression', exprId, perPageState.expressionsRegistered);
    // debugger;
  }
  else if (entry.manual) {
    // console.log('computeStoredExpression', exprId, entry);

    computeExpression(entry, function() {
      updateProcesses();
    });


    // window.setTimeout(function() {
    //   computeExpression(entry, function() {
    //     window.setTimeout(function() {
    //       // console.log('timeout updateProcesses');
    //       updateProcesses();
    //     }, 1000);
    //   });
    // }, 1000);

    // ensureCells();
    // ensureVariables();
    // propagateModel();
  }
}


function computeExpression(entry, done) {
  var {lhss: lhss, rhss: rhss, types, labelId} = entry;
  // console.log('computeExpression', lhss, rhss, types, labelId, entry);
  // console.log(done);

  if (lhss.length !== rhss.length || types.length !== lhss.length) {
    console('lhss.length !== rhss.length || types.length !== lhss.length', lhss.length, rhss.length, types.length);
  }
  else {
    let numPending = 0;

    for (let i = 0; i < lhss.length; ++i) {
      let lhs = lhss[i];
      let rhs = rhss[i];
      let type = types[i];

      rhs = expandStringWithSubstitutions(rhs);
      if (lhs === 'TEMPLATECELLID') {
        // PASS
      }
      else if (!rhs) {
        //  smartdownVariables[lhs] = smartdownVariables[lhs] || '';
      }
      else if (rhs[0] === '/') {
        rhs = rhs.slice(1);
        if (calcHandlers) {
          var calcParts = rhs.split(/[\./[]/);
          var bracketIndex = rhs.indexOf('[');
          var slashIndex = rhs.indexOf('/');

          var calcKey = calcParts[0];
          var calcBody = rhs.slice(calcKey.length);
          var calcHandler = calcHandlers[calcKey];
          if (calcHandler) {
            ++numPending;
            calcHandler(calcKey, calcBody, function(result) {
              propagateChangedVariable(lhs, result);
              // changeVariable(lhs, result);
              if (--numPending === 0) {
                if (done) {
                  done();
                }
              }
              // console.log('...calcHandler', lhs, oldValue, newValue, entry);
            });
          }
        }
      }
      else {
        var vars = '';
        each(smartdownVariables, function (v, k) {
          vars += ',' + k;
        });
        vars = vars.slice(1);
        var vals = lodashMap(smartdownVariables, function (v, k) {
          return v;
        });

        /* eslint no-new-func: 0 */
        var f = new Function(vars, 'return ' + rhs + ';');
        var newValue = f.apply({}, vals);
        // console.log('#rhs', f, vars, rhs, vals, type);
        if (type === 'number') {
          newValue = Number(newValue);
        }
        propagateChangedVariable(lhs, newValue);
        // const oldValue = smartdownVariables[lhs];
        // smartdownVariables[lhs] = newValue;
        // console.log('...', lhs, oldValue, newValue, entry);
      }
    }

    if (numPending > 0) {
      // console.log('computeExpression PENDING', entry, numPending);
    }
    else if (done) {
      done();
    }
  }
}


function goToCard(cardKey, event, outputDivId) {
  event.preventDefault();
  event.stopPropagation();
  cardLoading = true;
  if (cardLoader) {
    cardLoader(cardKey, outputDivId);
  }
  else {
    var that = this;
    var modelAsMarkdown = null;

    if (!cardKey || cardKey === 'Home') {
      modelAsMarkdown = currentMD;
    }
    else {
      var scriptx = smartdownScriptsMap[cardKey];
      if (scriptx) {
        modelAsMarkdown = scriptx.text;
      }
    }

    if (modelAsMarkdown) {
      setSmartdown(modelAsMarkdown, currentHomeDiv, null);
    }
  }
}

function setPersistence(persistence) {
  smartdown.persistence = persistence;
}

function loadCardsFromDocumentScripts() {
  smartdownScripts.length = 0;
  for (var k in smartdownScriptsMap) {
    delete smartdownScriptsMap[k];
  }
  var scripts = document.scripts;
  for (var s in scripts) {
    var script = scripts[s];
    if (script && script.type && script.type === 'text/x-smartdown') {
      smartdownScripts.push(script);
      smartdownScriptsMap[script.id] = script;
    }
  }
}

function getMedia(mediaKey) {
  return mediaRegistry[mediaKey];
}

var youtubeIframeAPILoaded = false;
var youtubeIframeAPILoadedCbs = [];

function onYouTubeIframeAPIReady() {
  // console.log('onYouTubeIframeAPIReady');
  youtubeIframeAPILoaded = true;

  youtubeIframeAPILoadedCbs.forEach(cb => {
    cb();
  });

  youtubeIframeAPILoadedCbs = [];
}
window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

function loadYouTubeIframeAPI(done) {
  youtubeIframeAPILoadedCbs.push(done);
  importScriptUrl('https://www.youtube.com/iframe_api', function() {
    // console.log('https://www.youtube.com/iframe_api loaded');
  });
}


function setupYouTubePlayer(div, varName) {
  // console.log('setupYouTubePlayer', div, varName, youtubeIframeAPILoaded);
  if (youtubeIframeAPILoaded) {
    var playerDiv = document.getElementById(div);

    var player;

    // console.log('YT', Object.keys(YT), YT.Player);
    player = new YT.Player(playerDiv, {
        events: {
          'onReady': function (event) {
              // console.log('onPlayerReady', event);
              // console.log(player);
              smartdown.setVariable(varName, player, 'json');
          },
          'onStateChange': function (event) {
            // console.log('onPlayerStateChange', event);
          }
        }
    });
  }
  else {
    loadYouTubeIframeAPI(function() {
      setupYouTubePlayer(div, varName);
    });
  }
}


module.exports = {
  tweek: null,
  initialize: initialize,
  configure: configure,
  perPageState: perPageState,
  expressionsRegistered: perPageState.expressionsRegistered,
  playablesRegistered: perPageState.playablesRegistered,
  playablesRegisteredOrder: perPageState.playablesRegisteredOrder,
  smartdownVariables: smartdownVariables,
  enhanceMarkedAndOpts: enhanceMarkedAndOpts,
  partitionMultipart: partitionMultipart,
  registerPlayable: registerPlayable,
  playPlayable: playPlayable,
  resetPlayable: resetPlayable,
  toggleDebug: toggleDebug,
  toggleConsole: toggleConsole,
  consoleWrite: consoleWrite,
  showDisclosure: showDisclosure,
  hideDisclosure: hideDisclosure,
  isFullscreen: isFullscreen,
  openFullscreen: openFullscreen,
  closeFullscreen: closeFullscreen,
  toggleKiosk: toggleKiosk,
  toggleDisclosure: toggleDisclosure,
  activateOnMouseLeave: activateOnMouseLeave,
  deactivateOnMouseLeave: deactivateOnMouseLeave,
  linkWrapperExit: linkWrapperExit,
  startAutoplay: startAutoplay,
  setSmartdown: setSmartdown,
  setHome: setHome,
  resetVariables: resetVariables,
  loadCardsFromDocumentScripts: loadCardsFromDocumentScripts,
  registerExpression: registerExpression,
  computeExpressions: computeExpressions,
  computeStoredExpression: computeStoredExpression,
  setVariable: setVariable,
  // forceVariable: forceVariable,
  set: set,
  setVariables: setVariables,
  setPersistence: setPersistence,
  computeExpression: computeExpression,
  goToCard: goToCard,
  smartdownScripts: smartdownScripts,
  smartdownScriptsMap: smartdownScriptsMap,
  currentHomeDiv: currentHomeDiv,
  cardLoader: cardLoader,
  calcHandlers: calcHandlers,
  importCssCode: importCssCode,
  importCssUrl: importCssUrl,
  importScriptUrl: importScriptUrl,
  importModuleUrl: importModuleUrl,
  importTextUrl: importTextUrl,
  linkRules: linkRules,
  expandHrefWithLinkRules: expandHrefWithLinkRules,
  setLinkRules: setLinkRules,
  getMedia: getMedia,
  resetPerPageState: resetPerPageState,
  decodeInlineScript: decodeInlineScript,
  hljs: hljs,
  marked: markedModule,
  markedOpts: markedOpts,
  Stdlib: null,
  P5Loader: P5.Loader,
  d3: null,
  d3v5: null,
  d3fc: null,
  d3cloud: null,
  topojson: null,
  Three: null,
  lodashEach: window.lodashEach,
  lodashMap: window.lodashMap,
  lodashIsEqual: window.lodashIsEqual,
  jsyaml: window.jsyaml,
  axios: axios,
  getFrontmatter: getFrontmatter,
  updateProcesses: updateProcesses,
  cleanupOrphanedStuff: cleanupOrphanedStuff,
  version: '1.0.40',
  baseURL: null, // Filled in by initialize/configure
  setupYouTubePlayer: setupYouTubePlayer,
  entityEscape: entityEscape,
  mathjaxConfigure: mathjaxConfigure,
  persistence: false,
  openJSCAD: {},
  fileSaver: fileSaver,
  vdomToHtml: vdomToHtml,
  runFunction: runFunction,
  runModule: runModule,
  // isExtensionRegistered: isExtensionRegistered,
  loadExternal: loadExternal,
  // registerExtension: registerExtension,
  ensureExtension: ensureExtension,
  es6Playables: es6Playables,
};

window.smartdown = module.exports;

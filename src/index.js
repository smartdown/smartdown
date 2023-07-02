// 'use strict';

//
// Smartdown
// Copyright 2015, Daniel B Keith
//

/* global useFileSaver */
/* global useLocalForage */
/* global useGifffer */
/* global useMathJax */

import createDOMPurify from 'dompurify';

import emoji from 'emoji-js/lib/emoji.min';

const emojiInstance = new emoji();
const emojiReplacer = (match) => emojiInstance.replace_colons(match);
import axios from 'axios';
import smoothscroll from 'smoothscroll-polyfill';

require('./styles.css');

const lodashEach = window.lodashEach = require('lodash/forEach');
const lodashMap = window.lodashMap = require('lodash/map');
const isEqual = window.lodashIsEqual = require('lodash/isEqual');

import {isExtensionRegistered, loadExternal, ensureExtension} from './extensions';

import registerABC from './extensions/ABC';
import registerD3 from './extensions/D3';
import registerThree from './extensions/Three';
import registerPlotly from './extensions/Plotly';
import OpenJSCAD from './extensions/OpenJSCAD';
import registerLeaflet from './extensions/Leaflet';
import Brython from './extensions/Brython';
import FilamentExtension from './extensions/Filament';
import React from './extensions/React';
import Typescript from './extensions/Typescript';
import Mermaid from './extensions/Mermaid';
import Stdlib from './extensions/Stdlib';

import {
  importScriptUrl,
  importModuleUrl,
  importTextUrl,
  importCssCode,
  importCssUrl,
} from './importers';

const vdomToHtml = require('vdom-to-html');
const StackTrace = require('stacktrace-js/dist/stacktrace.min');

const marked = require('marked');
const hljs = require('./hljs');

window.jsyaml = require('js-yaml');
const mathjaxConfigure = require('./extensions/MathJax');






const graphvizImages = require('./extensions/Graphviz');

const P5 = require('./extensions/P5');

const testing = process.env.BUILD === 'test';

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
let cardLoader = null;
let calcHandlers = null;
const linkRules = [];
let currentHomeDiv = null;
let currentMD = null;
const playableTypes = {
  'brython': {
    highlight: 'python',
    javascript: true
  },
  'filament': {
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
  'xP5',
  'xd3',
  'xfc',
  'xdc',
  'xtopojson',
  'xPlotly',
  'x',
  'xstdlib',
  'xTHREE',
  'xsmartdown',
  'p5'
];

const perPageState = {
  expressionsRegistered: {},
  playablesRegistered: {},
  playablesRegisteredOrder: [],
};
let currentRenderDiv = null;
const currentBackpatches = {};

let uniqueCellIndex = 0;
const smartdownCells = {};

let cardLoading = false;

let smartdownVariables = {};
const smartdownScripts = [];
const smartdownScriptsMap = {};
const es6Playables = {};

let mediaRegistry = {};
let uniquePlayableIndex = 0;

function entityEscape(html, encode) {
  return html
    .replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}


function registerDefaultExtensions() {
  registerABC();
  registerD3();
  registerThree();
  registerPlotly();
  registerLeaflet();
  OpenJSCAD.register();
  Brython.register();
  FilamentExtension.register();
  React.register();
  Typescript.register();
  Mermaid.register();
  Stdlib.register();
}

registerDefaultExtensions();


function expandHrefWithLinkRules(href) {
  let result = href;

  for (let i = 0; i < linkRules.length; ++i) {
    const rule = linkRules[i];
    if (href.indexOf(rule.prefix) === 0) {
      if ((typeof rule.replace) === 'string') {
        let newHRef = rule.replace + href.slice(rule.prefix.length);
        if (newHRef.indexOf(window.location.origin) === 0) {
          newHRef = newHRef.slice(window.location.origin.length);
        }
        result = newHRef;
        break;
      }
      else if ((typeof rule.replace) === 'function') {
        const replacer = rule.replace(href);
        result = replacer + href.slice(rule.prefix.length);
      }
    }
  }

  // console.log('expandHrefWithLinkRules', linkRules, href, result);
  // console.log(JSON.stringify(linkRules, null, 2));

  return result;
}


// Copied from https://github.com/jashkenas/underscore/blob/e944e0275abb3e1f366417ba8facb5754a7ad273/underscore.js#L1458

const unescapeMap = {
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
  const source = '(?:' + Object.keys(translationMap).join('|') + ')';
  const testRegexp = RegExp(source);
  const replaceRegexp = RegExp(source, 'g');
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

let uniqueYouTubeId = 0;

function convertYoutubeFragmentToEmbed(href, title, text) {
  // console.log('convertYoutubeFragmentToEmbed', href, title, text);
  let result = null;
  const textParts = text.split('|');
  text = textParts[0];

  const hrefNoProtocol = href.replace(/^https?:\/\//, '');

  const sizing = youtubeDimensions[text] || '';
  const classList = youtubeClasses[text] || '';
  let suffix;

  if (hrefNoProtocol.indexOf('youtu.be/') === 0) {
    suffix = hrefNoProtocol.slice('youtu.be/'.length);
  }
  else if (hrefNoProtocol.indexOf('www.youtube.com/watch?v=') === 0) {
    suffix = hrefNoProtocol.slice('www.youtube.com/watch?v='.length);
    suffix = suffix.replace(/&/, '?'); // onlu replace first one
  }

  if (suffix) {
    ++uniqueYouTubeId;
    let args = '?html5=1&ecver=2&modestbranding=1';
    const argsIndex = suffix.indexOf('?');
    if (argsIndex >= 0) {
      args += '&' + suffix.slice(argsIndex + 1);
      suffix = suffix.slice(0, argsIndex);
    }

    let enablejsapi = '';
    let apiButton = '';
    let apiPlayerKey = `player_${uniqueYouTubeId}`;
    if (textParts.length > 1) {
      const apiParts = textParts[1].split('=');
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
          src="https://www.youtube.com/embed/${suffix}${args}${enablejsapi}"
          frameborder="0"
          allow="camera;microphone;autoplay;encrypted-media;picture-in-picture"
          allowfullscreen>
        </iframe>
      </div>
      ${apiButton}
      `;
  }

  return result;
}

function convertVimeoFragmentToEmbed(href, title, text) {
  let result = null;
  const hrefNoProtocol = href.replace(/^https?:\/\//, '');
  const classList = (text === 'thumbnail') ? 'thumbnail' : 'fullwidth';

  if (hrefNoProtocol.indexOf('vimeo.com/') === 0) {
    let suffix = hrefNoProtocol.slice('vimeo.com/'.length);
    let args = '?title=0&byline=0&portrait=0&badge=0';

    const argsIndex = suffix.indexOf('?');
    if (argsIndex >= 0) {
      args += '&' + suffix.slice(argsIndex + 1);
      suffix = suffix.slice(0, argsIndex);
      console.log('args', args, suffix);
    }

    result =
`<div class="video-container vimeo ${classList}">
  <iframe
    src="https://player.vimeo.com/video/${suffix}${args}"
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
  }

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
    'filament',
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
    lines.forEach((line) => {
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
  const playable = languageOpts.indexOf('playable') >= 0;
  const autoplay = languageOpts.indexOf('autoplay') >= 0;
  const isModule = languageOpts.indexOf('module') >= 0;
  const debug = languageOpts.indexOf('debug') >= 0;
  const kiosk = languageOpts.indexOf('kiosk') >= 0;
  const kioskable = languageOpts.indexOf('kioskable') >= 0;
  const inline = languageOpts.indexOf('inline') >= 0;
  const center = languageOpts.indexOf('center') >= 0;
  let targetDivId = null;
  let result = false;

  const playableType = playableTypes[language];
  if (playableType && (playable || autoplay)) {
    ++uniquePlayableIndex;
    let divId = `div_playable_${uniquePlayableIndex}`;
    const preId = `pre_playable_${uniquePlayableIndex}`;
    const dbgId = `dbg_playable_${uniquePlayableIndex}`;
    const dbgToggleId = `${dbgId}-toggle`;
    const consoleId = `console_playable_${uniquePlayableIndex}`;
    const consoleToggleId = `${consoleId}-toggle`;
    const functionId = `function_playable_${uniquePlayableIndex}`;
    const kioskId = `kiosk_playable_${uniquePlayableIndex}`;
    const playId = `play_playable_${uniquePlayableIndex}`;
    const stopId = `stop_playable_${uniquePlayableIndex}`;
    const progressId = `progress_playable_${uniquePlayableIndex}`;

    languageOpts.forEach((o) => {
      if (o.indexOf('&') === 0) {
        targetDivId = 'inline-target-' + o.slice(1);
        divId = targetDivId;
      }
    });

    const registeredPlayable = smartdown.registerPlayable(
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

    const highlightLanguage = playableType ? playableType.highlight : 'javascript';
    const highlightedCode = hljs.highlightAuto(code, [highlightLanguage]).value;
    const highlightedAugmentedCode = hljs.highlightAuto(registeredPlayable.augmentedCode, ['javascript']).value;
    const debugIsHidden = debug ? '' : 'hidden';

    const kioskClass = kiosk ? 'smartdown-playable-kiosk' : '';
    const kioskToggle = !(kiosk || kioskable) ? '' :
      `
  <button type="button"
    href="#"
    id="${kioskId}"
    onclick="smartdown.toggleKiosk('${divId}', event)"
    class="kiosk-button">
    <span>&#9713;</span>
  </button>
`;
    let wrapperWrapperElement = 'div';
    let wrapperWrapperClass = 'playable-wrapper-wrapper';
    let progressClass = 'smartdown-progress';

    if (inline) {
      wrapperWrapperElement = 'span';
      wrapperWrapperClass = 'playable-wrapper-wrapper-inline';
      progressClass += ' smartdown-progress-inline';
    }
    else if (center) {
      wrapperWrapperClass = 'playable-wrapper-wrapper-center';
    }

    const playableAutoplayClass = autoplay ? 'playable-autoplay' : '';
    if (autoplay && !playable) {
      let playableDiv =
`
<div class="smartdown-playable smartdown-${language}" id="${divId}"></div>
</div>
`;
      if (targetDivId) {
        playableDiv = '';
      }

      const playableWrapper =
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

      result = playableWrapper;
    }
    else {
      const playableButtons =
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

      const playableCodeDisplay =
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

      result = playableCodeDisplay;
    }
  }

  return result;
}


function renderCode(code, languageString) {
  languageString = (languageString || '').replace(/ /g, '');
  const languageElements = languageString.split('/');
  const languageOpts = languageElements.slice(1);
  const playable = languageOpts.indexOf('playable') >= 0;
  const autoplay = languageOpts.indexOf('autoplay') >= 0;
  // // const debug = languageOpts.indexOf('debug') >= 0;
  let result;

  let language = languageElements[0];
  if (language === 'javascript') {
    languageOpts.forEach((o) => {
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

    result = deferredCode;
  }
  else {
    result = renderCodeInternal(currentRenderDiv.id, code, language, languageOpts, prelude);
  }

  return result;
}

/*
  I don't know when this was ever used.

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
*/


function isGIF(href) {
  return (href.endsWith('.gif') || href.indexOf('data:image/gif;base64') === 0);
}


function isGifferable(href, title, tokens) {
  const isGif = isGIF(href);

  let useGiffer = false;
  tokens.forEach((t) => {
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
  let out = '';
  const specialClass = null;
  const mediaLink = href.lastIndexOf('/media/', 0) >= 0;
  if (mediaLink) {
    const pathElements = href.split('/').reverse();
    // console.log('render', href, pathElements);
    const e1 = pathElements.pop();
    if (e1 !== '') {
      console.log('Unexpected /media syntax: ', href);
    }
    const e2 = pathElements.pop();
    if (e2 === 'media') {
      const imageName = pathElements.pop();
      const imageClass = pathElements.pop() || '';

      const fgClass = `media-image ${imageClass}`;
      const media = mediaRegistry[imageName];
      if (media) {
        const inlineData = media.svgData;
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
    const showCards = (/&amp;showmedia$/i.test(href));
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
      const gifClassName = imageStyles[text] || imageStyles.default;

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
    const youtubeEmbed = convertYoutubeFragmentToEmbed(href, title, text);
    const vimeoEmbed = convertVimeoFragmentToEmbed(href, title, text);

    if (youtubeEmbed) {
      out += youtubeEmbed;
    }
    else if (vimeoEmbed) {
      out += vimeoEmbed;
    }
    else if (text === 'swatch') {
      const bgColor = href || 'pink';
      out += `<span class="smartdown-swatch" style="background:${bgColor}"></span>`;
    }
    else {
      const className = imageStyles[text] || imageStyles.default;

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

  let useNewWindow = true;
  let expanded = expandHrefWithLinkRules(href);

  let forceNewWindow = false;
  const attrsIndex = expanded.lastIndexOf('#-');

  let attrs = '';
  if (attrsIndex >= 0) {
    attrs = expanded.slice(attrsIndex + '#-'.length);
    expanded = expanded.slice(0, attrsIndex);
    forceNewWindow = attrs === 'blank';
    // console.log('attrs', href, attrs, expanded, forceNewWindow);
  }

  if (expanded !== href) {
    href = expanded;
    useNewWindow = false || forceNewWindow;
    //
  }
  else if (href.indexOf('#') === 0) {
    useNewWindow = false || forceNewWindow;
  }
  else if (href.indexOf('http') !== 0) {
    useNewWindow = false || forceNewWindow;
  }
  else if (href.indexOf(smartdownTag) === 0) {
    // x
  }

  const titleAttr = title ? `title="${title}" ` : '';
  let linkHead = '<a ' + titleAttr +
                 ' class="smartdown-link" href="' +
                 href;
  if (useNewWindow) {
    linkHead += '" target="_blank" rel="noreferrer noopener">';
  }
  else {
    linkHead += '">';
  }

  const linkBody = text;
  const lowerhref = href.toLowerCase();
  const linkTail = '</a>';
  let result = linkHead + linkBody + linkTail;

  if (lowerhref.indexOf(smartdownTag) === 0) {
    let cellscript = decodeInlineScript(href.slice(smartdownTag.length));
    let op = null;
    let lhs = null;
    let rhs = null;

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
      const exprs = cellscript.split(';');
      if (exprs.length === 1) {
        const eqIndex = cellscript.indexOf('=');
        lhs = [cellscript.slice(0, eqIndex)];
        rhs = [cellscript.slice(eqIndex + 1)];
      }
      else {
        lhs = [];
        rhs = [];
        exprs.forEach((e) => {
          const eqIndex = e.indexOf('=');
          lhs.push(e.slice(0, eqIndex));
          rhs.push(e.slice(eqIndex + 1));
        });
      }
      // console.log('lhs/rhs', lhs, rhs);
    }
    else if (cellscript.indexOf('/') === 0) {
      const parts2 = cellscript.split('@');
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

    let newHTML = '';
    const hasLabel = !!(text && text.length > 0);
    if (op === 'INPUT') {
      uniqueCellIndex++;
      const inputCellId = 'INPUT' + uniqueCellIndex;
      const inputCellIdParts = lhs.split(/[|!]/g);
      let inputType = 'text';
      let liveBlur = false;
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
      const inputRangeCellId = 'INPUTRANGE' + uniqueCellIndex;

      const lhsElements = lhs.split('/');
      lhs = lhsElements[0];

      let min = lhsElements[1];
      let max = lhsElements[2];
      let step = lhsElements[3];

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
      const inputCheckboxCellId = 'INPUTCHECKBOX' + uniqueCellIndex;

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
      const manualInvoke = hasLabel;
      if (hasLabel) {
        text = text.replace(/<code class="hljs-inline">(.+)<\/code>/g, '`$1`');
      }
      const expr = smartdown.registerExpression(uniqueCellIndex, text, lhs, rhs, hasLabel);
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
      const outputCellId = 'OUTPUT_' + uniqueCellIndex;

      const outputCellIdParts = lhs.split(/[|!]/g);
      let outputType = 'text';
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

      const smartdownClass = 'smartdown-' + outputType;

      // DRY this up. It's stupidly repetitive
      if (
        outputType !== '' &&
        outputType !== 'text' &&
        outputType !== 'markdown' &&
        outputType !== 'url') {
        newHTML += `<div class="infocell-output ${smartdownClass} ${flavors}" id="${outputCellId}"></div>`;
      }
      else {
        newHTML += `<span class="infocell-output ${smartdownClass} ${flavors}" id="${outputCellId}"></span>`;
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
      const settings = rhs.split(',');
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
  const result =
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

  if (disclosableI >= 0) {
    const disclosableDeclaration = text.slice(disclosableI + 4).trim();
    text = text.slice(0, disclosableI);

    if (disclosableDivsOpened > 0 && disclosableDeclaration.length === 0) {
      for (let decorationIndex = 0; decorationIndex < decorationDivsOpened; decorationIndex++) {
        result += `</div>`;
      }
      decorationDivsOpened = 0;

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
  else {
    const slug = slugger.slug(raw);
    const prefix = window.location.pathname;
    const anchor = `<a class="smartdown-h-anchor" href="${prefix}##${slug}">&#x1F517;</a>`;
    result = `<h${level} id="${slug}">${text}${anchor}</h${level}>`;
  }

  return result;
}

function renderTable(header, body) {
  if (body) body = '<tbody>' + body + '</tbody>';

  const emptyTH = header.split('></th>').length;
  const allTH = header.split('</th>').length;

  const style = emptyTH === allTH ? ' style="display: none;"' : '';
  return `<table>
<thead${style}>
${header}
</thead>
${body}
</table>`;
}


// Override function
const renderer = {
  link: renderLink,
  image: renderImage,
  paragraph: renderParagraph,
  br: renderBr,
  heading: renderHeading,
  table: renderTable,
  code: renderCode,
  // codespan: function(text) {
  //   const result = hljs.highlightAuto(text).value; // '<code>' + text + '</code>';
  //   return `<code class="hljs-inline">${result}</code>`;
  // },
  text(src) {

    return entityEscape(src.replace(/:([A-Za-z0-9_\-+]+?):/g, emojiReplacer));
  },
};

const tokenizer = {
  escape(src) {
    const mathRules = /^(\$+)[^$]*\1/;
    const cap = mathRules.exec(src);
    // math
    if (cap) {
      const escaped = cap[0].replace(/</g, '< ');

      const result = {
        type: 'text',
        raw: cap[0],
        text: escaped
      };

      return result;
      // src = src.substring(cap[0].length);
      // const escaped = cap[0].replace(/</g, '< ');
      // out += escaped;
      // continue;
    }

    return false;
  },
};

/* eslint-disable-next-line */
const walkTokens = token => {
  // const nChildren = token.tokens ? token.tokens.length : 0;
  // console.log('walkTokens', token.type, nChildren, token.text, token.raw);
};

const markedOpts = {
  headerIds: true,
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  langPrefix: 'hljs ',
  highlight: function (code, lang) {    // , callback)
    const playableType = playableTypes[lang];
    let result;
    if (lang && playableType) {
      const mappedLanguage = playableType ? playableType.highlight : lang;
      result = hljs.highlightAuto(code, [mappedLanguage]);
    }
    else {
      result = hljs.highlightAuto(code, [lang]);
    }

    return result.value;
  },
  renderer,
  tokenizer,
  walkTokens
};

function enhanceMarkedAndOpts() {
  marked.use(markedOpts);
}

//
// End of marked.js extensions
//


function partitionMultipart(markdown) {
  markdown = '\n' + markdown; // deal with lack of leading \n
  const splits = markdown.split(/\n# ([a-zA-Z0-9_]+)\n---\n/);
  const result = {
  };
  let firstKey = null;
  for (let i = 1; i < splits.length; i += 2) {
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

  const types = [];

  for (let i = 0; i < lhss.length; ++i) {
    let lhs = lhss[i];
    const calcCellIdParts = lhs.split(/[|!]/g);
    let calcType = 'text';
    if (calcCellIdParts.length > 1) {
      lhs = calcCellIdParts[0];
      calcType = calcCellIdParts[1];
    }
    lhss[i] = lhs;
    types.push(calcType);
  }

  const rootDivId = currentRenderDiv.id;
  const exprId = `expr-${cellIndex}`;
  const labelId = `label-${exprId}`;

  const expr = {
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
    let newExpr = '';
    const splits = expr.split('`');
    for (let i = 0; i < splits.length; ++i) {
      const prefix = splits[i];
      newExpr += prefix;
      if (i < splits.length - 1) {
        const varName = splits[++i];
        const varValue = smartdownVariables[varName];
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
  const expressions = perPageState.expressionsRegistered;
  Object.keys(expressions).forEach((exprId) => {
    const entry = expressions[exprId];
    if (!entry) {
      console.log('computeExpressions DELETED', exprId);
    }
    else if (entry.manual) {
      // console.log('compute manual', entry, entry.labelId);
      if (entry.labelId) {
        // const rootDiv = document.getElementById(entry.rootDivId);
        const labelElement = document.getElementById(entry.labelId);
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
  });
}

function registerPlayable(prelude, language, renderDivId, divId, preId, dbgId, dbgToggleId, consoleId, consoleToggleId, functionId, playId, stopId, progressId, autoplay, isModule, code, transform, targetDivId) {
  let augmentedCode = code;
  const playableType = playableTypes[language];

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
      augmentedCode = Brython.generateAugmentedPlayable(divId, isModule, code);
    }
    else if (language === 'filament') {
      augmentedCode = FilamentExtension.generateAugmentedPlayable(isModule, code);
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
      const innerHTML = OpenJSCAD.generateInnerHTML(divId);
      const preludeCode =
`
  this.div.innerHTML =
\`
${innerHTML}
\`;  

`;

      const bodyCode = OpenJSCAD.generateAugmentedPlayable(divId, code);
      augmentedCode =
`
${preludeCode}

return (async () => {

  ${bodyCode}

})();

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
return (async () => {

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
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncFunction#examples
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const AsyncFunction = (async function () {}).constructor;
  const func = new AsyncFunction(...playableArgNames, code);

  let embedResult = null;
  try {
    embedResult = await func.apply(embedThis, argValues);
  }
  catch (e) {
    console.log('###runFunction catch func.apply()', e);
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
    }
  }

  return embedResult;
}


async function runModule(playable, argValues) {
  const divId = playable.divId;
  const code = playable.augmentedCode;
  const embedThis = playable.embedThis;
  // console.log('runModule', playable, embedThis, code.slice(0, 50));

  const s = document.createElement('script');
  playable.es6ModuleScript = s;
  if (smartdown.es6Playables[divId]) {
    console.log('runModule error: smartdown.es6Playables[divId] exists', divId, smartdown.es6Playables[divId]);
  }

  const glueStart = () => {
    if (smartdown.es6Playables[divId].start) {
      smartdown.es6Playables[divId].start.call(embedThis, ...argValues);
    }
  };

  smartdown.es6Playables[divId] = {
    script: s,
    start: null,
    glueStart,
  };
  s.type = 'module';

  s.onerror = function (error) {
    console.log('runModule...onerror', error);
  };
  s.async = false;
  const augmentedCode =
`
${code}

const augmentedDivId = '${divId}';
smartdown.es6Playables[augmentedDivId].glueStart();
`;

  s.text = augmentedCode;

  document.head.appendChild(s);
  const embedResult = null;

  return embedResult;
}


async function playPlayableInternal(language, divId) {
  // console.log('playPlayableInternal', divId);

  const playable = perPageState.playablesRegistered[divId];
  const div = document.getElementById(playable.divId);
  const divPre = document.getElementById(playable.preId);
  // const divDbg = document.getElementById(playable.dbgId);
  // const divDbgToggle = document.getElementById(playable.dbgToggleId);
  const play = document.getElementById(playable.playId);
  const stop = document.getElementById(playable.stopId);
  const progress = document.getElementById(playable.progressId);
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
  const playableType = playableTypes[language];
  if (playableType.javascript) {
    const argValues = [
      playable,
      smartdownVariables,
      P5.Loader,
      window.d3,
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

    //
    // It seems like there is some duplication between a playable's
    // 'this' value, and the value of the 'playable' argument.
    //
    playable.embedThis = {
      env: smartdownVariables,
      div,
      progress,
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
      if (playable.isModule && playable.language !== 'typescript') {
        await smartdown.runModule(playable, argValues, language);
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
        for (let i = 0; i < P5.Loader.soundOut.soundArray.length; i++) {
          const soundResource = P5.Loader.soundOut.soundArray[i];
          if (!soundResource.owner ||
              soundResource.owner === this) {
            // console.log('DISPOSE [' + i + '] disposeSound soundResource:', soundResource);
            soundResource.dispose();
          }
        }
      }

      const removeHandlers = P5.Loader.prototype._registeredMethods.remove;
      for (let i = 0; i < removeHandlers.length; ++i) {
        if (removeHandlers[i] === P5.Loader.prototype.disposeSound) {
          removeHandlers[i] = patchedDisposeSound;
        }
      }

      // const oldmousemove = P5.Loader.prototype._onmousemove;
      // P5.Loader.prototype._onmousemove = function(e) {
      //   console.log('onmousemove', e);
      // };
      // const oldtouchend = P5.Loader.prototype._ontouchend;
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
        const context = this._isGlobal ? window : this;
        let executeDefault;
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

      /* eslint-disable-next-line @typescript-eslint/no-implied-eval */
      let func = new Function(...playableArgNames, playable.augmentedCode);
      playable.embedThis.IAMP5 = 'IAMP5';
      func = func.bind(
        playable.embedThis,
        ...(argValues.slice(0, -1))
      );

      try {
        const myP5 = new P5.Loader(func, div);
        if (myP5._targetFrameRate === 60) {
          myP5.frameRate(16);
        }
        myP5._onresize();
        function keydownHandler(e) {
          // console.log('keydownHandler', e.target.tagName, e);
          const ignoreKeys = [
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
      let atLeastOneDefined = false;

      if (Array.isArray(dependOn)) {
        // Legacy mode with a single .depend() method
        if (!depend) {
          atLeastOneDefined = true; // To drop the progress bar
        }
        else {
          let atLeastOneUndefined = false;
          dependOn.forEach((varname) => {
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
        Object.keys(dependOn).forEach((varname) => {
          atLeastOneEvaluated = true;
          const newValue = smartdownVariables[varname];
          playable.dependLastValues[varname] = newValue;

          if (newValue !== undefined) {
            atLeastOneDefined = true;
            dependOn[varname].apply(playable.embedThis);
          }
        });

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
    div.innerHTML = '';
    window.smartdownJSModules.graphviz.loader(function () {
      const options = {
        images: graphvizImages
      };

      (new window.Viz()).renderString(playable.code, options).then((result) => {
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
  const playable = perPageState.playablesRegistered[divId];
  if (playable) {
    const importsRemaining = playable.imports.slice(0);  // Copy

    const progress = document.getElementById(playable.progressId);
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
  const playable = perPageState.playablesRegistered[divId];
  if (!playable.playing) {
    // console.log('resetPlayable NOT PLAYING', language, divId);
  }
  else {
    // console.log('resetPlayable PLAYING', playable.divId, playable);
    const div = document.getElementById(playable.divId);
    const play = document.getElementById(playable.playId);
    const stop = document.getElementById(playable.stopId);
    const progress = document.getElementById(playable.progressId);
    if (play) {
      play.style.display = 'inline-block';
      stop.style.display = 'none';
    }

    if (progress) {
      progress.style.display = 'none';
    }

    const divPre = document.getElementById(playable.preId);
    if (divPre && !throwAway) {
      divPre.style.display = 'block';
    }

    const playableType = playableTypes[language];

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
        const myP5 = playable.p5;
        if (myP5) {
          window.removeEventListener('keydown', myP5.keydownHandler);
          // myP5.noLoop();
          playable.p5 = null;
          myP5.remove();
          if (div) {
            const canvas = div.getElementsByTagName('canvas');
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
  const div = document.getElementById(divId);
  const newStyle = (div.style.display === 'block' ? 'none' : 'block');
  div.style.display = newStyle;
}



function toggleConsole(divId) {
  const div = document.getElementById(divId);
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
    // if (true || newHeight > div.scrollHeight) {
    div.style.height = `${newHeight}px`;
    // }
  }
  const toggle = document.getElementById(playable.consoleToggleId);
  if (toggle) {
    toggle.style.display = 'block';
  }
}


function activateDraggableDisclosure(divId) {
  const div = document.getElementById(divId);
  // const body = document.getElementsByTagName('body')[0];
  const baseContainer = div.parentElement;
  const divHeader = document.getElementById(divId + '_header');
  let offsetX = 0;
  let offsetY = 0;

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
  const div = document.getElementById(divId);

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
    // const divBound = div.getBoundingClientRect();

    const baseContainer = div.parentElement;
    // const bound = baseContainer.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    // const visibleHeight = Math.min(bound.height, viewportHeight);
    // const visibleWidth = Math.min(bound.width, viewportWidth);
    const visibleHeight = viewportHeight;
    const visibleWidth = viewportWidth;
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
  const options = settingsStr.split(',');

  if (options.includes('transparent')) {
    // pass
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

  const div = document.getElementById(divId);
  if (div) {
    div.classList.remove('disclosable-draggable', 'disclosable-scrollable', 'disclosable-shadow', 'disclosable-lightbox', 'disclosable-outline', 'disclosable-transparent');

    const contentDiv = div.querySelector('.disclosable-content');
    contentDiv.classList.remove('disclosable-scrollable-content', 'disclosable-shadow-content', 'disclosable-lightbox-content', 'disclosable-outline-content', 'disclosable-transparent-content');
    div.classList.add('disclosable-open');
    if (settings.scrollable) {
      div.classList.add('disclosable-scrollable');
      contentDiv.classList.add('disclosable-scrollable-content');
    }

    for (let i = 0; i < settings.decorations.length; i++) {
      div.classList.add(`disclosable-${settings.decorations[i]}`);
    }

    for (let i = 0; i < settings.decorationsInner.length; i++) {
      contentDiv.classList.add(`disclosable-${settings.decorationsInner[i]}`);
    }

    const headerDiv = document.getElementById(`${divId}_header`);
    headerDiv.classList.remove('disclosable-header-position');
    headerDiv.innerHTML = '';

    const closeable = settings.hideTrigger === 'closeable';
    if (settings.draggable || closeable) {
      headerDiv.classList.add('disclosable-header-position');
      if (closeable) {
        headerDiv.innerHTML = `<button class="disclosable-button-close" onclick="smartdown.hideDisclosure('${divId}','${settingsStr}')">&#10006;</button>`;
      }

      if (settings.draggable) {
        activateDraggableDisclosure(divId);
      }
    }

    setDisclosureLocation(div, contentDiv, triggerId, settings);

    if (settings.hideTrigger === 'onmouseleave') {
      /* eslint-disable no-use-before-define */
      activateOnMouseLeave(divId, settingsStr);
      /* eslint-enable no-use-before-define */
    }
  }

  setVariable(divId, true, 'boolean');
}


function hideDisclosure(divId, settingsStr) {
  const settings = parseDisclosureSettings(settingsStr);
  const div = document.getElementById(divId);

  if (div) {
    const contentDiv = div.querySelector('.disclosable-content');

    div.classList.remove('disclosable-open');

    if (div.classList.contains('disclosable-position')) {
      div.classList.remove('disclosable-position');
    }

    if (div.classList.contains('disclosable-attach')) {
      div.classList.remove('disclosable-attach');
    }

    for (let i = 0; i < settings.decorations.length; i++) {
      if (div.classList.contains(`disclosable-${settings.decorations[i]}`)) {
        div.classList.remove(`disclosable-${settings.decorations[i]}`);
      }
    }

    for (let i = 0; i < settings.decorationsInner.length; i++) {
      if (contentDiv.classList.contains(`disclosable-${settings.decorationsInner[i]}`)) {
        contentDiv.classList.remove(`disclosable-${settings.decorationsInner[i]}`);
      }
    }

    if (settings.hideTrigger === 'onmouseleave') {
      div.disclosableTimer = window.setTimeout(() => {
        deactivateOnMouseLeave(divId);
      }, 500);
    }
  }

  setVariable(divId, false, 'boolean');
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
  const elem = document.documentElement;
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  }
  else if (elem.mozRequestFullScreen) { /* Firefox */
    elem.mozRequestFullScreen();
  }
  else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    elem.webkitRequestFullscreen();
  }
  else if (elem.msRequestFullscreen) { /* IE/Edge */
    elem.msRequestFullscreen();
  }
}

/* Close fullscreen */
function closeFullscreen() {
  // const elem = document.documentElement;
  if (document.exitFullscreen) {
    document.exitFullscreen();
  }
  else if (document.mozCancelFullScreen) { /* Firefox */
    document.mozCancelFullScreen();
  }
  else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
    document.webkitExitFullscreen();
  }
  else if (document.msExitFullscreen) { /* IE/Edge */
    document.msExitFullscreen();
  }
}

function toggleKiosk(divId, event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }

  const div = document.getElementById(divId);
  div.parentElement.classList.toggle('smartdown-playable-kiosk');
  div.scrollIntoView();

  const playable = perPageState.playablesRegistered[divId];
  if (playable && playable.p5) {
    playable.p5._onresize();
  }
}


function toggleDisclosure(divId, triggerId, settingsStr) {
  const div = document.getElementById(divId);
  const isOpen = !!smartdownVariables[divId];

  if (div) {
    const isOpenClass = div.classList.contains('disclosable-open');

    if (isOpenClass !== isOpen) {
      console.log('toggleDisclosure inconsistency', isOpenClass, isOpen);
    }

    // this will need to be added when we have a datastructure for
    // disclosables.  A list of triggers to update.
    // maybe we could make an updateTriggerButton function
    // const openedSpan = document.getElementById(`span_${divId}_opened`);
    // if (openedSpan) {
    //   openedSpan.style.display = willBeOpen ? 'inline' : 'none';
    // }
    // const closedSpan = document.getElementById(`span_${divId}_closed`);
    // if (closedSpan) {
    //   closedSpan.style.display = willBeOpen ? 'none' : 'inline';
    // }
  }

  if (isOpen) {
    hideDisclosure(divId, settingsStr);
  }
  else {
    showDisclosure(divId, triggerId, settingsStr);
  }
}


function activateOnMouseLeave(divId, settingsStr) {
  const div = document.getElementById(divId);
  if (div) {
    window.clearTimeout(div.disclosableTimer);
    div.disclosableTimer = null;
    div.disclosableLocked = false;

    div.onmouseenter = () => {
      div.disclosableLocked = true;
      window.clearTimeout(div.disclosableTimer);
      div.disclosableTimer = null;
    };

    div.onmouseleave = (e) => {
      if (
        (e.pageX <= div.offsetLeft) ||
        (e.pageX >= div.offsetLeft + div.offsetWidth) ||
        (e.pageY <= div.offsetTop) ||
        (e.pageY >= div.offsetTop + div.offsetHeight)) {
        // console.log('nonbogus mouseleave', e.clientY, e.pageY, div.offsetTop, div.offsetHeight, e);
        div.disclosableLocked = false;
        div.disclosableTimer = window.setTimeout(() => {
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
}


function linkWrapperExit(divId, settingsStr) {
  const div = document.getElementById(divId);

  if (div) {
    // The 500ms timer gives the user a chance to move their mouse from
    // the trigger area into the disclosable, without the disclosable disappearing
    // due to the mouse leaving the trigger area.
    //
    div.disclosableTimer = window.setTimeout(() => {
      this.hideDisclosure(divId, settingsStr);
    }, 500);
  }
  else {
    this.hideDisclosure(divId, settingsStr);
  }
}


function pause() {
  lodashEach(perPageState.playablesRegisteredOrder, function (playable) {
    if (playable && playable.p5) {
      playable.p5.getAudioContext().suspend();
    }
  });
}


function resume() {
  lodashEach(perPageState.playablesRegisteredOrder, function (playable) {
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
    lodashEach(perPageState.playablesRegisteredOrder, function(playable) {
      // console.log('startAutoplay', outputDiv, outputDiv.id, playable);
      if (playable.autoplay && !playable.playing) {
        const sel = '#' + outputDiv.id + ' #' + playable.divId;
        const divHere = document.querySelectorAll(sel);
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
  const expressions = perPageState.expressionsRegistered;

  Object.keys(expressions).forEach((exprId) => {
    const expr = expressions[exprId];
    if (!expr) {
      // console.log('cleanupOrphanedStuff expr DELETED', exprId);
    }
    else {
      const element = document.getElementById(expr.rootDivId);
      const labelElement = document.getElementById(expr.labelId);
      // console.log('cleanupOrphanedStuff/expr', expr.rootDivId, expr);
      if (element && labelElement) {
        newER[expr.exprId] = expr;
        // console.log('...cleanupOrphanedStuff/expr div found', expr.rootDivId, expr, element);
      }
      else {
        // console.log('...cleanupOrphanedStuff/expr divs not found', expr.rootDivId, expr.labelId, expr, element, labelElement);
      }
    }
  });

  perPageState.expressionsRegistered = newER;

  const newPRO = [];
  const newPR = {};

  lodashEach(perPageState.playablesRegisteredOrder, function (playable) {
    // console.log('cleanupOrphanedStuff/playable', playable.divId, playable);
    const element1 = document.getElementById(playable.divId);

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
  lodashEach(perPageState.playablesRegisteredOrder, function (playable) {
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
  const playablesToTransform = [];
  if (window.godownTranslate) {
    lodashEach(perPageState.playablesRegisteredOrder, function (playable) {
      if (playable.transform) {
        if (outputDiv.id) {
          const sel = '#' + outputDiv.id + ' #' + playable.divId;
          const divHere = document.querySelectorAll(sel);
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
      const playable = slicedPlayablesToTransform[0];
      const code = playable.code;
      const packageIndex = code.indexOf('package ');

      if (packageIndex === 0) {
        const packageEndIndex = code.indexOf('\n');
        if (packageEndIndex !== 0) {
          const packageName = code.slice('package '.length, packageEndIndex);

          const divAccessCode =
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
  _linkRules.forEach((link) => {
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
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const _baseURL = options.baseURL;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const _cardLoader = options.cardLoader;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const _calcHandlers = options.calcHandlers;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const _linkRules = options.linkRules;

  document.addEventListener('visibilitychange', handleVisibilityChange);

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
  /* eslint new-cap: 0 */
  /* eslint no-native-reassign: 0 */
  /* eslint no-trailing-spaces: 0 */
  /* global smartdown */

  Object.keys(mediaRegistry).forEach((key) => {
    const url = mediaRegistry[key];
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
      function svgLoaded() {
        /* eslint no-invalid-this: 0 */
        const sourceText = this.responseText;
        const svgMedia = mediaRegistry[this.svgKey];
        svgMedia.svgData = sourceText;
        svgMedia.type = 'svginline';
      }

      const oReq = new XMLHttpRequest();
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
  });

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
  if (window.smartdown.baseURL === 'https://mochalocalhost/') {
    window.xypicURL = 'https://unpkg.com/smartdown/dist/lib/xypic.js';
  }

  // console.log('__webpack_public_path__', __webpack_public_path__, window.smartdown.baseURL, window.location.origin, window.xypicURL);
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
    window.setTimeout(loadedHandler, 0);
  }

  if (useMathJax) {
    const mathjaxURL = testing ?
      // 'https://localhost:8080/MathJax.js?config=TeX-MML-AM_HTMLorMML-full&delayStartupUntil=configured' :
      'https://cdn.jsdelivr.net/npm/mathjax@2/MathJax.js?config=TeX-MML-AM_HTMLorMML-full&delayStartupUntil=configured' :
      'https://cdn.jsdelivr.net/npm/mathjax@2/MathJax.js?config=TeX-MML-AM_HTMLorMML-full&delayStartupUntil=configured';

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


function initialize(media, baseURL, loadedHandler, cardLoaderArg, calcHandlersArg, linkRulesArg) {
  const options = {
    media,
    baseURL,
    cardLoader: cardLoaderArg,
    calcHandlers: calcHandlersArg,
    linkRules: linkRulesArg,
  };

  configure(options, loadedHandler);
}

let patchesUnresolvedKludgeLimit = 0;

async function renderCell(cellID, variableId, newValue) {
  const cellInfo = smartdownCells[cellID];

  const element = document.getElementById(cellID);
  // console.log('renderCell', cellInfo, newValue, element, element.type, element.tagName, cellInfo.cellType, cellInfo.datatype, s);
  let s = JSON.stringify(newValue, null, 2);
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
      ensureExtension('openjscad', async function() {
        const innerHTML = OpenJSCAD.generateInnerHTML(divId);
        element.innerHTML = innerHTML;
        const augmentedCode = OpenJSCAD.generateAugmentedPlayable(divId, newValue);
        // console.log('augmentedCode');
        // console.log(augmentedCode);

        const asyncAugmentedCode =
`
return (async () => {
  ${augmentedCode}
})();
`;
        /* eslint-disable-next-line no-new-func */
        // eslint-disable-next-line @typescript-eslint/no-implied-eval
        const func = new Function([], asyncAugmentedCode);

        try {
          await func.apply(this, [null]);
        }
        catch (e) {
          console.log('###runFunction catch func.apply()', e);
          element.innerHTML = `<b># Error evaluating OpenJSCAD cell: ${e}</b>`;
        }
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
    element.innerHTML = '';
    if (typeof newValue === 'string' && newValue.length > 0) {
      window.smartdownJSModules.graphviz.loader(function () {
        const options = {
          images: graphvizImages
        };
        (new window.Viz()).renderString(newValue, options).then((result) => {
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
    let elementList = '<ul class="infocell-output-list">';
    for (let elementIndex = 0; elementIndex < newValue.length; ++elementIndex) {
      const newElement = newValue[elementIndex];
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
        elementList += `<li><pre class="infocell-output-pre">${JSON.stringify(newElement, null, 2)}</pre></li>`;
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
  else if (element.tagName === 'TEXTAREA') {
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


function propagateModel() {
  ensureCells();
  ensureVariables();
  lodashEach(smartdownVariables, function (v, k) {
    propagateChangedVariable(k, v);
  });
}


async function updateProcesses(id, newValue) {
  smartdown.computeExpressions();

  if (id) {
    // lodashEach(smartdownCells, function(newCell, cellID) {
    //   console.log('........newCellCheck', id, newCell, newCell.cellBinding, cellID);
    // });
    lodashEach(smartdownCells, async function(newCell, cellID) {
      // console.log('........newCell', id, newCell, newCell.cellBinding, cellID);

      if (id === newCell.cellBinding) {
        await renderCell(cellID, newCell.cellBinding, newValue);
      }
    });
  }
  else {
    lodashEach(smartdownCells, async function(newCell, cellID) {
      const oldValue = smartdownVariables[newCell.cellBinding];
      await renderCell(cellID, newCell.cellBinding, oldValue);
    });
  }

  lodashEach(perPageState.playablesRegisteredOrder, async function (playable) {
    if (playable) {
      const progress = document.getElementById(playable.progressId);

      if (playable.playing) {
        const {depend, dependOn} = playable.embedThis;
        // console.log('.........playable', playable, dependOn, depend);
        if (Array.isArray(dependOn)) {
          if (depend) {
            let signal = false;

            if (dependOn) {
              let atLeastOneUndefined = false;
              dependOn.forEach((varname) => {
                const oldValue = playable.dependLastValues[varname];
                const newerValue = smartdownVariables[varname];
                playable.dependLastValues[varname] = newerValue;
                if (newerValue === undefined) {
                  atLeastOneUndefined = true;
                }

                if (!areValuesSameEnough(varname, oldValue, newerValue)) {
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
          Object.keys(dependOn).forEach((varname) => {
            const oldValue = playable.dependLastValues[varname];
            const newerValue = smartdownVariables[varname];
            playable.dependLastValues[varname] = newerValue;

            if (!areValuesSameEnough(varname, oldValue, newerValue)) {
              if (progress) {
                progress.style.display = 'none';
              }
              dependOn[varname].apply(playable.embedThis);
            }
          });
        }
      }
      else if (progress) {
        progress.style.display = 'none';
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
  lodashEach(smartdownCells, function(newCell, cellID) {
    const element = document.getElementById(cellID);
    if (!element) {
      // console.log('...ensureCells element for cellID not found', cellID, smartdownCells[cellID]);
      delete smartdownCells[cellID];
    }
  });
}


function ensureVariables() {
  lodashEach(smartdownCells, function(newCell) {
    const oldValue = smartdownVariables[newCell.cellBinding];
    changeVariable(newCell.cellBinding, oldValue);
  });
}

function resetVariables() {
  smartdownVariables = {};
  changeVariable(null, null);
  ensureVariables();
}

let scrollHoverDisableEnabled = false;
let lastY;

function setupScrollHoverDisable() {
  lastY = 0;
  if (!scrollHoverDisableEnabled) {
    let timer;
    scrollHoverDisableEnabled = true;
    // https://www.thecssninja.com/css/pointer-events-60fps
    const body = document.getElementsByTagName('body')[0];
    window.addEventListener('scroll', function() {
      const currentY = window.scrollY;
      const delta = Math.abs(lastY - currentY);

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
    const frontMatterBegin = md.slice(fmPrefix.length - 1);
    const frontMatterEndIndex = frontMatterBegin.indexOf(fmSuffix);
    if (frontMatterEndIndex >= 0) {
      const frontMatterText = frontMatterBegin.slice(0, frontMatterEndIndex);
      resultFMText = frontMatterText; // frontMatterBegin.slice(frontMatterEndIndex + fmSuffix.length);
      resultFM = frontMatterText === '' ? {} : jsyaml.load(resultFMText);
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
    let resizeTimeout;

    function actualResizeHandler() {
      const playables = perPageState.playablesRegistered;
      Object.keys(playables).forEach((k) => {
        const playable = playables[k];
        if (playable.playing) {
          const d = document.getElementById(playable.divId);
          if (d) {
            if (playable.embedThis && playable.embedThis.sizeChanged) {
              playable.embedThis.sizeChanged();
            }
          }
        }
      });
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
      const doneHandler = done || function emptyDone() {};

      if (useLocalForage && smartdown.persistence) {
        localForage.iterate(function(value, key) {
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
            event.stopPropagation();
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

    const firstTweetIndex = md.search(/[^`]!\[[^\]]*\]\(https:\/\/twitter\.com\/[^`]/);

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

  // let result = marked(md);

  // Inline Playables need their tokens adjusted before
  // rendering, or else they will act as paragraphs and
  // not use the inline styling.
  // I wonder if WalkTokens would be easier...
  //  https://marked.js.org/using_pro#walk-tokens

  const lexer = new marked.Lexer();
  const tokens = lexer.lex(md);

  let precedingParagraph = null;
  let precedingInlinedCodeblock = null; // This is a code block with /inline
  tokens.forEach((t) => {
    if (t.type === 'paragraph') {
      if (precedingInlinedCodeblock) {
        const firstChild = t.tokens[0];
        if (firstChild && firstChild.type === 'text') {
          firstChild.text = inlinePrefix + firstChild.text;
          if (firstChild.text.indexOf(inlinePrefix) === 0) {
            // console.log(' WEIRD1 already inline prefixed', firstChild.text, firstChild.raw, firstChild);
          }
          else {
            firstChild.text = inlinePrefix + firstChild.text;
          }
        }
      }
      precedingParagraph = t;
      precedingInlinedCodeblock = null;
    }
    else if (t.type === 'code') {
      const inlineCode = t.lang && t.lang.indexOf('/inline') >= 0;
      if (precedingParagraph &&
          inlineCode &&
          precedingParagraph.text.indexOf(inlinePrefix) !== 0) {
        const firstChild = precedingParagraph.tokens[0];
        if (firstChild && firstChild.type === 'text') {
          if (firstChild.text.indexOf(inlinePrefix) === 0) {
            // console.log(' WEIRD2 already inline prefixed', firstChild.text, firstChild.raw, firstChild);
          }
          else {
            firstChild.text = inlinePrefix + firstChild.text;
          }
        }
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

  let result = marked.parser(tokens);

  // https://github.com/cure53/DOMPurify/tree/master/demos#advanced-config-demo-link
  const config = {
    FORCE_BODY: true,
    ADD_TAGS: ['script', 'iframe'],
    ADD_ATTR: ['onblur', 'oninput', 'onchange', 'onclick', 'onmousedown', 'onmouseup', 'onmouseenter', 'onmouseleave', 'onkeydown', 'onkeyup', 'target', 'allow', 'allowfullscreen'],
  };

  const sanitized = createDOMPurify.sanitize(result, config);
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
    let patchesUnresolved = 0;
    bp.forEach((patch) => {
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

      // const renderDivId = outputDiv.id + '-render';
      // const renderDiv = document.getElementById(renderDivId);

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
      if (testing) {
        MathJax.Hub.Typeset(outputDiv);
        finishIt();
      }
      else {
        MathJax.Hub.Typeset(outputDiv, finishIt);
      }
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
    lodashEach(assignments, (assignment) => {
      let newValue = assignment.rhs;
      if (assignment.type === 'number') {
        newValue = Number(newValue);
      }
      changeVariable(assignment.lhs, newValue);
    });
  }
  else {
    Object.keys(assignments).forEach((varname) => {
      changeVariable(varname, assignments[varname]);
    });
  }

  ensureCells();
  updateProcesses();
}


function computeStoredExpression(exprId) {
  const entry = perPageState.expressionsRegistered[exprId];
  if (!entry) {
    console.log('computeStoredExpression no such expression', exprId, perPageState.expressionsRegistered);
    // debugger;
  }
  else if (entry.manual) {
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
  const {lhss, rhss, types} = entry;

  if (lhss.length !== rhss.length || types.length !== lhss.length) {
    console('lhss.length !== rhss.length || types.length !== lhss.length', lhss.length, rhss.length, types.length);
  }
  else {
    let numPending = 0;

    function resolvePending(result, lhs) {
      propagateChangedVariable(lhs, result);
      // changeVariable(lhs, result);
      if (--numPending === 0) {
        if (done) {
          done();
        }
      }
    }

    for (let i = 0; i < lhss.length; ++i) {
      const lhs = lhss[i];
      let rhs = rhss[i];
      const type = types[i];

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
          const calcParts = rhs.split(/[./[]/);
          // const bracketIndex = rhs.indexOf('[');
          // const slashIndex = rhs.indexOf('/');

          const calcKey = calcParts[0];
          const calcBody = rhs.slice(calcKey.length);
          const calcHandler = calcHandlers[calcKey];
          if (calcHandler) {
            ++numPending;
            calcHandler(calcKey, calcBody, function(result) {
              resolvePending(result, lhs);
            });
          }
        }
      }
      else {
        let vars = '';
        lodashEach(smartdownVariables, function (v, k) {
          vars += ',' + k;
        });
        vars = vars.slice(1);
        const vals = lodashMap(smartdownVariables, function (v) {
          return v;
        });

        /* eslint-disable-next-line @typescript-eslint/no-implied-eval */
        const f = new Function(vars, 'return ' + rhs + ';');
        let newValue = f.apply({}, vals);
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
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  if (!outputDivId) {
    outputDivId = 'smartdown-output';
  }

  cardLoading = true;
  if (cardLoader) {
    cardLoader(cardKey, outputDivId);
  }
  else {
    let modelAsMarkdown = null;

    if (!cardKey || cardKey === 'Home') {
      modelAsMarkdown = currentMD;
    }
    else {
      const scriptx = smartdownScriptsMap[cardKey];
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
  Object.keys(smartdownScriptsMap).forEach((k) => {
    delete smartdownScriptsMap[k];
  });

  const scripts = document.scripts;
  Object.keys(scripts).forEach((s) => {
    const script = scripts[s];
    if (script && script.type && script.type === 'text/x-smartdown') {
      smartdownScripts.push(script);
      smartdownScriptsMap[script.id] = script;
    }
  });
}

function getMedia(mediaKey) {
  return mediaRegistry[mediaKey];
}

let youtubeIframeAPILoaded = false;
let youtubeIframeAPILoadedCbs = [];

function onYouTubeIframeAPIReady() {
  // console.log('onYouTubeIframeAPIReady');
  youtubeIframeAPILoaded = true;

  youtubeIframeAPILoadedCbs.forEach((cb) => {
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
    const playerDiv = document.getElementById(div);

    const player = new YT.Player(playerDiv, {
        events: {
          'onReady': function (/* event */) {
              // console.log('onPlayerReady', event);
              // console.log(player);
              smartdown.setVariable(varName, player, 'json');
          },
          'onStateChange': function (/* event */) {
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
  marked: marked,
  Stdlib: null,
  P5Loader: P5.Loader,
  d3: null,
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
  version: '1.0.63',
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
  loadExternal: loadExternal,
  ensureExtension: ensureExtension,
  es6Playables: es6Playables,
};

// kick off the polyfill!
smoothscroll.polyfill();

window.smartdown = module.exports;

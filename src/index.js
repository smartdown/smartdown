// 'use strict';

//
// Smartdown
// Copyright 2015, Daniel B Keith
//

/* global smartdown */
/* xglobal useFileSaver */
/* global useLocalForage */
/* global useGifffer */
/* global useMathJax */

import createDOMPurify from 'dompurify';

import emoji from 'emoji-js/lib/emoji.min';

const emojiInstance = new emoji();
const emojiReplacer = (match) => emojiInstance.replace_colons(match);
import axios from 'axios';
import smoothscroll from 'smoothscroll-polyfill';

import lodashEach from 'lodash/forEach';
import lodashMap from 'lodash/map';
import lodashIsEqual from 'lodash/isEqual';

window.lodashMap = lodashMap;
window.lodashEach = lodashEach;
window.lodashIsEqual = lodashIsEqual;

import vdomToHtml from 'vdom-to-html';
import StackTrace from 'stacktrace-js/dist/stacktrace.min';

import marked from 'marked';
import jsyaml from 'js-yaml';
import fileSaver from 'file-saver';
import localForage from 'localforage';
import Gifffer from 'gifffer';

window.jsyaml = jsyaml;

import {isExtensionRegistered, loadExternal, ensureExtension} from './extensions';

import hljs from './render/hljs';
import playableTypes from './playableTypes';
import mathjaxConfigure from './extensions/MathJax';
import P5 from './extensions/P5';

import './styles.css';


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
import expandHrefWithLinkRules from './util/expandHrefWithLinkRules';
import setupYouTubePlayer from './util/setupYouTubePlayer';
import recursivelyLoadIncludes from './parse/recursivelyLoadIncludes';
import partitionMultipart from './parse/partitionMultipart';
import getPrelude from './parse/getPrelude';

import renderImage from './render/renderImage';
import renderLink from './render/renderLink';
import renderCell from './render/renderCell';
import renderABCIntoDivs from './render/renderABCIntoDivs';

import {
  importScriptUrl,
  importModuleUrl,
  importTextUrl,
  importCssCode,
  importCssUrl,
} from './importers';

import entityEscape from './render/entityEscape';
import decodeInlineScript from './parse/decodeInlineScript';
import areValuesSameEnough from './util/areValuesSameEnough';
import graphvizImages from './extensions/Graphviz';

const testing = process.env.BUILD === 'test';

// let fileSaver = {};
// if (useFileSaver) {
//   fileSaver = require('file-saver');
// }

// let localForage = {};
// if (useLocalForage) {
//   localForage = require('localforage');
// }

// let Gifffer = {};
// if (useGifffer) {
//   Gifffer = require('gifffer');
// }

const localForageSmartdownPrefix = 'smartdownVariable/';
const inlinePrefix = '^^InLiNe^^';

let twitterLoading = false;
let cardLoader = null;
let calcHandlers = null;
const linkRules = [];
let currentHomeDiv = null;
let currentMD = null;

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

let cardLoading = false;

const smartdownScripts = [];
const smartdownScriptsMap = {};
const es6Playables = {};

let uniquePlayableIndex = 0;

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

//
// Marked rendering extensions
//



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

  const bp = smartdown.currentBackpatches[smartdown.currentRenderDiv.id];

  if ((playable || autoplay) && prelude.includes.length > 0) {
    const backpatchIndex = bp.length;
    const deferredCode =
`<pre>backpatch_${backpatchIndex}_${smartdown.currentRenderDiv.id}</pre>`;
    const backpatch = {
      currentRenderDiv: smartdown.currentRenderDiv,
      key: deferredCode,
      replace: null
    };
    bp.push(backpatch);

    const includesRemaining = prelude.includes.slice(0);  // Copy
    const prefixCode = '';
    recursivelyLoadIncludes(prefixCode, includesRemaining, function(includedCode) {
      const saveRenderDiv = smartdown.currentRenderDiv;
      smartdown.currentRenderDiv = backpatch.currentRenderDiv;
      const renderedExpandedCode = renderCodeInternal(smartdown.currentRenderDiv.id, includedCode, language, languageOpts, prelude);
      smartdown.currentRenderDiv = saveRenderDiv;
      const patch = bp[backpatchIndex];

      if (patch.key === deferredCode) {
        patch.replace = renderedExpandedCode;
      }
      else {
        console.log('#renderCode patch anomaly', backpatchIndex);
        console.log(deferredCode);
        console.log(patch.key);
      }
    });

    result = deferredCode;
  }
  else {
    result = renderCodeInternal(smartdown.currentRenderDiv.id, code, language, languageOpts, prelude);
  }

  return result;
}

function renderCodeSpan(text) {
  const unescaped = decodeInlineScript(text);
  const hljsResult = hljs.highlightAuto(unescaped, ['javascript']);
  return `<code class="hljs-inline">${hljsResult.value}</code>`;
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
  codespan: renderCodeSpan,
  text(src) {
    const result = entityEscape(src.replace(/:([A-Za-z0-9_\-+]+?):/g, emojiReplacer));
    return result;
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
    let langs = [lang];
    if (lang && playableType) {
      const mappedLanguage = playableType ? playableType.highlight : lang;
      langs = [mappedLanguage];
    }
    else if (lang === '') {
      const tempResult = hljs.highlightAuto(code);
      langs = [tempResult.language];
    }

    const result = hljs.highlightAuto(code, langs);
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

  const rootDivId = smartdown.currentRenderDiv.id;
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
        const varValue = smartdown.smartdownVariables[varName];
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
      smartdown.smartdownVariables,
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
      env: smartdown.smartdownVariables,
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
            const newValue = smartdown.smartdownVariables[varname];
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
          const newValue = smartdown.smartdownVariables[varname];
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
  const isOpen = !!smartdown.smartdownVariables[divId];

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
  global.smartdown = window.smartdown; // Needed for MochaJS/JSDom usage

  smartdown.currentRenderDiv = null;
  smartdown.currentBackpatches = {};
  smartdown.smartdownCells = {};
  smartdown.smartdownVariables = {};
  smartdown.uniqueCellIndex = 0;
  smartdown.mediaRegistry = {};

  const media = options.media;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const _baseURL = options.baseURL;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const _cardLoader = options.cardLoader;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const _calcHandlers = options.calcHandlers;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const _linkRules = options.linkRules;

  window.smartdown.baseURL = _baseURL || (window.location.origin + '/');
  window.xypicURL = options.xypicURL || (window.smartdown.baseURL + 'lib/xypic.js');

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
      function svgLoaded() {
        /* eslint no-invalid-this: 0 */
        const sourceText = this.responseText;
        const svgMedia = smartdown.mediaRegistry[this.svgKey];
        svgMedia.svgData = sourceText;
        svgMedia.type = 'svginline';
      }

      const oReq = new XMLHttpRequest();
      oReq.svgKey = key;
      oReq.addEventListener('load', svgLoaded);
      smartdown.mediaRegistry[key].type = 'svg';
      smartdown.mediaRegistry[key].url = url;
      smartdown.mediaRegistry[key].expandedurl = expandHrefWithLinkRules(url, linkRules);
      oReq.open('GET', smartdown.mediaRegistry[key].expandedurl);
      oReq.send();
    }
    else {
      smartdown.mediaRegistry[key].type = 'url';
      smartdown.mediaRegistry[key].url = url;
      smartdown.mediaRegistry[key].expandedurl = expandHrefWithLinkRules(url, linkRules);
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
    window.setTimeout(loadedHandler, 0);
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

function propagateModel() {
  ensureCells();
  ensureVariables();
  lodashEach(smartdown.smartdownVariables, function (v, k) {
    propagateChangedVariable(k, v);
  });
}


async function updateProcesses(id, newValue) {
  smartdown.computeExpressions();

  if (id) {
    // lodashEach(smartdown.smartdownCells, function(newCell, cellID) {
    //   console.log('........newCellCheck', id, newCell, newCell.cellBinding, cellID);
    // });
    lodashEach(smartdown.smartdownCells, async function(newCell, cellID) {
      // console.log('........newCell', id, newCell, newCell.cellBinding, cellID);

      if (id === newCell.cellBinding) {
        await renderCell(cellID, newCell.cellBinding, newValue);
      }
    });
  }
  else {
    lodashEach(smartdown.smartdownCells, async function(newCell, cellID) {
      const oldValue = smartdown.smartdownVariables[newCell.cellBinding];
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
                const newerValue = smartdown.smartdownVariables[varname];
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
            const newerValue = smartdown.smartdownVariables[varname];
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
  smartdown.smartdownVariables[id] = newValue;
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
  const oldValue = smartdown.smartdownVariables[id];

  if (force || !areValuesSameEnough(id, oldValue, newValue)) {
    changeVariable(id, newValue);
    updateProcesses(id, newValue);
  }
}


function ensureCells() {
  lodashEach(smartdown.smartdownCells, function(newCell, cellID) {
    const element = document.getElementById(cellID);
    if (!element) {
      // console.log('...ensureCells element for cellID not found', cellID, smartdown.smartdownCells[cellID]);
      delete smartdown.smartdownCells[cellID];
    }
  });
}


function ensureVariables() {
  lodashEach(smartdown.smartdownCells, function(newCell) {
    const oldValue = smartdown.smartdownVariables[newCell.cellBinding];
    changeVariable(newCell.cellBinding, oldValue);
  });
}

function resetVariables() {
  smartdown.smartdownVariables = {};
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
  if (smartdown.currentRenderDiv) {
    console.log('setSmartdown REENTRANCY FAIL', smartdown.currentRenderDiv.id, md.slice(0, 40));
  }
  else {
    smartdown.currentRenderDiv = outputDiv;
  }
  smartdown.currentBackpatches[outputDiv.id] = [];

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
              smartdown.smartdownVariables[varName] = value;
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

  smartdown.currentRenderDiv = null;

  function applyBackpatches(done) {
    const bp = smartdown.currentBackpatches[outputDiv.id];
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
  // console.log('applyBackpatches BEGIN', outputDiv.id, smartdown.currentRenderDiv);

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
        //  smartdown.smartdownVariables[lhs] = smartdown.smartdownVariables[lhs] || '';
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
        lodashEach(smartdown.smartdownVariables, function (v, k) {
          vars += ',' + k;
        });
        vars = vars.slice(1);
        const vals = lodashMap(smartdown.smartdownVariables, function (v) {
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
        // const oldValue = smartdown.smartdownVariables[lhs];
        // smartdown.smartdownVariables[lhs] = newValue;
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
  return smartdown.mediaRegistry[mediaKey];
}

module.exports = {
  initialize: initialize,
  configure: configure,
  perPageState: perPageState,
  expressionsRegistered: perPageState.expressionsRegistered,
  playablesRegistered: perPageState.playablesRegistered,
  playablesRegisteredOrder: perPageState.playablesRegisteredOrder,
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
  version: '1.0.67',
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
  currentRenderDiv: null,
  currentBackpatches: {},
  smartdownVariables: null,
  uniqueCellIndex: null,
  mediaRegistry: null,
};

// kick off the polyfill!
smoothscroll.polyfill();

window.smartdown = module.exports;

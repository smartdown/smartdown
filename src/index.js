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

import {loadExternal, ensureExtension} from './extensions';

import hljs from './render/hljs';
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
import partitionMultipart from './parse/partitionMultipart';
import expandStringWithSubstitutions from './util/expandStringWithSubstitutions';
import runFunction from './util/runFunction';
import enhanceMarkedAndOpts from './util/enhanceMarkedAndOpts';
import registerExpression from './util/registerExpression';
import computeExpressions from './util/computeExpressions';
import playPlayable from './util/playPlayable';
import registerPlayable from './util/registerPlayable';
import resetPlayable from './util/resetPlayable';
import runModule from './util/runModule';
import { consoleWrite, toggleConsole } from './util/console';
import { toggleDebug } from './util/debug';
import toggleKiosk from './util/toggleKiosk';

import { openFullscreen, closeFullscreen, isFullscreen } from './util/fullscreen';
import {
  showDisclosure,
  hideDisclosure,
  toggleDisclosure,
  deactivateOnMouseLeave,
  activateOnMouseLeave,
  linkWrapperExit,
} from './util/disclosable';

import renderCell from './render/renderCell';

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

const perPageState = {
  expressionsRegistered: {},
  playablesRegistered: {},
  playablesRegisteredOrder: [],
};

let cardLoading = false;

const smartdownScripts = [];
const smartdownScriptsMap = {};
const es6Playables = {};

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

function svgLoaded() {
  const sourceText = this.responseText;
  const svgMedia = smartdown.mediaRegistry[this.svgKey];
  svgMedia.svgData = sourceText;
  svgMedia.type = 'svginline';
}

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

      outputDiv.innerHTML = result;
      if (testing) {
        MathJax.Hub.Typeset(outputDiv);
        completeTypeset();
      }
      else {
        MathJax.Hub.Typeset(outputDiv, completeTypeset);
      }
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
  let numPending = 0;
  function buildCompletionHandler(lhs) {
    return (result) => {
      propagateChangedVariable(lhs, result);
      // changeVariable(lhs, result);
      if (--numPending === 0) {
        if (done) {
          done();
        }
      }
    };
  }

  if (lhss.length !== rhss.length || types.length !== lhss.length) {
    console('lhss.length !== rhss.length || types.length !== lhss.length', lhss.length, rhss.length, types.length);
  }
  else {

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
            calcHandler(calcKey, calcBody, buildCompletionHandler(lhs));
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
  version: '1.0.68',
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

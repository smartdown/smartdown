/* global smartdown */

import hljs from './hljs';

import playableTypes from '../playableTypes';
import getPrelude from '../parse/getPrelude';
import recursivelyLoadIncludes from '../parse/recursivelyLoadIncludes';

let uniquePlayableIndex = 0;

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
      uniquePlayableIndex,
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

export default function renderCode(code, languageString) {
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

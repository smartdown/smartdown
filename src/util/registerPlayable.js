/* global smartdown */

import playableTypes from '../playableTypes';
import playableArgNames from './playableArgNames';
// import {isExtensionRegistered, loadExternal, ensureExtension} from '../extensions';
import P5 from '../extensions/P5';
import Brython from '../extensions/Brython';
import FilamentExtension from '../extensions/Filament';
import React from '../extensions/React';
import Typescript from '../extensions/Typescript';
import OpenJSCAD from '../extensions/OpenJSCAD';

export default function registerPlayable(uniquePlayableIndex, prelude, language, renderDivId, divId, preId, dbgId, dbgToggleId, consoleId, consoleToggleId, functionId, playId, stopId, progressId, autoplay, isModule, code, transform, targetDivId) {
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

  smartdown.perPageState.playablesRegistered[divId] = {
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
    index: smartdown.perPageState.playablesRegisteredOrder.length,
    code: code,
    transform: transform,
    transformedCode: null,
    augmentedCode: augmentedCode,
    imports: imports,
    includes: includes,
    targetDivId: targetDivId,
  };

  smartdown.perPageState.playablesRegisteredOrder.push(smartdown.perPageState.playablesRegistered[divId]);

  return smartdown.perPageState.playablesRegistered[divId];
}

import lodashEach from 'lodash/forEach';

import globalState from './globalState';

export default function transformPlayables(outputDiv, done) {
  const playablesToTransform = [];
  if (window.godownTranslate) {
    lodashEach(globalState.playablesRegisteredOrder, function (playable) {
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


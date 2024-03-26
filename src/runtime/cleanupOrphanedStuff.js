import lodashEach from 'lodash/forEach';

import replaceArray from '../util/replaceArray';
import replaceObject from '../util/replaceObject';
import globalState from '../util/globalState';

export default function cleanupOrphanedStuff() {
  const newER = {};
  const expressions = globalState.expressionsRegistered;

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

  replaceObject(globalState.expressionsRegistered, newER);

  const newPRO = [];
  const newPR = {};

  lodashEach(globalState.playablesRegisteredOrder, function (playable) {
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

  replaceObject(globalState.playablesRegistered, newER);
  replaceArray(globalState.playablesRegisteredOrder, newPRO);
}

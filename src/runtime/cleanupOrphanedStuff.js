import lodashEach from 'lodash/forEach';

import replaceArray from '../util/replaceArray';
import replaceObject from '../util/replaceObject';
import globalState from '../util/globalState';

export default function cleanupOrphanedStuff(outputDiv) {
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
    // console.log(`cleanupOrphanedStuff/playable ${playable.divId} in ${outputDiv.id}`);
    const element1 = document.getElementById(playable.divId);

    if (element1) {
      if (outputDiv.id !== playable.rootDivId) {
        // console.log(`...cleanupOrphanedStuff/playable PRESERVING ${playable.divId} in ${outputDiv.id}`);
        newPRO.push(playable);
        newPR[playable.divId] = playable;
      }
      else {
        console.log(`...cleanupOrphanedStuff/playable DELETING ${playable.divId} in ${outputDiv.id}`);
      }
    }
    else {
      console.log(`...cleanupOrphanedStuff/playable NOTFOUND ${playable.divId} in ${outputDiv.id}`);
    }
  });

  replaceArray(globalState.playablesRegisteredOrder, newPRO);
  replaceObject(globalState.playablesRegistered, newPR);

  // console.log(`cleanupOrphanedStuff after replace ${JSON.stringify(globalState.playablesRegisteredOrder)}`);
}

/* global smartdown */

import expandStringWithSubstitutions from './expandStringWithSubstitutions';

export default function computeExpressions() {
  const expressions = smartdown.expressionsRegistered;
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

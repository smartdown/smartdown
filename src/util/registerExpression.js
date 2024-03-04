/* global smartdown */

import decodeInlineScript from '../parse/decodeInlineScript';

export default function registerExpression(cellIndex, labelText, lhss, rhss, manual) {
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
  smartdown.expressionsRegistered[exprId] = expr;

  return expr;
}

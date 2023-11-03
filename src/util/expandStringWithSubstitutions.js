/* global smartdown */

export default function expandStringWithSubstitutions(expr) {
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

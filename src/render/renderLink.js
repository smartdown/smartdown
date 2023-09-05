/* global smartdown */

import expandHrefWithLinkRules from '../util/expandHrefWithLinkRules';
import decodeInlineScript from '../parse/decodeInlineScript';

export default function renderLink(href, title, text) {
  const smartdownTag = ':';

  let useNewWindow = true;
  let expanded = expandHrefWithLinkRules(href, smartdown.linkRules);

  let forceNewWindow = false;
  const attrsIndex = expanded.lastIndexOf('#-');

  let attrs = '';
  if (attrsIndex >= 0) {
    attrs = expanded.slice(attrsIndex + '#-'.length);
    expanded = expanded.slice(0, attrsIndex);
    forceNewWindow = attrs === 'blank';
    // console.log('attrs', href, attrs, expanded, forceNewWindow);
  }

  if (expanded !== href) {
    href = expanded;
    useNewWindow = false || forceNewWindow;
    //
  }
  else if (href.indexOf('#') === 0) {
    useNewWindow = false || forceNewWindow;
  }
  else if (href.indexOf('http') !== 0) {
    useNewWindow = false || forceNewWindow;
  }
  else if (href.indexOf(smartdownTag) === 0) {
    // x
  }

  const titleAttr = title ? `title="${title}" ` : '';
  let linkHead = '<a ' + titleAttr +
                 ' class="smartdown-link" href="' +
                 href;
  if (useNewWindow) {
    linkHead += '" target="_blank" rel="noreferrer noopener">';
  }
  else {
    linkHead += '">';
  }

  const linkBody = text;
  const lowerhref = href.toLowerCase();
  const linkTail = '</a>';
  let result = linkHead + linkBody + linkTail;

  if (lowerhref.indexOf(smartdownTag) === 0) {
    let cellscript = decodeInlineScript(href.slice(smartdownTag.length));
    let op = null;
    let lhs = null;
    let rhs = null;

    if (cellscript.indexOf('?') === 0) {
      op = 'INPUT';
      lhs = cellscript.slice(1);
    }
    else if (cellscript.indexOf('-') === 0) {
      op = 'INPUTRANGE';
      lhs = cellscript.slice(1);
    }
    else if (cellscript.indexOf('X') === 0) {
      op = 'INPUTCHECKBOX';
      lhs = cellscript.slice(1);
    }
    else if (cellscript.indexOf('!') === 0) {
      op = 'GET';
      lhs = cellscript.slice(1);
    }
    else if (cellscript.indexOf('@') === 0) {
      op = 'GO';
      lhs = cellscript.slice(1);
    }
    else if (cellscript.indexOf('&') === 0) {
      op = 'DIV';
      lhs = cellscript.slice(1);
    }
    else if (cellscript.indexOf('=') === 0) {
      op = 'CALC';
      cellscript = cellscript.slice(1);
      const exprs = cellscript.split(';');
      if (exprs.length === 1) {
        const eqIndex = cellscript.indexOf('=');
        lhs = [cellscript.slice(0, eqIndex)];
        rhs = [cellscript.slice(eqIndex + 1)];
      }
      else {
        lhs = [];
        rhs = [];
        exprs.forEach((e) => {
          const eqIndex = e.indexOf('=');
          lhs.push(e.slice(0, eqIndex));
          rhs.push(e.slice(eqIndex + 1));
        });
      }
      // console.log('lhs/rhs', lhs, rhs);
    }
    else if (cellscript.indexOf('/') === 0) {
      const parts2 = cellscript.split('@');
      op = parts2[0];
      lhs = parts2[1];
    }
    else if (cellscript.indexOf(':') === 0) {
      op = 'REVEAL';
      cellscript = cellscript.slice(1);
      if (cellscript.indexOf('/') >= 0) {
        const parts = cellscript.split('/');
        lhs = parts[0];
        rhs = parts.slice(1).join(',');
      }
      else {
        lhs = cellscript;
      }
    }

    let newHTML = '';
    const hasLabel = !!(text && text.length > 0);
    if (op === 'INPUT') {
      smartdown.uniqueCellIndex++;
      const inputCellId = 'INPUT' + smartdown.uniqueCellIndex;
      const inputCellIdParts = lhs.split(/[|!]/g);
      let inputType = 'text';
      let liveBlur = false;
      if (inputCellIdParts.length > 1) {
        lhs = inputCellIdParts[0];
        inputType = inputCellIdParts[1];
      }
      else {
        liveBlur = true;
      }

      smartdown.smartdownCells[inputCellId] = {
        cellBinding: lhs,
        cellID: inputCellId,
        cellType: 'input',
        datatype: inputType
      };

      if (hasLabel) {
        newHTML += '<span class="infocell-group">\n';

        newHTML += '<span class="infocell-group-addon"><span class="infocell-label">' + decodeURIComponent(text) + '</span></span>';
        if (inputType === 'number') {
          newHTML += '<input type="number" class="infocell-input"';
        }
        else {
          newHTML += '<textarea rows="1" type="text" class="infocell-textarea"';
        }
      }
      else if (inputType === 'number') {
        newHTML += '<input type="number" class="infocell-input"';
      }
      else {
        newHTML += '<textarea rows="1" type="text" class="infocell-textarea"';
      }

      if (inputType === 'number' || !liveBlur) {
        newHTML += ' onblur="smartdown.setVariable(\'' + lhs + '\', this.value, \'' + inputType + '\')"';
      }
      else {
        newHTML += ' onkeyup="smartdown.setVariable(\'' + lhs + '\', this.value, \'' + inputType + '\')"';
      }
      newHTML += ' id="' + inputCellId + '"';
      // newHTML += ' placeholder="' + decodeURIComponent(text) + '" aria-describedby="' + lhs + '"';
      newHTML += '>';

      if (inputType === 'number') {
        newHTML += '\n';
      }
      else {
        newHTML += '</textarea>\n';
      }

      if (hasLabel) {
        newHTML += '</span>';
      }
    }
    else if (op === 'INPUTRANGE') {
      smartdown.uniqueCellIndex++;
      const inputRangeCellId = 'INPUTRANGE' + smartdown.uniqueCellIndex;

      const lhsElements = lhs.split('/');
      lhs = lhsElements[0];

      let min = lhsElements[1];
      let max = lhsElements[2];
      let step = lhsElements[3];

      min = (min && min.length > 0) ? min : 0.0;
      max = (max && max.length > 0) ? max : 100.0;
      step = (step && step.length > 0) ? step : 1.0;

      smartdown.smartdownCells[inputRangeCellId] = {
        cellBinding: lhs,
        cellID: inputRangeCellId,
        cellType: 'inputrange',
        datatype: 'number'
      };

      if (hasLabel) {
        newHTML += '<span class="infocell-group">\n';
        newHTML += '<span class="infocell-group-addon" id="' + lhs + '"><span class="infocell-label">' + decodeURIComponent(text) + '</span></span>';
      }

      // <input type="range" min="5" max="10" step="0.01">
      newHTML += '<input type="range"';
      newHTML += ' class="infocell-input-range"';
      newHTML += ' style="width:40%;"';
      newHTML += ' min="' + min + '"';
      newHTML += ' max="' + max + '"';
      newHTML += ' step="' + step + '"';
      newHTML += ' id="' + inputRangeCellId + '"';
      newHTML += ' oninput="smartdown.setVariable(\'' + lhs + '\', this.valueAsNumber, \'number\')"';
      newHTML += '</input>';
      if (hasLabel) {
        newHTML += '</span>';
      }
    }
    else if (op === 'INPUTCHECKBOX') {
      smartdown.uniqueCellIndex++;
      const inputCheckboxCellId = 'INPUTCHECKBOX' + smartdown.uniqueCellIndex;

      smartdown.smartdownCells[inputCheckboxCellId] = {
        cellBinding: lhs,
        cellID: inputCheckboxCellId,
        cellType: 'inputcheckbox',
        datatype: 'boolean'
      };

      if (hasLabel) {
        newHTML += '<span class="infocell-group">\n';
        newHTML += '<span class="infocell-group-addon" id="' + lhs + '"><span class="infocell-label">' + decodeURIComponent(text) + '</span></span>';
      }

      newHTML += '<input class="smartdown-checkbox" type="checkbox"';
      newHTML += ' id="' + inputCheckboxCellId + '"';
      newHTML += ' onchange="smartdown.setVariable(\'' + lhs + '\', this.checked, \'boolean\')"';
      newHTML += '</input>';
      if (hasLabel) {
        newHTML += '</span>';
      }
    }
    else if (op === 'CALC') {
      ++smartdown.uniqueCellIndex;
      const manualInvoke = hasLabel;
      if (hasLabel) {
        text = text.replace(/<code class="hljs-inline">(.+)<\/code>/g, '`$1`');
      }
      const expr = smartdown.registerExpression(smartdown.uniqueCellIndex, text, lhs, rhs, hasLabel);
      if (manualInvoke) {
        newHTML +=
`<button
  class="btn-infocell btn-infocell-calc"
  onclick="smartdown.computeStoredExpression('${expr.exprId}')">
  <span id="${expr.labelId}">${decodeURIComponent(expr.labelText)}</span>
</button>`;
      }
      else {
        newHTML += `<span style="display:none;" id="${expr.labelId}"></span>`;
      }
    }
    else if (op === 'GO') {
      newHTML += '<button class="btn-infocell btn-infocell-go" onclick="smartdown.goToCard(\'' +
      lhs +
      '\', event, \'' +
      smartdown.currentRenderDiv.id +
      '\')">' +
      decodeURIComponent(text) +
      '</button>';
    }
    else if (op === 'DIV') {
      if (hasLabel) {
        newHTML += '<span class="infocell-group">\n';
        if (text && text.length > 0) {
          newHTML += '<span class="infocell-group-addon infocell-group-inline"><span class="infocell-label">' + decodeURIComponent(text) + '</span></span>';
        }
      }

      newHTML +=
`<span
  class="smartdown-playable inline-target-div"
  id="inline-target-${lhs}">
</span>
`;
    }
    else if (op === 'GET') {
      smartdown.uniqueCellIndex++;
      const outputCellId = 'OUTPUT_' + smartdown.uniqueCellIndex;

      const outputCellIdParts = lhs.split(/[|!]/g);
      let outputType = 'text';
      let flavors = '';
      if (outputCellIdParts.length > 1) {
        lhs = outputCellIdParts[0];
        outputType = outputCellIdParts[1];
        if (outputType === '') {
          outputType = 'text';
        }
        const tmp = outputCellIdParts.slice(2);
        tmp.unshift('');
        flavors = tmp.join(' smartdown-flavor-');
      }

      smartdown.smartdownCells[outputCellId] = {
        cellBinding: lhs,
        cellID: outputCellId,
        cellType: 'output',
        datatype: outputType
      };

      if (hasLabel) {
        newHTML += '<span class="infocell-group">\n';
        if (text && text.length > 0) {
          newHTML += '<span class="infocell-group-addon"><span class="infocell-label">' + decodeURIComponent(text) + '</span></span>';
        }
      }

      const smartdownClass = 'smartdown-' + outputType;

      // DRY this up. It's stupidly repetitive
      if (
        outputType !== '' &&
        outputType !== 'text' &&
        outputType !== 'markdown' &&
        outputType !== 'url') {
        newHTML += `<div class="infocell-output ${smartdownClass} ${flavors}" id="${outputCellId}"></div>`;
      }
      else {
        newHTML += `<span class="infocell-output ${smartdownClass} ${flavors}" id="${outputCellId}"></span>`;
      }
      if (hasLabel) {
        newHTML += '</span>';
      }
    }
    else if (op === 'REVEAL') {
      smartdown.uniqueCellIndex++;
      const body = decodeURIComponent(text);

      if (rhs === null) {
        rhs = 'button';
      }
      const settings = rhs.split(',');
      if (settings.includes('link') || settings.includes('tooltip')) {
        rhs = 'link';
      }
      else {
        rhs = 'button';
      }
      let settingsStr = '';
      if (settings.length >= 1) {
        settingsStr = settings.join(',');
      }

      if (rhs === 'button') {
        newHTML += `<button
                  id="trigger_${lhs}"
                  class="btn-infocell disclosable-trigger-button"
                  onclick="smartdown.toggleDisclosure('${lhs}', 'trigger_${lhs}', '${settingsStr}');">
                  <span id="span_${lhs}_closed">${body}</span>
                  <span id="span_${lhs}_opened" style="display: none">${body}</span>
                  </button>`;
      }
      else if (rhs === 'link') {
        newHTML += `<span
                      class="disclosable-trigger-tooltip-wrapper"
                      onmouseleave="smartdown.linkWrapperExit('${lhs}', '${settingsStr}');">
                    <a
                      id="trigger_${lhs}_${smartdown.uniqueCellIndex}"
                      class="disclosable-trigger-tooltip"
                      onmouseenter="smartdown.showDisclosure('${lhs}', 'trigger_${lhs}_${smartdown.uniqueCellIndex}', '${settingsStr}');">
                      ${body}
                    </a></span>`;
      }
    }

    result = newHTML;
  }

  return result;
}

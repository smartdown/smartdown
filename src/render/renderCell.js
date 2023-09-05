/* global smartdown */

import entityEscape from './entityEscape';
import {ensureExtension} from '../extensions';
import renderABCIntoDivs from './renderABCIntoDivs';
import OpenJSCAD from '../extensions/OpenJSCAD';
import Mermaid from '../extensions/Mermaid';
import graphvizImages from '../extensions/Graphviz';

export default async function renderCell(cellID, variableId, newValue) {
  const cellInfo = smartdown.smartdownCells[cellID];

  const element = document.getElementById(cellID);
  // console.log('renderCell', cellInfo, newValue, element, element.type, element.tagName, cellInfo.cellType, cellInfo.datatype, s);
  let s = JSON.stringify(newValue, null, 2);
  if (s) {
    s = s.slice(0, 20);
  }

  if (!element) {
    console.log('...renderCell cellID not found', cellID, variableId, newValue);
  }
  else if (element.type === 'checkbox') {
    element.checked = !!newValue;
  }
  else if (cellInfo.cellType === 'inputrange') {
    element.value = newValue;
  }
  else if (cellInfo.datatype === 'code') {
    if (newValue === undefined) {
      element.innerHTML = '';
    }
    else {
      element.innerHTML = '<pre class="infocell-output-pre">' + entityEscape(newValue) + '</pre>';
    }
  }
  else if (cellInfo.datatype === 'json') {
    if (newValue === undefined) {
      element.innerHTML = '';
    }
    else {
      const stringified = JSON.stringify(newValue, null, 2);
      const escaped = entityEscape(stringified, true);
      // console.log('stringified', stringified);
      element.innerHTML = '<pre class="infocell-output-pre">' + escaped + '</pre>';
    }
  }
  else if (cellInfo.datatype === 'url') {
    element.innerHTML = `<a target="_blank" rel="noreferrer noopener" href="${newValue}" style="word-break:break-all;font-size:0.9em;line-height:1.15em;">${newValue}</a>`;
  }
  else if (cellInfo.datatype === 'markdown') {
    if (typeof newValue === 'string') {
      smartdown.setSmartdown(newValue, element);
    }
    else {
      element.innerHTML = '';
    }
  }
  else if (cellInfo.datatype === 'openjscad') {
    const divId = cellInfo.cellID;
    if (typeof newValue !== 'string') {
      element.innerHTML = '';
    }
    else {
      ensureExtension('openjscad', async function() {
        const innerHTML = OpenJSCAD.generateInnerHTML(divId);
        element.innerHTML = innerHTML;
        const augmentedCode = OpenJSCAD.generateAugmentedPlayable(divId, newValue);
        // console.log('augmentedCode');
        // console.log(augmentedCode);

        const asyncAugmentedCode =
`
return (async () => {
  ${augmentedCode}
})();
`;
        /* eslint-disable-next-line no-new-func */
        // eslint-disable-next-line @typescript-eslint/no-implied-eval
        const func = new Function([], asyncAugmentedCode);

        try {
          await func.apply(this, [null]);
        }
        catch (e) {
          console.log('###runFunction catch func.apply()', e);
          element.innerHTML = `<b># Error evaluating OpenJSCAD cell: ${e}</b>`;
        }
      });
    }

  }
  else if (cellInfo.datatype.indexOf('abc') === 0) {
    const abcBaseId = element.id;
    element.innerHTML =
`
  <div class="abc-wrapper">
    <div
      id="${abcBaseId}-sheet"
      class="smartdown-abcsheet">
    </div>
    <div
      id="${abcBaseId}-midi"
      class="smartdown-abcmidi">
    </div>
  </div>
`;

    if (typeof newValue === 'string' && newValue.length > 0) {
      ensureExtension(
        'abc',
        function () {
          renderABCIntoDivs(abcBaseId, cellInfo.datatype, newValue);
        });
    }
  }
  else if (cellInfo.datatype === 'graphviz') {
    element.innerHTML = '';
    if (typeof newValue === 'string' && newValue.length > 0) {
      window.smartdownJSModules.graphviz.loader(function () {
        const options = {
          images: graphvizImages
        };
        (new window.Viz()).renderString(newValue, options).then((result) => {
          element.innerHTML = result;
        });
      });
    }
  }
  else if (cellInfo.datatype === 'svg') {
    element.innerHTML = newValue;
  }
  else if (cellInfo.datatype === 'mermaid') {
    if (newValue === undefined) {
      element.innerHTML = '';
    }
    else {
      Mermaid.mermaidRender(element, newValue);
    }
  }
  else if (Array.isArray(newValue)) {
    // console.log('array', newValue, newValue.elementType);
    const isImage = newValue.elementType === 'image';
    const isURLTitle = newValue.elementType === 'title/url';
    let elementList = '<ul class="infocell-output-list">';
    for (let elementIndex = 0; elementIndex < newValue.length; ++elementIndex) {
      const newElement = newValue[elementIndex];
      if (isImage) {
        elementList += '<li><img src="' + newElement + '"></li>';
      }
      else if (isURLTitle) {
        elementList += '<li><a target="_blank" rel="noreferrer noopener" href="' + newElement.url + '">' + newElement.title + '</a></li>';
      }
      else if (typeof newElement === 'string') {
        elementList += '<li>' + newElement + '</li>';
      }
      else {
        elementList += `<li><pre class="infocell-output-pre">${JSON.stringify(newElement, null, 2)}</pre></li>`;
      }
    }
    elementList += '</ul>';
    element.innerHTML = elementList;
  }
  else if (typeof newValue === 'object') {
    element.innerHTML = '<pre class="infocell-output-pre">' + JSON.stringify(newValue, null, 2) + '</pre>';
    // element.value = newValue;
  }
  else if (typeof newValue === 'string' && newValue.indexOf('https://upload.wikimedia.org') === 0) {
    element.innerHTML = '<img src="' + newValue + '">';
  }
  else if (newValue === undefined) {
    element.innerHTML = '';
  }
  else if (element.tagName === 'TEXTAREA') {
    element.value = newValue; // newValue.replace('\n', '<br>');
  }
  else if (typeof newValue === 'string') {
    element.innerHTML = entityEscape(newValue); // .replace(/\n/g, '<br>');
  }
  else {
    element.innerHTML = newValue; //  = newValue.replace(/\n/g, '<br>');
    element.value = newValue; //  = newValue.replace(/\n/g, '<br>');
  }
}

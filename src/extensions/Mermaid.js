/* global window */
/* global useMermaid */

var Mermaid = {
  mermaid: null,
  mermaidRender: null
};

function fixupMermaidSVG(svgCode) {
  svgCode = svgCode.replace(/\n/g, '');
  var beginStyleTag = '<style>';
  var endStyleTag = '</style>';

  var beginStyle = svgCode.indexOf(beginStyleTag);
  var endStyle = svgCode.indexOf(endStyleTag);
  var svgStyle = svgCode.slice(beginStyle + beginStyleTag.length, endStyle).trim();
  var svgStyleLines = svgStyle.split(/}/g);
  --svgStyleLines.length; // Assumes last element is ''
  var svgNewStyleLines = svgStyleLines.map(function (line) {
    var bracePos = line.indexOf('{');
    var selectors = line.slice(0, bracePos);
    var body = line.slice(bracePos);
    var selectorsNew = selectors.replace(/,/g, ',.mermaid ');
    selectorsNew = '.mermaid ' + selectorsNew;
    selectorsNew = selectorsNew.replace(/.mermaid .mermaid/g, '.mermaid');

    var newLine = selectorsNew + body;
    return newLine;
  });
  var svgNewStyle = beginStyleTag + svgNewStyleLines.join('}') + endStyleTag;
  svgCode =   svgCode.slice(0, beginStyle) +
              svgNewStyle +
              svgCode.slice(endStyle + endStyleTag.length);
  return svgCode;
}

function mermaidRender(div, code) {
  if (Mermaid.mermaid) {
    div.classList.add('mermaid');
    Mermaid.mermaid.render(
      div.id + '_svg',
      code,
      function (svgCode) {
        var svgCodeNew = fixupMermaidSVG(svgCode);
        div.innerHTML = svgCodeNew;
      },
      div
    );
  }
  else {
    div.innerHTML = 'mermaidjs not loaded';
  }
}

if (useMermaid) {
  function initializeMermaid() {
    Mermaid.mermaid = window.mermaid;
    Mermaid.mermaidRender = mermaidRender;

    var config = {
      startOnLoad: false,
      cloneCssStyles: false,
      logLevel: 3,
      // theme: 'dark',
      // logLevel , decides the amount of logging to be used.
      //    * debug: 1
      //    * info: 2
      //    * warn: 3
      //    * error: 4
      //    * fatal: 5

      htmlLabels: true,
      fontSize: 16,
      flowchart: {
        htmlLabels: true,
        useMaxWidth: false,
      },
      sequenceDiagram: {
        diagramMarginX: 50,
        diagramMarginY: 20,
        actorMargin: 40,
        width: 120,
        height: 40,
        boxMargin: 20,
        boxTextMargin: 5,
        noteMargin: 5,
        messageMargin: 55,
        mirrorActors: false,
        bottomMarginAdj: 0,
        useMaxWidth: false,
      },
      ganttchart: {
        titleTopMargin: 15,
        diagramMarginX: 10,
        diagramMarginY: 10,
        barHeight: 20,
        barGap: 4,
        topPadding: 50,
        sidePadding: 75,
        gridLineStartPadding: 35,
        fontSize: 16,
        numberSectionStyles: 3,
        useMaxWidth: false,
        // axisFormatter: [
        //   // Within a day
        //   ['%I:%M', function (d) {
        //     return d.getHours();
        //   }],
        //   // Monday a week
        //   ['w. %U', function (d) {
        //     return d.getDay() === 1;
        //   }],
        //   // Day within a week (not monday)
        //   ['%a %d', function (d) {
        //     return d.getDay() && d.getDate() !== 1;
        //   }],
        //   // within a month
        //   ['%b %d', function (d) {
        //     return d.getDate() !== 1;
        //   }],
        //   // Month
        //   ['%m-%y', function (d) {
        //     return d.getMonth();
        //   }]
        // ]
      }
    };

    Mermaid.mermaid.initialize(config);
  }

  function loadMermaid(loaded) {
    // console.log('loadMermaid...', window.smartdownJSModules.mermaid.loadedCallbacks.length, loaded, JSON.stringify(window.smartdownJSModules.mermaid.loadedCallbacks, null, 2));
    if (window.smartdownJSModules.mermaid.loaded) {
      loaded();
    }
    else if (window.smartdownJSModules.mermaid.loadedCallbacks.length > 0) {
      window.smartdownJSModules.mermaid.loadedCallbacks.unshift(loaded);
      // console.log('loadmermaid...mermaid is still loading', JSON.stringify(window.smartdownJSModules.mermaid.loadedCallbacks, null, 2));
    }
    else {
      window.smartdownJSModules.mermaid.loadedCallbacks.unshift(loaded);

      const url = 'https://unpkg.com/mermaid@7.1.2/dist/mermaid.min.js';
      window.smartdown.importScriptUrl(
        url,
        function(script) {
          /* global Mermaid */

          // mermaid = window.mermaid;
          // console.log('mermaidPackage', mermaidPackage);
          // Object.keys(mermaidPackage).forEach(slot => {
          //   // console.log('...slot', slot, mermaidPackage[slot]);
          //   Mermaid[slot] = mermaidPackage[slot];
          // });

          initializeMermaid();

          const callThese = window.smartdownJSModules.mermaid.loadedCallbacks;
          window.smartdownJSModules.mermaid.loadedCallbacks = [];
          callThese.forEach(loadedCb => {
            loadedCb();
          });
        });
    }
  }

  window.smartdownJSModules.mermaid = {
    loader: loadMermaid,
    loaded: null,
    loadedCallbacks: []
  };
}

module.exports = Mermaid;

/* global useP5JS */

const P5UserFunctions = require('./P5UserFunctions');
const P5SystemVars = require('./P5SystemVars');
const P5LoaderPrototypeInfo = require('./P5LoaderPrototypeInfo');

var P5 = {
  Loader: {},
  VarDefs: null,
  UserFunctionDefs: null,
  SystemVarDecls: null,
  SystemVarUpdates: null,
  SystemVarDefs: null,
};

function loadP5JS(loaded) {
  // console.log('loadP5JS...', loaded, JSON.stringify(window.smartdownJSModules.p5js.loadedCallbacks, null, 2));
  if (window.smartdownJSModules.p5js.loaded) {
    loaded();
  }
  else if (window.smartdownJSModules.p5js.loadedCallbacks.length > 0) {
    window.smartdownJSModules.p5js.loadedCallbacks.push(loaded);
    // console.log('loadP5JS...p5js is still loading', JSON.stringify(window.smartdownJSModules.p5js.loadedCallbacks, null, 2));
  }
  else {
    window.smartdownJSModules.p5js.loadedCallbacks.push(loaded);
    // console.log('loadP5JS...p5js initiate load', window.smartdownJSModules.p5js.loadedCallbacks[0]);

    import(/* webpackChunkName: "p5js" */ 'p5JS')
      .then(p5js => {
        window.smartdownJSModules.p5js.loaded = p5js;
        P5.Loader = p5js.default;

        window.p5js = p5js;
        window.P5 = P5.Loader;
        window.p5 = P5.Loader;

        import(/* webpackChunkName: "p5Sound" */ 'p5/lib/addons/p5.sound.min.js')
          .then(() => {

            // for (const f in P5.Loader.prototype) {
            //   console.log(f, typeof P5.Loader.prototype[f]);
            // }

            const callThese = window.smartdownJSModules.p5js.loadedCallbacks;
            window.smartdownJSModules.p5js.loadedCallbacks = [];
            callThese.forEach(loadedCb => {
              loadedCb();
            });
          })
          .catch(error => {
            console.log('loadP5Sound error', error);
          });

        // import(/* webpackChunkName: "p5DOM" */ 'p5/lib/addons/p5.dom.min.js')
        //   .then(p5DOM => {
        //     import(/* webpackChunkName: "p5Sound" */ 'p5/lib/addons/p5.sound.min.js')
        //       .then(p5Sound => {

        //         const callThese = window.smartdownJSModules.p5js.loadedCallbacks;
        //         window.smartdownJSModules.p5js.loadedCallbacks = [];
        //         callThese.forEach(loadedCb => {
        //           loadedCb();
        //         });
        //       })
        //       .catch(error => {
        //         console.log('loadP5Sound error', error);
        //       });
        //   })
        //   .catch(error => {
        //     console.log('loadP5DOM error', error);
        //   });
      })
      .catch(error => {
        console.log('loadP5JSerror', error);
      });
  }
}


if (useP5JS) {
  var isTesting = (typeof process === 'object' && process.env.TEST_RUN);
  if (isTesting) {
    document.hasFocus = document.hasFocus ||
      function () {
        return false;
      };
    // require('./webaudio-mocks.js');
  }

  window.smartdownJSModules.p5js = {
    loader: loadP5JS,
    loaded: null,
    loadedCallbacks: []
  };

  var implicitP5VarDefs = [];

  for (const f in P5LoaderPrototypeInfo) {
    if (f.indexOf('_') !== 0) {
      if (P5SystemVars.indexOf(f) !== -1) {
        // console.log('Skipping ', f);
      }
      else {
        const val = P5LoaderPrototypeInfo[f];
        // console.log('...f', f, P5.Loader[f], val);
        if (val === 'function') {
          if (f === 'loadFont') {
            const loadFontWrapper =
              `
              function loadFontWrapper(p5, path, callback, onError) {
                return p5.loadFont(path, callback, onError);
              }
              const loadFont = loadFontWrapper.bind(p5, p5);
              `;
            implicitP5VarDefs.push(loadFontWrapper);
          }
          else if (f === 'createCanvas') {
            const createCanvasWrapper =
              `
              function createCanvasWrapper(p5, w, h, renderer) {
                //console.log('in createCanvasWrapper', w, h, renderer);
                p5.createCanvas(w, h, renderer);
                width = p5.width;
                height = p5.height;
              }
              const createCanvas = createCanvasWrapper.bind(p5, p5);
              `;
            implicitP5VarDefs.push(createCanvasWrapper);
          }
          else {
            // console.log('...', f);
            // implicitP5VarDefs.push(`console.log('p5.${f}', p5.${f}, typeof p5.${f});const ${f} = p5.${f}.bind(p5);`);
            implicitP5VarDefs.push(`const ${f} = p5.${f}.bind(p5);`);
          }
        }
        else {
          implicitP5VarDefs.push('const ' + f + ' = p5.' + f + ';');
        }
      }
    }
  }
  P5.VarDefs = implicitP5VarDefs.join('\n');

  var implicitP5SystemVarDecls = [];
  var implicitP5SystemVarUpdates = [];
  var implicitP5SystemVarDefs = [];
  P5SystemVars.forEach(f => {
    implicitP5SystemVarDecls.push(`var ${f};`);
    implicitP5SystemVarUpdates.push(`${f} = p5.${f};`);
    implicitP5SystemVarDefs.push(`const ${f} = p5.${f};`);
  });

  P5.SystemVarDecls = implicitP5SystemVarDecls.join('\n');
  P5.SystemVarUpdates = implicitP5SystemVarUpdates.join('');
  P5.SystemVarDefs = implicitP5SystemVarDefs.join('');

  var implicitP5UserFunctionDefs = [];
  P5UserFunctions.forEach(f => {
    const userFunctionSource =
      `if (typeof ${f} === 'function') {
        p5.${f} = function(p5, ${f}) {
          ${P5.SystemVarUpdates}

          ${f}();
        };
        p5.${f} = p5.${f}.bind(this, p5, ${f});
      }`;

    implicitP5UserFunctionDefs.push(userFunctionSource);
  });

  P5.UserFunctionDefs = implicitP5UserFunctionDefs.join('\n');

  // console.log('implicitP5SystemVarDecls', implicitP5SystemVarDecls);
  // console.log('P5.SystemVarDecls', P5.SystemVarDecls);
  // console.log('P5.SystemVarUpdates', P5.SystemVarDecls);
  // console.log('P5.SystemVarDefs', P5.SystemVarDefs);
  // console.log('P5.UserFunctionDefs', P5.UserFunctionDefs);
}


module.exports = P5;

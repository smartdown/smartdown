import {registerExtension} from 'extensions';
/* global smartdown */
/* global Filament */

const FilamentExtension = {
};


function augmentFilament() {
  Filament.applyResult = async function(ret, sdPlayable, sdThis) {
    // console.log('applyResult', ret, sdPlayable, sdThis);
    if (typeof ret === 'undefined' || ret === null) {
      smartdown.consoleWrite(sdPlayable, ['Filament.eval_code() returns undefined']);
    }
    else if (typeof ret === 'object') {
      if (typeof ret.cb === 'function') {
        const canvasId = sdThis.div.id + '_canvas';
        sdThis.div.innerHTML =
        `
        <canvas
          id="${canvasId}"
          style="display: block; margin: auto;"
          xwidth="300"
          height="300"></canvas>
        `;
        const canvas = document.getElementById(canvasId);
        await ret.cb(canvas);
      }
      else {
        smartdown.consoleWrite(sdPlayable, [ret]);
        if (ret.toString) {
          smartdown.consoleWrite(sdPlayable, [ret.toString()]);
        }
      }
    }
    else {
      smartdown.consoleWrite(sdPlayable, ['Filament.eval_code() returns ', typeof ret, ret]);
    }
  };

  Filament.addSmartdownFunctionsToScope = function(localScope, sdPlayable, sdThis) {
    localScope.install(new Filament.FilamentFunctionWithScope(
      'print',
      {
        msg: Filament.REQUIRED
      },
      function (scope, msg) {
        smartdown.consoleWrite(sdPlayable, [msg]);
      }
    ));

    localScope.install(new Filament.FilamentFunctionWithScope(
      'sd_set',
      {
        name: Filament.REQUIRED,
        value: Filament.REQUIRED
      },
      function (scope, name, value) {
        // console.log('sd_set', name, value, '' + name, '' + value);
        smartdown.setVariable(name.value, value.value);
      }
    ));

    localScope.install(new Filament.FilamentFunctionWithScope(
      'sd_get',
      {
        name: Filament.REQUIRED
      },
      function (scope, name) {
        return Filament.string(smartdown.smartdownVariables[name.value]);
      }
    ));

    localScope.install(new Filament.FilamentFunctionWithScope(
      'sd_watch',
      {
        name: Filament.REQUIRED,
        handler: Filament.REQUIRED
      },
      (scope, name, handler) => {
        sdThis.dependOn[name.value] = async () => {
          const ret = await handler.fun(Filament.string(smartdown.smartdownVariables[name.value]));
          await Filament.applyResult(ret, sdPlayable, sdThis);
        };
      }
    ));
  };
}


FilamentExtension.register = function register() {
  registerExtension(
    'filament',
    [
      // 'https://unpkg.com/filament-lang/dist/filament.js',
      'smartdownBase:lib/filament.js',
      // 'https://localhost:8989/filament.js',
      augmentFilament,
    ]);
};


FilamentExtension.generateAugmentedPlayable = function(isModule, code) {
  let augmentedCode;

  if (isModule) {
    console.log('FilamentExtension.generateAugmentedPlayable isModule==true not yet implemented');
  }
  else {
    augmentedCode =
`(async () => {
const filamentSource =
\`${code}\`;

if (typeof Filament === 'object') {
  const localScope = Filament.make_standard_scope();
  Filament.addSmartdownFunctionsToScope(localScope, playable, this);

  const ret = await Filament.parseAndEvalWithScope(filamentSource, localScope);
  await Filament.applyResult(ret, playable, this);
}
else {
  const errorMsg = 'Filament is not defined.\\nProbably due to debugging or some failure to load the Filament library';
  this.log(errorMsg);
}
})();`;
    return augmentedCode;
  }
};

module.exports = FilamentExtension;

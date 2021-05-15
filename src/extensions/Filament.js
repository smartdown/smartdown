import {registerExtension} from 'extensions';

const Filament = {
};


Filament.register = function register() {
  registerExtension(
    'filament',
    [
      // 'https://unpkg.com/filament-lang@0.4.3/dist/filament.js',
      'smartdownBase:lib/filament.js',
    ]);
};



Filament.generateAugmentedPlayable = function(divId, isModule, code) {
  let augmentedCode;

  if (isModule) {
    console.log('Filament.generateAugmentedPlayable isModule==true not yet implemented');
  }
  else {
    const filamentScriptId = divId + '_filament';
    augmentedCode =
`
(async () => {
const filamentSource =
\`${code}\`;

const div = document.getElementById("${divId}");

// const smartdownPlayableContext = {
//   smartdown: smartdown,
//   divId: "${divId}",
//   div: div,
//   this: this,
//   env: env
// };

if (typeof Filament === 'object') {
  await Filament.setup_parser()

  const ret = await Filament.eval_code(filamentSource);
  if (typeof ret.cb === 'function') {
    const canvasId = div.id + '_canvas';
    div.innerHTML =
    \`
    <canvas
      id="\${canvasId}"
      style="display: block; margin: auto;"
      width="800"
      height="800"></canvas>
    \`;
    const canvas = document.getElementById(canvasId);
    await ret.cb(canvas);
  }
  else {
    smartdown.consoleWrite(playable, [ret]);
    smartdown.consoleWrite(playable, [ret.toString()]);
  }
}
else {
  const errorMsg = 'Filament is not defined. Probably due to debugging or some failure to load the Filament library';
  console.log(errorMsg);
  div.innerHTML = '<h4>' + errorMsg + '</h4>';
}
})();
`;
    return augmentedCode;
  }
};

module.exports = Filament;

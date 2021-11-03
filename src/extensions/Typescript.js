import {registerExtension} from 'extensions';

const Typescript = {
  register() {
    registerExtension(
      'typescript',
      [
        'https://cdn.jsdelivr.net/npm/typescript/lib/typescript.min.js',
      ]);
  },

  generateAugmentedPlayable(divId, isModule) {
    let augmentedCode;

    if (isModule) {
      augmentedCode =
`// Augmented TypeScript Code to be transpiled.

const asyncWrapper =
\`
\${playable.code}
if (typeof start !== 'undefined') {
  smartdown.es6Playables['${divId}'].start = start;
}
\`;

let result = window.ts.transpileModule(
  asyncWrapper,
  {
    compilerOptions: {
      esModuleInterop: true,
      // allowUmdGlobalAccess: true,
      // alwaysStrict: true,
      isolatedModules: true,
      module: 'es6',
      target: 'es6',
      allowJs: true,
      checkJs: true,
      diagnostics: true,
      extendedDiagnostics: true,
  },
  reportDiagnostics: true,
});

if (result.diagnostics.length > 0) {
  result.diagnostics.forEach(d => {
    this.log('# ' + d.messageText);
  });
}
else {
  playable.augmentedCode = result.outputText;

  const argValues = [
    playable,
    smartdown.smartdownVariables,
    smartdown.P5Loader,
    window.d3,
    window.d3fc,
    window.d3dc,
    window.topojson,
    window.Plotly,
    window.Leaflet,
    window.Stdlib,
    window.THREE,
    smartdown,
    {}    // This will be a p5 obj in the case of using P5.Loader
  ];

  const embedResult = smartdown.runModule(playable, argValues, 'typescript');
}

`;
    }
    else {
      augmentedCode =
`// Augmented TypeScript Code to be transpiled.

const asyncWrapper =
\`
const outerThis = this;
return (async function() {
\${playable.code}
}).call(outerThis);
\`;

let result = window.ts.transpileModule(
  asyncWrapper,
  {
    compilerOptions: {
      // esModuleInterop: true,
      // allowUmdGlobalAccess: true,
      alwaysStrict: true,
      // isolatedModules: true,
      module: 'commonjs',
      target: 'es6',
      allowJs: true,
      checkJs: true,
      diagnostics: true,
      extendedDiagnostics: true,
  },
  reportDiagnostics: true,
});

if (result.diagnostics.length > 0) {
  result.diagnostics.forEach(d => {
    this.log('# ' + d.messageText);
  });
}

return smartdown.runFunction(result.outputText, this, [...arguments], 'typescript', this.div);
`;
    }
    return augmentedCode;
  }
}

export default Typescript;

import {registerExtension} from 'extensions';

const Typescript = {
  register() {
    registerExtension(
      'typescript',
      [
        'https://cdn.jsdelivr.net/npm/typescript/lib/typescript.min.js',
      ]);
  },

  generateAugmentedPlayable() {
    const augmentedCode =
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
      // alwaysStrict: true,
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
    console.log('# ' + d.messageText);
  });
}

return smartdown.runFunction(result.outputText, this, [...arguments], 'typescript', this.div);
`;

    return augmentedCode;
  }
}

export default Typescript;

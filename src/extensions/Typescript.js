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
      module: window.ts.ModuleKind.CommonJS,
      target: 'es6',
      allowJs: true,
      checkJs: true,
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

    return augmentedCode;
  }
}

export default Typescript;

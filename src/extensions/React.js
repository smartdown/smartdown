import {registerExtension} from 'extensions';

const React = {
};

React.register = function register() {
  registerExtension(
    'react',
    [
      'https://unpkg.com/react@16/umd/react.development.js',
      'https://unpkg.com/react-dom@16/umd/react-dom.development.js',
      'https://unpkg.com/babel-standalone@6/babel.min.js',
    ]);
};

React.generateAugmentedPlayable = function() {
  const augmentedCode =
`// Augmented React Code to be transpiled.

let transformedReactCode;
try {
  transformedReactCode = Babel.transform(playable.code,
    {
      presets: [['es2015', { modules: false }], 'react', 'stage-0']
    }).code;
}
catch (e) {
  console.log('error in Babel.transform()', e);
  this.log('# Babel.transform() error: ', e);
}

const asyncWrapperCode =
\`
const outerThis = this;
return (async function() {
\${transformedReactCode}
}).call(outerThis);
\`;

return smartdown.runFunction(asyncWrapperCode, this, [...arguments], 'react', this.div);
`;

  return augmentedCode;
}

export default React;

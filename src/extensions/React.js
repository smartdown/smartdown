import {registerExtension} from 'extensions';

export default function registerReact() {
  registerExtension(
    'react',
    [
      'https://unpkg.com/react@16/umd/react.development.js',
      'https://unpkg.com/react-dom@16/umd/react-dom.development.js',
      'https://unpkg.com/babel-standalone@6/babel.min.js',
    ]);
}

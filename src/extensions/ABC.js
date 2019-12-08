import {registerExtension} from 'extensions';

export default function registerABC() {
  registerExtension(
    'abc',
    [
      'smartdownBase:lib/abcjs_midi_5.9.1-min.js',
      'smartdownBase:lib/abcjs-midi-no-fa.css',
    ]);
}


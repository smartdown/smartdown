import {registerExtension} from 'extensions';

export default function registerABC() {
  registerExtension(
    'abc',
    [
      'lib/abcjs_midi_5.6.11-min.js'
    ]);
}


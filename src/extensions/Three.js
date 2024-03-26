import {registerExtension} from '../extensions';

export default function registerThree() {
  registerExtension(
    'three',
    [
      'https://unpkg.com/three@0.122/build/three.min.js',
      function() {
        window.smartdown.THREE = window.THREE;
      },
    ]);
}

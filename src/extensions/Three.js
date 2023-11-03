import {registerExtension} from '../extensions';

export default function registerThree() {
  registerExtension(
    'three',
    [
      'https://unpkg.com/three/build/three.min.js',
      function() {
        window.smartdown.THREE = window.THREE;
      },
    ]);
}

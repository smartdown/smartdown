import {registerExtension} from '../extensions';

export default function registerThree() {
  registerExtension(
    'three',
    [
      'https://cdnjs.cloudflare.com/ajax/libs/three.js/109/three.min.js',
      function() {
        window.smartdown.THREE = window.THREE;
      },
    ]);
}

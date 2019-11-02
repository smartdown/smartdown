import {registerExtension} from 'extensions';

//
// I could not find a prebuilt, CDN-distributed version of a UMD version
// of OpenJSCad. So I followed the instructions for `npm run build-umd` at:
//
//

export default function registerOpenJSCAD() {
  registerExtension(
    'openjscad',
    [
      'lib/openjscad.reentrant.umd.js',
    ]);
}

import lodashEach from 'lodash/forEach';

import globalState from './globalState';

//
// Currently, this just ensures that P5 audio is paused when the playable isn't visible.
// Ideally, this would be extended (and optional) to include things like MP3 and other
// audio Smartdown sources.
//

export default function setVisibility(visible) {
  lodashEach(globalState.playablesRegisteredOrder, function (playable) {
    if (playable && playable.p5) {
      if (visible) {
        // playable.p5.getAudioContext().resume();
      }
      else {
        // playable.p5.getAudioContext().suspend();
      }
    }
  });
}

import lodashEach from 'lodash/forEach';

import playPlayable from '../util/playPlayable';
import globalState from '../util/globalState';

export default function startAutoplay(outputDiv) {
  // console.log('startAutoplay', outputDiv);
  if (outputDiv && outputDiv.id) {
    lodashEach(globalState.playablesRegisteredOrder, function(playable) {
      // console.log('startAutoplay', outputDiv, outputDiv.id, playable);
      if (playable.autoplay && !playable.playing) {
        const sel = '#' + outputDiv.id + ' #' + playable.divId;
        const divHere = document.querySelectorAll(sel);
        if (divHere && divHere.length > 0) {
          playPlayable(
            playable.language,
            playable.divId);
        }
        else {
          // console.log('...startAutoplay DIV NOT FOUND', sel, outputDiv, outputDiv.id, playable);
        }
      }
    });
  }
}


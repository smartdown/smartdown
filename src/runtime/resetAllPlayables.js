import lodashEach from 'lodash/forEach';

import resetPlayable from '../util/resetPlayable';
import globalState from '../util/globalState';
import setVisibility from '../util/setVisibility';

export default function resetAllPlayables(outputDiv, throwAway) {
  // console.log('resetAllPlayables', playablesRegisteredOrder);
  lodashEach(globalState.playablesRegisteredOrder, function (playable) {
    if ((outputDiv.id === playable.rootDivId) && playable.divId) {
      const playableElement = document.getElementById(playable.divId);
      if (playableElement) {
        // console.log('resetAllPlayables', playable.divId, playableElement, playablesRegisteredOrder);
        resetPlayable(
          playable.language,
          playable.divId,
          throwAway
        );
      }
      else {
        console.log('resetAllPlayables PLAYABLE DIV NOT FOUND', outputDiv.id, playable.divId, playable);
      }
    }
  });

  setVisibility(false);
}

/* global smartdown */

import lodashEach from 'lodash/forEach';

import globalState from '../util/globalState';
import renderCell from '../render/renderCell';
import areValuesSameEnough from '../util/areValuesSameEnough';

export default async function updateProcesses(id, newValue) {
  smartdown.computeExpressions();

  if (id) {
    // lodashEach(smartdown.smartdownCells, function(newCell, cellID) {
    //   console.log('........newCellCheck', id, newCell, newCell.cellBinding, cellID);
    // });
    lodashEach(smartdown.smartdownCells, async function(newCell, cellID) {
      // console.log('........newCell', id, newCell, newCell.cellBinding, cellID);

      if (id === newCell.cellBinding) {
        await renderCell(cellID, newCell.cellBinding, newValue);
      }
    });
  }
  else {
    lodashEach(smartdown.smartdownCells, async function(newCell, cellID) {
      const oldValue = smartdown.smartdownVariables[newCell.cellBinding];
      await renderCell(cellID, newCell.cellBinding, oldValue);
    });
  }

  lodashEach(globalState.playablesRegisteredOrder, async function (playable) {
    if (playable) {
      const progress = document.getElementById(playable.progressId);

      if (playable.playing) {
        const {depend, dependOn} = playable.embedThis;
        // console.log('.........playable', playable, dependOn, depend);
        if (Array.isArray(dependOn)) {
          if (depend) {
            let signal = false;

            if (dependOn) {
              let atLeastOneUndefined = false;
              dependOn.forEach((varname) => {
                const oldValue = playable.dependLastValues[varname];
                const newerValue = smartdown.smartdownVariables[varname];
                playable.dependLastValues[varname] = newerValue;
                if (newerValue === undefined) {
                  atLeastOneUndefined = true;
                }

                if (!areValuesSameEnough(varname, oldValue, newerValue)) {
                  signal = true;
                }
              });
              if (atLeastOneUndefined) {
                signal = false;
              }
            }
            else {
              signal = true;
            }

            if (signal) {
              if (progress) {
                progress.style.display = 'none';
              }
              depend.apply(playable.embedThis);
            }
          }
        }
        else if (dependOn) {
          Object.keys(dependOn).forEach((varname) => {
            const oldValue = playable.dependLastValues[varname];
            const newerValue = smartdown.smartdownVariables[varname];
            playable.dependLastValues[varname] = newerValue;

            if (!areValuesSameEnough(varname, oldValue, newerValue)) {
              if (progress) {
                progress.style.display = 'none';
              }
              dependOn[varname].apply(playable.embedThis);
            }
          });
        }
      }
      else if (progress) {
        progress.style.display = 'none';
      }
    }
  });
}

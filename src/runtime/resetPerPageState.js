import replaceObject from '../util/replaceObject';
import replaceArray from '../util/replaceArray';
import globalState from '../util/globalState';

export default function resetPerPageState() {
  replaceObject(globalState.expressionsRegistered, {});
  replaceObject(globalState.playablesRegistered, {});
  replaceArray(globalState.playablesRegisteredOrder, []);
}

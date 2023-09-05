const isEqual = require('lodash/isEqual');

export default function areValuesSameEnough(varname, oldValue, newValue) {
  // const oldValueJSON = JSON.stringify(oldValue);
  // const newValueJSON = JSON.stringify(newValue);
  // const result = oldValueJSON === newValueJSON;

  // const result = oldValue === newValue;

  const result = isEqual(oldValue, newValue);

  //  let result = oldValue === newValue;
  //
  //  if ((typeof oldValue === 'number') && isNaN(oldValue) &&
  //      (typeof newValue === 'number') && isNaN(newValue)) {
  //    result = true;
  //  }
  //
  //  if (!result) {
  //    console.log('areValuesSameEnough', oldValue, newValue, typeof oldValue, typeof newValue);
  //  }

  return result;
}

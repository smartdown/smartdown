export default function replaceObject(obj, newObj) {
  Object.keys(obj).forEach((k) => delete obj[k]);
  Object.assign(obj, newObj);
}

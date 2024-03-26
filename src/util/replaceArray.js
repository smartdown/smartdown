export default function replaceArray(arr, newArr) {
  arr.length = 0;
  arr.concat(newArr);
}


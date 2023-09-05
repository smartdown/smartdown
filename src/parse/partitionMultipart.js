export default function partitionMultipart(markdown) {
  markdown = '\n' + markdown; // deal with lack of leading \n
  const splits = markdown.split(/\n# ([a-zA-Z0-9_]+)\n---\n/);
  const result = {
  };
  let firstKey = null;
  for (let i = 1; i < splits.length; i += 2) {
    result[splits[i]] = splits[i + 1];
    if (!firstKey) {
      firstKey = splits[i];
    }
  }

  const defaultKeyName = '_default_';
  if (!firstKey) {
    result[defaultKeyName] = markdown;
  }
  else {
    result[defaultKeyName] = result[firstKey];
  }

  return result;
}


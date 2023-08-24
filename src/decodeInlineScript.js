
// Copied from https://github.com/jashkenas/underscore/blob/e944e0275abb3e1f366417ba8facb5754a7ad273/underscore.js#L1458

const unescapeMap = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#x27;': '\'',
  '&#39;': '\'',
  '&#x60;': '`'
};

// Functions for escaping and unescaping strings to/from HTML interpolation.
function createEscaper(translationMap) {
  function escaper(match) {
    return translationMap[match];
  }
  // Regexes for identifying a key that needs to be escaped.
  const source = '(?:' + Object.keys(translationMap).join('|') + ')';
  const testRegexp = RegExp(source);
  const replaceRegexp = RegExp(source, 'g');
  return function (string) {
    string = string == null ? '' : '' + string;
    return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
  };
}

export default createEscaper(unescapeMap);

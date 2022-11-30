import {registerExtension} from 'extensions';

const Brython = {
};


Brython.register = function register() {
  registerExtension(
    'brython',
    [
      // 'https://cdn.rawgit.com/brython-dev/brython/3.9.2/www/src/brython.js',
      'smartdownBase:lib/brython.js',
      // 'https://cdn.rawgit.com/brython-dev/brython/3.9.2/www/src/brython_stdlib.js',
      'smartdownBase:lib/brython_stdlib.js',
    ]);
};


Brython.generateAugmentedPlayable = function(divId, isModule, code) {
  let augmentedCode;

  if (isModule) {
    console.log('Brython.generateAugmentedPlayable isModule==true not yet implemented');
  }
  else {
    const brythonScriptId = divId + '_brython';
    augmentedCode =
`
const pythonSource =
\`${code}\`;


let s = document.getElementById('${brythonScriptId}');
if (!s) {
  s = document.createElement('script');
  s.type = 'text/python3';
  s.id = '${brythonScriptId}';
}

s.innerHTML = '';

try {
  s.appendChild(document.createTextNode(pythonSource));
  document.body.appendChild(s);
} catch (e) {
  s.text = code;
  document.body.appendChild(s);
}

const div = document.getElementById("${divId}");
const smartdownPlayableContext = {
  smartdown: smartdown,
  divId: "${divId}",
  div: div,
  this: this,
  env: env
};

if (typeof __BRYTHON__ === 'object') {
  if (!__BRYTHON__.isConfiguredForSmartdown) {
    window.$locals___main__ = {};
    // https://github.com/brython-dev/brython/blob/master/www/doc/en/options.md
    const options = {
      debug: 1,
      cache: false,
      static_stdlib_import: false,
      ids: [],
      indexedDB: true,
    };
    const brythonResult = brython(options);
    __BRYTHON__.isConfiguredForSmartdown = true;
  }

  const moduleName = '${brythonScriptId}'; // '__main__';
  const localsId = '${brythonScriptId}';
  const lineInfo = null;

  // https://github.com/brython-dev/brython/wiki/How-Brython-works
  __BRYTHON__.$options = {
    debug: 1
  };

  window['$locals_' + moduleName] = {};
  const tree = __BRYTHON__.py2js(
                pythonSource,
                moduleName,
                moduleName, // localsId,
                lineInfo); // .to_js();
  let js = tree.to_js();
  var ns = __BRYTHON__.$call(__BRYTHON__.builtins.dict)();
  __BRYTHON__.smartdown = smartdownPlayableContext;
  __BRYTHON__.__ARGV = [smartdownPlayableContext];

  eval(js, ns);
}
else {
  const errorMsg = '__BRYTHON__ is not defined. Probably due to debugging or some failure to load the Brython library';
  console.log(errorMsg);
  div.innerHTML = '<h4>' + errorMsg + '</h4>';
}
`;
    return augmentedCode;
  }
};

module.exports = Brython;

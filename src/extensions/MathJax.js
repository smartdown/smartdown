function mathjaxConfigure() {
  // https://github.com/mathjax/MathJax/blob/master/config/default.js

  var MathJax = window.MathJax;
  global.MathJax = window.MathJax;

  MathJax.Hub.Config({
    'fast-preview': {
      // disabled: false,
    },
    TeX: {
      MultLineWidth: '85%',
      equationNumbers: {
        autoNumber: 'none'
      },
      extensions: [
        'AMSmath.js',
        'AMSsymbols.js',
        'noErrors.js',
        'noUndefined.js',
        'autobold.js',
        'AMScd.js',
        'mhchem.js',
        'action.js',
        'extpfeil.js',
        window.xypicURL
      ]
    },

    'HTML-CSS': {
      matchFontHeight: false
    },

    tex2jax: {
      preview: 'none',
      inlineMath: [['$', '$'], ['\\(', '\\)']],
      displayMath: [['$$', '$$'], ['\\[', '\\]']],
      processEscapes: true,
      skipTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code', 'annotation', 'annotation-xml']
    },

    asciimath2jax: {
      delimiters: [['@', '@']]
    },

    // Custom config
    skipStartupTypeset: true,
    showProcessingMessages: false,
    // messageStyle: 'none',
    displayAlign: 'center',
    // processSectionDelay: 0,
    positionToHash: false,
    // showMathMenu: true,
    // showMathMenuMSIE: false,
  });

  MathJax.Hub.Register.MessageHook('Math Processing Error', function (message) {
    console.log('Math Processing Error', message, MathJax.Hub.lastError);
  });
}

module.exports = mathjaxConfigure;

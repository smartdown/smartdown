// Create reference instance
const marked = require('marked');

// Override function
const renderer = {
  heading(text, level) {
    const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');

    return `
            <h${level}>
              <a name="${escapedText}" class="anchor" href="#${escapedText}">
                <span class="header-link"></span>
              </a>
              ${text}
            </h${level}>`;
  }
};


const walkTokens = token => {
  const nChildren = token.tokens ? token.tokens.length : 0;
  console.log('walkTokens', token.type, nChildren, token.text, token.raw);
};

marked.use({
  renderer,
  walkTokens,
});

// Run marked
console.log(marked('Is this a codespan or math? $E=mc^2$?'));

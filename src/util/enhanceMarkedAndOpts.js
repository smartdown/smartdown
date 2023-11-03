import marked from 'marked';
import emoji from 'emoji-js/lib/emoji.min';

import hljs from '../render/hljs';
import playableTypes from '../playableTypes';
import entityEscape from '../render/entityEscape';

import renderImage from '../render/renderImage';
import renderLink from '../render/renderLink';
import renderCodeSpan from '../render/renderCodeSpan';
import renderCode from '../render/renderCode';
import renderParagraph from '../render/renderParagraph';
import renderHeading from '../render/renderHeading';
import renderBr from '../render/renderBr';
import renderTable from '../render/renderTable';

/* eslint-disable-next-line new-cap */
const emojiInstance = new emoji();
const emojiReplacer = (match) => emojiInstance.replace_colons(match);

// Override function
const renderer = {
  link: renderLink,
  image: renderImage,
  paragraph: renderParagraph,
  br: renderBr,
  heading: renderHeading,
  table: renderTable,
  code: renderCode,
  codespan: renderCodeSpan,
  text(src) {
    const result = entityEscape(src.replace(/:([A-Za-z0-9_\-+]+?):/g, emojiReplacer));
    return result;
  },
};

const tokenizer = {
  escape(src) {
    const mathRules = /^(\$+)[^$]*\1/;
    const cap = mathRules.exec(src);
    // math
    if (cap) {
      const escaped = cap[0].replace(/</g, '< ');

      const result = {
        type: 'text',
        raw: cap[0],
        text: escaped
      };

      return result;
      // src = src.substring(cap[0].length);
      // const escaped = cap[0].replace(/</g, '< ');
      // out += escaped;
      // continue;
    }

    return false;
  },
};

//
// End of marked.js extensions
//


/* eslint-disable-next-line */
const walkTokens = token => {
  // const nChildren = token.tokens ? token.tokens.length : 0;
  // console.log('walkTokens', token.type, nChildren, token.text, token.raw);
};

const markedOpts = {
  headerIds: true,
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  langPrefix: 'hljs ',
  highlight: function (code, lang) {    // , callback)
    const playableType = playableTypes[lang];
    let langs = [lang];
    if (lang && playableType) {
      const mappedLanguage = playableType ? playableType.highlight : lang;
      langs = [mappedLanguage];
    }
    else if (lang === '') {
      const tempResult = hljs.highlightAuto(code);
      langs = [tempResult.language];
    }

    const result = hljs.highlightAuto(code, langs);
    return result.value;
  },
  renderer,
  tokenizer,
  walkTokens
};

export default function enhanceMarkedAndOpts() {
  marked.use(markedOpts);
}

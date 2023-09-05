/* global smartdown */

import axios from 'axios';

import expandHrefWithLinkRules from '../util/expandHrefWithLinkRules';
import convertYoutubeFragmentToEmbed from '../util/convertYoutubeFragmentToEmbed';
import convertVimeoFragmentToEmbed from '../util/convertVimeoFragmentToEmbed';
import {ensureExtension} from '../extensions';
import renderABCIntoDivs from './renderABCIntoDivs';

const imageStyles = {
  default: '',
  icon: 'icon',
  thumbnail: 'thumbnail',
  halfwidth: 'halfwidth',
  fullwidth: 'fullwidth',
};

function isGIF(href) {
  return (href.endsWith('.gif') || href.indexOf('data:image/gif;base64') === 0);
}

function isGifferable(href, title, tokens) {
  const isGif = isGIF(href);

  let useGiffer = false;
  tokens.forEach((t) => {
    if (t === 'player') {
      useGiffer = true;
    }
  });
  return isGif && useGiffer;
}

function queueContentLoad(contentType, baseId, href, title, text) {
  // console.log('queueContentLoad', contentType, baseId, href, title, text);

  axios.get(href)
    .then(function(result) {
      ensureExtension('abc',
        function () {
          renderABCIntoDivs(baseId, text, result.data);
        });
    })
    .catch(function(err) {
      console.log('queueContentLoad error', err);
    });
}

export default function renderImage(href, title, text) {
  href = expandHrefWithLinkRules(href, smartdown.linkRules);
  let out = '';
  const specialClass = null;
  const mediaLink = href.lastIndexOf('/media/', 0) >= 0;
  if (mediaLink) {
    const pathElements = href.split('/').reverse();
    // console.log('render', href, pathElements);
    const e1 = pathElements.pop();
    if (e1 !== '') {
      console.log('Unexpected /media syntax: ', href);
    }
    const e2 = pathElements.pop();
    if (e2 === 'media') {
      const imageName = pathElements.pop();
      const imageClass = pathElements.pop() || '';

      const fgClass = `media-image ${imageClass}`;
      const media = smartdown.mediaRegistry[imageName];
      if (media) {
        const inlineData = media.svgData;
        out += '<div class="' + fgClass + '">';
        out += inlineData;
        out += '</div>';
      }
      else {
        console.log('Media not found', imageName);
        out += '<h6 style="color:red;">';
        out += `Media not found: ${imageName}`;
        out += '</h6>';
      }
    }
  }
  else if (href.indexOf('https://twitter.com') === 0) {
    const showCards = (/&amp;showmedia$/i.test(href));
    out = '<blockquote class="twitter-tweet"';
    out += ' data-width="250"';
    out += ' align="center"';
    if (!showCards) {
      out += ' data-cards="hidden"';
    }
    out += ' data-conversation="none"';
    out += ' data-dnt="true"';
    out += ' style="border:4px solid darkgray;">';
    out += '<a href="' + href + '">' + (text || href) + '</a>';
    out += '</blockquote>';
  }
  else if (isGIF(href)) {
    const tokens = text.split(' ');
    const usePlayer = isGifferable(href, title, tokens);

    let width = '50%';
    if (tokens.indexOf('fullwidth') >= 0) {
      width = '100%';
    }
    else if (tokens.indexOf('thumbnail') >= 0) {
      width = '320px';
    }
    else if (tokens.indexOf('icon') >= 0) {
      width = '200px';
    }
    // console.log('isGIF', href, text, tokens, width);

    if (usePlayer) {
      out += `<div style="width:${width};margin:auto;padding:0;" class="gifffer-container"><img style="padding:0;" data-gifffer-width="100%" data-gifffer="${href}" data-gifffer-alt="${text}"`;
    }
    else {
      const gifClassName = imageStyles[text] || imageStyles.default;

      out += '<img class="' + gifClassName + '" src="' + href + '" alt="' + text + '"';
      if (title) {
        out += ' title="' + title + '"';
      }
      if (specialClass) {
        out += ' class="' + specialClass + '"';
      }
    }
    if (title) {
      out += ' title="' + title + '"';
    }
    if (specialClass) {
      out += ' class="' + specialClass + '"';
    }
    out += this.options.xhtml ? '/>' : '></div>';
  }
  else if (text === 'iframe') {
    out +=
      `
      <div class="resp-iframe-container">
        <iframe
          src="${href}"
          xwidth="800"
          xheight="600"
          frameborder="0"
          allowfullscreen>
        </iframe>
      </div>`;
  }
  else if (href.endsWith('.mp3')) {
    out += '<div style="margin:auto;padding:0;">\n';
    out += '<audio preload="auto" controls>\n';
    out += '<source type="audio/mpeg" src="' + href + '"/>\n';
    out += '</audio>\n';
    out += '</div>\n';
  }
  else if (href.endsWith('.abc')) {
    const abcIndex = smartdown.uniqueCellIndex++;
    const abcBaseId = `abc-wrapper-${abcIndex}`;
    out +=
`
  <div class="abc-wrapper">
    <div
      id="${abcBaseId}-sheet"
      class="smartdown-abcsheet">
    </div>
    <div
      id="${abcBaseId}-midi"
      class="smartdown-abcmidi">
    </div>
  </div>
`;
    let contentType = 'abc';
    if (text === 'abcsheet') {
      contentType = text;
    }
    else if (text === 'abcmidi') {
      contentType = text;
    }
    queueContentLoad(contentType, abcBaseId, href, title, text);
  }
  else {
    const youtubeEmbed = convertYoutubeFragmentToEmbed(href, title, text);
    const vimeoEmbed = convertVimeoFragmentToEmbed(href, title, text);

    if (youtubeEmbed) {
      out += youtubeEmbed;
    }
    else if (vimeoEmbed) {
      out += vimeoEmbed;
    }
    else if (text === 'swatch') {
      const bgColor = href || 'pink';
      out += `<span class="smartdown-swatch" style="background:${bgColor}"></span>`;
    }
    else {
      const className = imageStyles[text] || imageStyles.default;

      out += '<img class="' + className + '" src="' + href + '" alt="' + text + '"';
      if (title) {
        out += ' title="' + title + '"';
      }
      if (specialClass) {
        out += ' class="' + specialClass + '"';
      }
      out += this.options.xhtml ? '/>' : '>';
    }
  }

  return out;
}


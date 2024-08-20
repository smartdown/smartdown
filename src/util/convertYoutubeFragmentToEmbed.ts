
const youtubeDimensions = {
  thumbnail: 'width="426" height="240"',
  halfwidth: 'width="640" height="360"',
  fullwidth: 'width="1280" height="720"',
};
const youtubeClasses = {
  thumbnail: 'thumbnail',
  halfwidth: 'halfwidth',
  fullwidth: 'fullwidth',
};

let uniqueYouTubeId = 0;

export default function convertYoutubeFragmentToEmbed(href: string, title: string, text: string): void {
  // console.log('convertYoutubeFragmentToEmbed', href, title, text);
  let result = null;
  const textParts = text.split('|');
  text = textParts[0];

  const hrefNoProtocol = href.replace(/^https?:\/\//, '');

  const sizing = youtubeDimensions[text] || '';
  const classList = youtubeClasses[text] || '';
  let suffix;

  if (hrefNoProtocol.indexOf('youtu.be/') === 0) {
    suffix = hrefNoProtocol.slice('youtu.be/'.length);
  }
  else if (hrefNoProtocol.indexOf('www.youtube.com/watch?v=') === 0) {
    suffix = hrefNoProtocol.slice('www.youtube.com/watch?v='.length);
    suffix = suffix.replace(/&/, '?'); // onlu replace first one
  }

  if (suffix) {
    ++uniqueYouTubeId;
    let args = '?html5=1&ecver=2&modestbranding=1';
    const argsIndex = suffix.indexOf('?');
    if (argsIndex >= 0) {
      args += '&' + suffix.slice(argsIndex + 1);
      suffix = suffix.slice(0, argsIndex);
    }

    let enablejsapi = '';
    let apiButton = '';
    let apiPlayerKey = `player_${uniqueYouTubeId}`;
    if (textParts.length > 1) {
      const apiParts = textParts[1].split('=');
      if (apiParts[0] === 'api') {
        if (apiParts.length > 1) {
          apiPlayerKey = apiParts[1];
        }
        enablejsapi = '&enablejsapi=1';
        apiButton =
          `
          <button
            type="button"
            id="youtube-api-${uniqueYouTubeId}"
            href="#"
            onclick="smartdown.setupYouTubePlayer('youtube-iframe-${uniqueYouTubeId}', '${apiPlayerKey}')"
            class="api-button">
            Enable API for player <b>${apiPlayerKey}</b>
          </button>
          `;
      }
    }

    result =
      `<div class="video-container youtube ${classList}">
        <iframe
          id="youtube-iframe-${uniqueYouTubeId}"
          ${sizing}
          src="https://www.youtube.com/embed/${suffix}${args}${enablejsapi}"
          frameborder="0"
          allow="camera;microphone;autoplay;encrypted-media;picture-in-picture"
          allowfullscreen>
        </iframe>
      </div>
      ${apiButton}
      `;
  }

  return result;
}

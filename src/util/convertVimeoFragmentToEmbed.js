export default function convertVimeoFragmentToEmbed(href, title, text) {
  let result = null;
  const hrefNoProtocol = href.replace(/^https?:\/\//, '');
  const classList = (text === 'thumbnail') ? 'thumbnail' : 'fullwidth';

  if (hrefNoProtocol.indexOf('vimeo.com/') === 0) {
    let suffix = hrefNoProtocol.slice('vimeo.com/'.length);
    let args = '?title=0&byline=0&portrait=0&badge=0';

    const argsIndex = suffix.indexOf('?');
    if (argsIndex >= 0) {
      args += '&' + suffix.slice(argsIndex + 1);
      suffix = suffix.slice(0, argsIndex);
      console.log('args', args, suffix);
    }

    result =
`<div class="video-container vimeo ${classList}">
  <iframe
    src="https://player.vimeo.com/video/${suffix}${args}"
    width="640"
    height="360"
    frameborder="0"
    allow="camera;microphone;autoplay;encrypted-media;picture-in-picture"
    webkitallowfullscreen
    mozallowfullscreen
    allowfullscreen>
  </iframe>
</div>
`;
  }

  return result;
}

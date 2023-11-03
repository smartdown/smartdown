import hljs from './hljs';
import decodeInlineScript from '../parse/decodeInlineScript';

export default function renderCodeSpan(text) {
  const unescaped = decodeInlineScript(text);
  const hljsResult = hljs.highlightAuto(unescaped, ['javascript']);
  return `<code class="hljs-inline">${hljsResult.value}</code>`;
}

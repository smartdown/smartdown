const inlinePrefix = '^^InLiNe^^';

export default function renderParagraph(text) {
  const isInline = (text.indexOf(inlinePrefix) === 0);

  if (isInline) {
    text = text.slice(inlinePrefix.length);
  }

  const pClass = isInline ? 'smartdown_p_inline' : 'smartdown_p';
  const result =
`<p class="${pClass}">${text}</p>
`;

  return result.trim();
}

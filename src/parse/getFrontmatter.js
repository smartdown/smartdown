export default function getFrontmatter(md) {
  md = md.trim() + '\n';
  let resultFMText = null;
  let resultFM = null;
  let resultMD = md;
  const fmPrefix = '---\n';
  const fmSuffix = '\n---\n';
  if (md.indexOf(fmPrefix) === 0) {
    const frontMatterBegin = md.slice(fmPrefix.length - 1);
    const frontMatterEndIndex = frontMatterBegin.indexOf(fmSuffix);
    if (frontMatterEndIndex >= 0) {
      const frontMatterText = frontMatterBegin.slice(0, frontMatterEndIndex);
      resultFMText = frontMatterText; // frontMatterBegin.slice(frontMatterEndIndex + fmSuffix.length);
      resultFM = frontMatterText === '' ? {} : jsyaml.load(resultFMText);
      resultMD = frontMatterBegin.slice(frontMatterEndIndex + fmSuffix.length);
    }
  }

  return {
    frontmatterText: resultFMText,
    frontmatter: resultFM,
    markdown: resultMD
  };
}

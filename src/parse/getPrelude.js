import playableTypes from '../playableTypes';

export default function getPrelude(language, code) {
  const playableType = playableTypes[language];
  const imports = [];
  const includes = [];

  const loadableLanguages = [
    'd3',
    'brython',
    'filament',
    'stdlib',
    'p5js',
    'P5JS',
    'three',
    'leaflet',
    'plotly',
    'openjscad',
    'typescript',
    'react',
    'graphviz',
    'abc',
    'abcsheet',
    'abcmidi',
    'mermaid',
  ];

  // If a playable is declared with a specific language that has
  // a shorthand in loadableLanguages, then add that language's extension
  // as an import. Note that extension may be renamed to plugin, so think
  // that there's a relation between language and extension/plugin.
  // E.g., a d3-language playable would have an implicit import of the d3 extension.
  //

  if (loadableLanguages.indexOf(language) >= 0) {
    imports.push([language, false]);
  }

  if (playableType && (playableType.javascript || language === 'graphviz')) {
    const lines = code.split('\n');
    const usePrefix = '//smartdown.import=';
    const usePrefixM = '//smartdown.importmodule=';
    const includePrefix = '//smartdown.include=';
    lines.forEach((line) => {
      if (line.indexOf(usePrefix) === 0) {
        const rhs = line.slice(usePrefix.length);
        imports.push([rhs, false]);
      }
      else if (line.indexOf(usePrefixM) === 0) {
        const rhs = line.slice(usePrefixM.length);
        imports.push([rhs, true]);
      }
      else if (line.indexOf(includePrefix) === 0) {
        const rhs = line.slice(includePrefix.length);
        includes.push(rhs);
      }
    });
  }

  // console.log('getPrelude', language, imports, includes);

  return {
    imports: imports,
    includes: includes
  };
}

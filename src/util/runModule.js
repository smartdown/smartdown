/* global smartdown */

export default async function runModule(playable, argValues) {
  const divId = playable.divId;
  const code = playable.augmentedCode;
  const embedThis = playable.embedThis;
  // console.log('runModule', playable, embedThis, code.slice(0, 50));

  const s = document.createElement('script');
  playable.es6ModuleScript = s;
  if (smartdown.es6Playables[divId]) {
    console.log('runModule error: smartdown.es6Playables[divId] exists', divId, smartdown.es6Playables[divId]);
  }

  const glueStart = () => {
    if (smartdown.es6Playables[divId].start) {
      smartdown.es6Playables[divId].start.call(embedThis, ...argValues);
    }
  };

  smartdown.es6Playables[divId] = {
    script: s,
    start: null,
    glueStart,
  };
  s.type = 'module';

  s.onerror = function (error) {
    console.log('runModule...onerror', error);
  };
  s.async = false;
  const augmentedCode =
`
${code}

const augmentedDivId = '${divId}';
smartdown.es6Playables[augmentedDivId].glueStart();
`;

  s.text = augmentedCode;

  document.head.appendChild(s);
  const embedResult = null;

  return embedResult;
}

import playableArgNames from './playableArgNames';

export default async function runFunction(code, embedThis, argValues, language, div) {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncFunction#examples
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const AsyncFunction = (async function () {}).constructor;
  const func = new AsyncFunction(...playableArgNames, code);

  let embedResult = null;
  try {
    embedResult = await func.apply(embedThis, argValues);
  }
  catch (e) {
    console.log('###runFunction catch func.apply()', e);
    embedThis.log(`# Error playing ${language} playable: ${e}`);
    if (div) {
      div.innerHTML =
`
<pre><code style="color:maroon;">
<b>Error Playing ${language} playable</b>
<hr>
${e}
</code></pre>
`;
    }
  }

  return embedResult;
}


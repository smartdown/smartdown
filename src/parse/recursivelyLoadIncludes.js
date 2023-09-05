import {
  importTextUrl,
} from '../importers';

export default function recursivelyLoadIncludes(prefixCode, includesRemaining, done) {
  // console.log('recursivelyLoadIncludes', prefixCode, includesRemaining);

  if (includesRemaining.length > 0) {
    const nextInclude = includesRemaining.shift();
    // console.log('nextInclude', nextInclude);

    importTextUrl(
      nextInclude,
      function (nextIncludeText) {
        // console.log('recursivelyLoadIncludes success', nextInclude, nextIncludeText.slice(0, 50));

        recursivelyLoadIncludes(
          prefixCode + nextIncludeText,
          includesRemaining,
          done);
      },
      function (error) {
        // console.log('recursivelyLoadIncludes error', nextInclude, error);

        const errorText =
`
//
// Unable to include ${nextInclude}: ${error}
//
`;
        recursivelyLoadIncludes(
          prefixCode + errorText,
          includesRemaining,
          done);
      }
    );
  }
  else if (done) {
    done(prefixCode);
  }
}

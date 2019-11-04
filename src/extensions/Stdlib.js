import {registerExtension} from 'extensions';
import {importScriptUrl} from 'importers';

export const Stdlib = {};

export function registerStdlib() {
  registerExtension(
    'stdlib',
    [
      'lib/stdlib-tree.min.js',
      'lib/stdlib-datasets-tree-exclude.min.js',
      function() {
        window.Stdlib = Stdlib;
        smartdown.Stdlib = Stdlib;
        Stdlib.vdomToHtml = smartdown.vdomToHtml;
        Stdlib.datasets = {};
        const stdlibData = window.stdlib_datasets_exclude.datasets;
        Object.keys(stdlibData).forEach(slot => {
          Stdlib.datasets[slot.toLowerCase()] = stdlibData[slot];
        });

        Stdlib.loadSOTU = function loadSOTU(loaded) {
          if (Stdlib.datasets['sotu-data']) {
            // console.log('loadSOTU already loaded');
          }
          else {
            const url = window.smartdown.baseURL + 'lib/stdlib-datasets-sotu.min.js';
            importScriptUrl(
              url,
              function() {
                Stdlib.datasets['sotu-data'] = window.stdlib_datasets_sotu.SOTU;
                loaded();
              },
              function(e) {
                console.log('loadSOTU importScriptUrl error', url, e);
              });
          }
        };

        const stdlibPackage = window.stdlib;
        Object.keys(stdlibPackage).forEach(slot => {
          Stdlib[slot] = stdlibPackage[slot];
        });
      },
    ]);
}

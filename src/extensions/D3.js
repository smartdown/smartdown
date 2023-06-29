/* global d3 */

import {registerExtension} from '../extensions';

export default function registerD3() {
  registerExtension(
    'd3',
    [
      'https://unpkg.com/d3/dist/d3.min.js',
      function() {
        window.smartdown.d3 = window.d3 = d3;
      },
      'https://cdn.jsdelivr.net/npm/d3-cloud/build/d3.layout.cloud.min.js',
      function() {
        window.d3cloud = window.d3.layout.cloud;
        window.smartdown.d3cloud = window.d3cloud;
      },
      'https://unpkg.com/topojson/dist/topojson.js',
      function() {
        window.smartdown.topojson = window.topojson;
      },
      'smartdownBase:lib/webcomponents-loader.js',
      'https://cdnjs.cloudflare.com/ajax/libs/crossfilter2/1.4.7/crossfilter.min.js',
      'https://unpkg.com/d3fc/build/d3fc.js',
      function() {
        window.d3fc = window.fc;
        window.smartdown.d3fc = window.d3fc;
      },
      'https://unpkg.com/dc/dist/dc.min.js',
      'https://unpkg.com/dc/dist/style/dc.min.css',
      function() {
        window.d3dc = window.dc;
        window.smartdown.d3dc = window.d3dc;
        window.d3dc.config.defaultColors(window.d3.schemeCategory10);
      },
      'https://unpkg.com/d3-sankey/dist/d3-sankey.min.js',
    ]);
}


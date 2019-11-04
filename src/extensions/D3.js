import {registerExtension} from 'extensions';

export default function registerD3() {
  registerExtension(
    'd3',
    [
      'https://unpkg.com/d3@5.12.0/dist/d3.min.js',
      function() {
        window.d3v5 = window.d3 = d3;
        window.smartdown.d3v5 = window.smartdown.d3 = window.d3v5;
      },
      'https://cdn.jsdelivr.net/npm/d3-cloud@1.2.5/build/d3.layout.cloud.min.js',
      function() {
        window.d3cloud = window.d3.layout.cloud;
        window.smartdown.d3cloud = window.d3cloud;
      },
      'https://unpkg.com/topojson@3.0.2/dist/topojson.js',
      function() {
        window.smartdown.topojson = window.topojson;
      },
      'lib/webcomponents-loader.js',
      'https://cdnjs.cloudflare.com/ajax/libs/crossfilter2/1.4.7/crossfilter.min.js',
      'https://unpkg.com/d3fc@14.0.55/build/d3fc.js',
      function() {
        window.d3fc = window.fc;
        window.smartdown.d3fc = window.d3fc;
      },
      'https://unpkg.com/dc@3.1.7/dc.js',
      'https://unpkg.com/dc@3.1.7/dc.min.css',
      function() {
        window.d3dc = window.dc;
        window.smartdown.d3dc = window.d3dc;
        window.d3dc.config.defaultColors(window.d3v5.schemeAccent);
      },
      'https://unpkg.com/d3-sankey@0.12.3/dist/d3-sankey.min.js',
    ]);
}


// https://webpack.js.org/guides/author-libraries/

/* eslint-disable */

import webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import FileManagerPlugin from 'filemanager-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

// const webpack = require('webpack');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const CopyWebpackPlugin = require('copy-webpack-plugin');
// const FileManagerPlugin = require('filemanager-webpack-plugin');
// var HtmlWebpackPlugin = require('html-webpack-plugin');
// const GoogleFontsPlugin = require("google-fonts-webpack-plugin")

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

// process.noDeprecation = true;   // https://github.com/babel/babel-loader/issues/392

var nodeEnvironment = process.env.BUILD;
var production = nodeEnvironment === 'production';
var test = nodeEnvironment === 'test';
var development = nodeEnvironment === 'development' || test;
var debugMode = !production;
var BUILDHASH = false;

var app = path.join(__dirname, 'src');
var entryFile = 'index.js';
var appFile = path.join(app, entryFile);
var libraryName = 'smartdown';
var outputPath = path.join(__dirname, 'dist/lib/');
var outputFile = libraryName + '.js';
var nm = path.join(__dirname, 'node_modules');
var stdlibRoot = path.join(nm, '@stdlib');
var abcJS = path.join(app, 'external/abcjs_midi_5.9.1-min.js');
var abcCSS = path.join(app, 'external/abcjs-midi-no-fa.css');

// Useful when debugging via a locally built OpenJSCAD
// var openjscadJSCore = path.join(app, 'external/jscad-core.min.js');
// var openjscadJSModeling = path.join(app, 'external/jscad-modeling.min.js');
// var openjscadJSReglRenderer = path.join(app, 'external/jscad-regl-renderer.min.js');
// var openjscadJSIoIo = path.join(app, 'external/jscad-io-io.min.js');

var giffferJS = path.join(nm, 'gifffer/build/gifffer.min.js');
var p5JS = path.join(nm, '/p5/lib/p5.min.js');
// var p5JS = path.join(nm, '/p5/lib/p5.js');
// var brythonJS = path.join(nm, '/brython/brython.js');
var filamentJS = path.join(app, 'external/filament.js');
var brythonJS = path.join(app, 'external/brython.js');
var brythonStdlibJS = path.join(nm, '/brython/brython_stdlib.js');
var vizJS = path.join(nm, '/viz.js/viz.js');
var vizLiteJS = path.join(nm, '/viz.js/lite.render.js');
var webcomponentsJS = path.join(nm, '@webcomponents/webcomponentsjs/');
var topojsonJS = path.join(nm, '/topojson/dist/topojson.min.js');
var galleryRoot = '/Users/bud/DoctorBud/smartdown-gallery/';
// var galleryRoot = path.join(nm, 'smartdown-gallery/');
// var galleryResourcesRoot = path.join(nm, 'smartdown-gallery/resources/');

var useOlderBrowsers = false;
var useFileSaver = false && !test;
var useLocalForage = false && !test;
var useLeaflet = false && !test;
var useBrython = false && !test;
var useGifffer = false && !test;
var useP5JS = false && !test;
var useMathJax = false;

var mode = (nodeEnvironment === 'production' || nodeEnvironment === 'development') ?
            nodeEnvironment : 'production';
var galleryIgnores = [
  '**/.DS_Store',
  '**/.git',
  '**/.git/**',
  '**/.gitignore',
  '**/hide',
  '**/LICENSE',
  '**/*.sh',
  '**/node_modules',
  '**/package*.json',
  '**/index.*'];
const baseURL = development ? '/' : '/smartdown/';

const defines = {
  useFileSaver: useFileSaver,
  useLocalForage: useLocalForage,
  useLeaflet: useLeaflet,
  useBrython: useBrython,
  useGifffer: useGifffer,
  useP5JS: useP5JS,
  useMathJax: useMathJax,
};

defines['process.env.BUILD'] = JSON.stringify(process.env.BUILD);
if (test) {
  defines['process.env.NODE_ENV'] = JSON.stringify(process.env.NODE_ENV);
}

var config = {
  // bail: true,

  performance: {
    maxEntrypointSize: 20000000,
    maxAssetSize: 20000000,
  },

  stats: {
    optimizationBailout: true
  },

  // optimization: {
  //   splitChunks: {
  //   //   chunks(chunk) {
  //   //     // console.log('###exclude?', chunk.name, chunk);
  //   //     return chunk.name !== 'smartdown';
  //   //   },
  //   //   name(module) {
  //   //     if (module.context.endsWith('@stdlib/datasets/sotu/lib')) {
  //   //       console.log('###name?', module.context, Object.keys(module));
  //   //       return 'sotu-data';
  //   //     }

  //   //     return;
  //   //   }
  //   }
  // },
  mode: mode,
  externals: 'fs',
  context: app,
  entry: {
    smartdown: entryFile
  },

  output: {
    path: outputPath,
    filename: '[name].js',  // 'smartdown.js',
    chunkFilename: 'smartdown_[name].js',
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true,
    // sourceMapFilename: '[name].map'
  },

  resolve: {
    alias: {
      'gifffer': giffferJS,
      'esprima$': path.join(__dirname, 'NOP.js'),

      topojson$: topojsonJS,
      p5JS$: p5JS,
      p5$: p5JS,
      'rx$': 'rx/dist/rx.all.js'
    },
    modules: [
      // path.resolve('./src'),
      app,
      nm
    ],
    extensions: ['.json', '.js', '.tsx', '.ts' ],

  },

  plugins: [
    // new GoogleFontsPlugin({
    //   fonts: [
    //     { family: "Asap", variants: [ "300", "400", "500", "700" ] },
    //     { family: "Ubuntu Mono", variants: [ "300", "400", "500", "700", "300italic", "700italic" ] }
    //   ],
    //   path: "fonts/",
    //   filename: "fonts.css"
    // }),

    new MiniCssExtractPlugin({
        filename: BUILDHASH ? 'smartdown.[hash].css' : 'smartdown.css',
        // chunkFilename: BUILDHASH ? 'smartdownChunksmartdown.[hash].css' : 'CHUNKsmartdown.css'
      }),


    new webpack.HotModuleReplacementPlugin(),

    new webpack.DefinePlugin(defines),

    new CopyWebpackPlugin({
      patterns: [
        // { from: '../distdoc/', to: '../doc/' },
        { from: 'SimpleSiteExample/index_unpkg.html', to: '../index_unpkg.html' },
        { from: 'favicons', to: '../' },
        { from: '../CODE_OF_CONDUCT.md', to: '../' },
        { from: '../CONTRIBUTING.md', to: '../' },
        { from: '../LICENSE.md', to: '../' },
        { from: '../README.md', to: '../' },
        { from: 'fonts.css' },
        { from: 'fonts/', to: './fonts/' },
        { from: 'starter.js' },
        { from: 'blocks_helper.js' },
        { from: 'inline_helper.js' },
        { from: 'calc_handlers.js' },
        { from: path.join(webcomponentsJS, 'webcomponents-loader.js') },
        { from: path.join(webcomponentsJS, 'bundles/'), to: './bundles/' },
        { from: vizJS },
        { from: path.join(stdlibRoot, 'dist-tree/build/bundle.min.js'), to: './stdlib-tree.min.js' },
        { from: path.join(stdlibRoot, 'dist-datasets-tree-exclude/build/bundle.min.js'), to: './stdlib-datasets-tree-exclude.min.js' },
        { from: path.join(stdlibRoot, 'dist-datasets-sotu/build/bundle.min.js'), to: './stdlib-datasets-sotu.min.js' },

        { from: vizLiteJS },
        { from: path.join(app, 'external/ldf-client-browser.js') },
        { from: abcJS },
        { from: abcCSS },

        // Useful when debugging via a locally built OpenJSCAD
        // { from: openjscadJSCore },
        // { from: openjscadJSModeling },
        // { from: openjscadJSReglRenderer },
        // { from: openjscadJSIoIo },

        { from: filamentJS },
        { from: brythonJS },
        { from: brythonStdlibJS },
        { from: 'xypic.js' },

        // { from: galleryResourcesRoot, to: './resources/' },
        { from: galleryRoot, to: '../gallery/', globOptions: {dot: true, ignore: galleryIgnores} },

        { from: '../CODE_OF_CONDUCT.md', to: '../gallery/' },
        { from: '../CONTRIBUTING.md', to: '../gallery/' },
        { from: '../LICENSE.md', to: '../gallery/' },
        { from: '../README.md', to: '../gallery/' },
        { from: 'favicons', to: '../gallery/' },

        { from: 'fonts.css', to: '../gist/' },
        { from: 'fonts/', to: '../gist/fonts/' },
        { from: 'starter.js', to: '../gist/' },
        { from: 'blocks_helper.js', to: '../gist/' },
        { from: 'inline_helper.js', to: '../gist/' },
        { from: 'calc_handlers.js', to: '../gist/' },
        { from: vizJS, to: '../gist/' },
        { from: vizLiteJS, to: '../gist/' },
        { from: brythonJS, to: '../gist/' },
        { from: brythonStdlibJS, to: '../gist/' },
        { from: 'favicons', to: '../gist/' },
        { from: 'xypic.js', to: '../gist/' },
        // { from: galleryResourcesRoot, to: '../gist/resources/' },
        // { from: galleryRoot, to: '../gist/gallery/', ignore: ['LICENSE', 'package.json'] },
        // { from: '../README.md', to: '../gist/gallery/' },

        // { from: galleryResourcesRoot, to: '../resources/' },
      ],
      // By default, we only copy modified files during
      // a watch or webpack-dev-server build. Setting this
      // to `true` copies all files.
      // copyUnmodified: true,
      // debug: 'warning' // 'warning', 'info', 'debug'
    }),

    new FileManagerPlugin({
      events: {
        onEnd: {
          copy: [
            { source: outputPath + 'smartdown.js', destination: outputPath + '../gist/' },
            { source: outputPath + 'smartdown.css', destination: outputPath + '../gist/' },

            { source: outputPath + 'smartdown.js.map', destination: outputPath + '../gist/' },
            // { source: outputPath + 'smartdown.css.map', destination: outputPath + '../gist/' },

            // { source: outputPath + 'smartdown_p5Sound.js', destination: outputPath + '../gist/' },

            // { source: outputPath + 'smartdown_p5Sound.js.map', destination: outputPath + '../gist/' },
          ]
        }
      }
    })

  ],

  module: {
    noParse: [
      /node_modules\/localforage\/dist\/localforage.js/,
      new RegExp(p5JS),
      new RegExp('p5JS'),
      // new RegExp(vizJS),
      // new RegExp('vizJS'),
      new RegExp('/node_modules/web-audio-mock-api/')
    ],

    rules: [
      {
        test:  /\.(sa|sc|c)ss$/,

        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },

      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },

      {
        // Reference: https://github.com/babel/babel-loader
        test: /\.js$/,
        exclude: /node_modules/,
        include: [
          app,
          // path.resolve(__dirname, 'test/')
        ],
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            comments: true,
            cacheDirectory: false,
            presets: ['@babel/preset-env'],
            plugins: [
              '@babel/plugin-syntax-dynamic-import',
              '@babel/plugin-transform-modules-umd',
              // '@babel/plugin-transform-block-scoping',
              "@babel/plugin-transform-runtime",
            ],
          },
        },
      },

      {
        test: /\.(png)$/,
        loader: 'file-loader',
        include: [path.resolve(__dirname, 'node_modules/leaflet/dist/images')]
      },

      {
        test: /\.(html)$/,
        loader: 'html-loader',
        exclude: /node_modules/
      }
    ]
  },

  node: {
    // fs: 'empty'
  },


  // We don't actually use webpack dev server in this project. Weird
  // devServer: {
  //   host: '0.0.0.0',//your ip address
  //   disableHostCheck: true,
  //   inline: false,
  //   contentBase: outputPath,
  //   historyApiFallback: true,
  //   watchContentBase: true
  // },
};


config.plugins.push(new HtmlWebpackPlugin(
  {
    template: 'SimpleSiteExample/index.ejs',
    inject: false,
    filename: path.join(outputPath, '../index.html'),
    smartdownIndexTitle: 'Simple Smartdown Site',
    smartdownRawPrefix: `window.location.origin + '${baseURL}gallery/'`,
    smartdownBaseURL: baseURL,
  }));


config.plugins.push(new HtmlWebpackPlugin(
  {
    template: 'SimpleSiteExample/index.ejs',
    inject: false,
    filename: path.join(outputPath, '../gallery/index.html'),
    smartdownIndexTitle: 'Simple Smartdown Gallery Site',
    smartdownRawPrefix: `window.location.origin + '${baseURL}gallery/'`,
    smartdownBaseURL: baseURL,
  }));

config.plugins.push(
  new HtmlWebpackPlugin({
    template: 'SimpleSiteExample/index.ejs',
    inject: false,
    filename: path.join(outputPath, '../gist/index.html'),
    smartdownGistHashPrefix: '',
    smartdownGistPathPrefix: 'gist/',
    smartdownDefaultHome: 'Gists',
    smartdownIndexTitle: 'Smartdown Gist Site',
    smartdownRawPrefix: `window.location.origin + '${baseURL}gallery/'`,
  }));

switch (nodeEnvironment) {
  case 'production':
    // https://webpack.js.org/guides/production-build/
    config.plugins.push(
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
      }),
    );
    config.devtool = 'nosources-source-map';
    break;

  case 'test':
    config.entry = entryFile;
    // config.module.rules[0] = {
    //     test: /(\.css|\.less|.\scss)$/,
    //     loader: 'null-loader',
    //     include: [app]
    // };
    break;

  case 'development':
    // config.entry = [entryFile, 'webpack/hot/dev-server'];
    config.devtool = 'eval';  // https://webpack.js.org/configuration/devtool/
    break;

  case 'analyze':
    config.devtool = 'nosources-source-map';
    config.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'static'
      }));
    break;

  default:
    console.warn('Unknown or Undefined Node Environment. Please refer to package.json for available build commands.');
}

import nodeExternals from 'webpack-node-externals';

if (test) {
  require.extensions['.css'] = function () {
    return null;
  };
  require.extensions['.png'] = function () {
    return null;
  };
  require.extensions['.jpg'] = function () {
    return null;
  };

  config.module.rules[0] = {
    test: /\.css$/,
    use: 'null-loader'
  };

  config.devtool = 'inline-cheap-module-source-map';
  config.mode = 'none';
  config.target = 'node'; // webpack should compile node compatible code
  config.externals = [nodeExternals()]; // in order to ignore all modules in node_modules folder
}

export default config;

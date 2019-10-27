const Docma = require('docma');

var nodeEnvironment = process.env.BUILD;
var production = nodeEnvironment === 'production';

const buildConfig = {
  debug: Docma.Debug.ALL,
  src: [
    {
      helpers: [
        './src/starter.js',                 // ?api or ?api=_def_
        './src/calc_handlers.js',           // ?api or ?api=_def_
      ],
    },

    // ungrouped js files will be merged under default route
    './src/index.js',                   // ?api or ?api=_def_
    './distdocts/src/extensions.js',                   // ?api or ?api=_def_
    './distdocts/src/importers.js',                   // ?api or ?api=_def_

    // including markdown ('content') files
    './README.md',
    './FAQ.md',
    './CONTRIBUTING.md',
    './VERSIONS.md',
    './LICENSE.md',
    './CODE_OF_CONDUCT.md',

    // using an object to rename the route for the given markdown files
    {
      guide: './README.md'
    }
  ],
  'assets': {
    '/img': ['./doc/*.png']
  },

  dest: './distdoc',                  // output directory for the generated docs
  app: {
    title: 'Smartdown Documentation',          // title of the app
    routing: 'path',                   // routing method 'query' or 'path'
    server: Docma.ServerType.STATIC,
    entrance: 'content:guide',          // initial route to load on entrance
    base: production ?
      '/smartdown/doc/' :
      '/doc'                            // base path of the SPA
  },

  // template-specific configuration.
  // for Zebra template, see https://onury.io/docma/templates/zebra
  template: {
    path: 'zebra',
    options: {
      title: {
        label: 'Smartdown',
        href: '.'
      },
      logo: {                       // URL String or { dark: String, light: String }
        dark: 'img/Logo.png',
        light: 'img/Logo.png'
      },
      sidebar: {
        enabled: true,
        outline: 'tree',          // 'flat' | 'tree'
        collapsed: false,
        toolbar: true,
        itemsFolded: false,
        itemsOverflow: 'crop',    // 'crop' | 'shrink'
        badges: true,             // true | false | <string-value>
        search: true,
        animations: true
      },
      symbols: {
        autoLink: true,           // 'internal' | 'external' | true (both)
        params: 'list',           // 'list' | 'table'
        enums: 'list',            // 'list' | 'table'
        props: 'list',            // 'list' | 'table'
        meta: false
      },
      contentView: {
        bookmarks: 'h1,h2,h3',
        faLibs: 'all'             // 'all' or 'solid'|'regular'|'brands' or comma-separated or null
      },
      navbar: {
        enabled: true,
        fixed: true,
        dark: false,
        animations: true,
        menu: [
          {
            // iconClass: 'fas fa-book',
            label: 'About Smartdown',
            'items': [
              { 'label': 'Readme', 'href': '.' },
              { 'separator': true },
              { 'label': 'Smartdown API', 'href': 'api' },
              { 'label': 'Smartdown API Subsection', 'href': 'api/#SomeSubsection' },
              { 'separator': true },
              { 'label': 'License', 'href': 'license' }
            ]
          },
          {
            'label': 'F.A.Q.',
            'href': 'faq'
          },
          {
            'iconClass': 'fas fa-puzzle-piece',
            'label': 'Examples',
            'items': [
              { 'label': 'Simple Gallery', 'href': '/smartdown/' },
              { 'separator': true },
              { 'label': 'Smartdown Viewer/Editor', 'href': 'https://smartdown.site/' },
              { 'separator': true },
              { 'label': 'smartdown.io', 'href': 'https://smartdown.io/' }
            ]
          },
          {
            // 'iconClass': 'fas fa-cloud-download-alt',
            'label': 'Download',
            'items': [
              {
                'label': '<code>npm i smartdown</code>',
                'href': 'https://www.npmjs.com/package/smartdown',
                'target': '_blank'
              },
              {
                'label': 'Releases',
                'href': 'https://github.com/smartdown/smartdown/releases',
                'target': '_blank'
              },
              { 'separator': true },
              {
                'label': 'Versions',
                'href': 'versions'
              }
            ]
          },
          {
            'iconClass': 'fab fa-lg fa-github',
            'label': '',
            'href': 'https://github.com/smartdown/smartdown',
            'target': '_blank'
          }
        ]
      }
    }
  }
};
// See Docma's own configuration @
// https://github.com/onury/docma/blob/master/docma.json


const docma = new Docma();
docma.build(buildConfig)
  .then(success => {
    console.log('Documentation is built successfully.');
  })
  .catch(error => {
    console.log(error.stack);
  });

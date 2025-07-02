module.exports = {
    opts: { // https://jsdoc.app/about-commandline
        verbose: true,
        private: true,
        // template: 'templates/default',  // same as -t templates/default
        encoding: 'utf8',               // same as -e utf8
        destination: 'distdoc/doc/',          // same as -d ./out/
        recurse: true,                  // same as -r
        tutorials: '/tmp/doc/tutorials', // same as -u path/to/tutorials
    },
    plugins: ['plugins/markdown'],
    source: {
        include: [
            'src',
            'README.md',
        ],
        exclude: [
            'src/xypic.js',
            'src/external',
        ],
        // includePattern: '.+\\.js(doc|x)?$',
        // excludePattern: '(^|\\/|\\\\)_',
    },
    tags: {
        allowUnknownTags: true,
    },
};

/*
{
    "tags": {
        "allowUnknownTags": true
    },
    "source": {
        "includePattern": ".+\\.js(doc|x)?$",
        "excludePattern": "(^|\\/|\\\\)_"
    },
    "plugins": [],
    "templates": {
        "cleverLinks": false,
        "monospaceLinks": false,
        "default": {
            "outputSourceFiles": true
        }
    }
}
*/


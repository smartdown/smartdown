## Release History

- **1.0.0** - First public open source release of Smartdown, after too many years and 118 private releases. Huzzah!
- **1.0.1** - Delete LICENSE in favor of LICENSE.md. Eliminate duplicate FAQ from README.md. Replace references to smartdown.site with smartdown.github.io/smartdown (deprecating smartdown.site). Replace references to doctorbud.com/smartdown/ with smartdown.github.io/smartdown (deprecating doctorbud.com/smartdown/). Use smartdown@quantumclay.com for email feedback. Eliminated duplicate of README that was in doc/index.md.
- **1.0.2** - Add support to starter.js for loading multicards and jumping to a specific card in a multicard document. Create a single-file example in SimpleSiteExample/index_unpkg.html, which refers to unpkg.com to satisfy smartdown and gallery resources. Fix starter.js so that it can handle Gists properly even when the card hash is an external URL.
- **1.0.3** - Updated deps. Add support for abcjs.net, which supports generation of sheet music and MIDI. Very preliminary, but cool.
- **1.0.4** - Updated deps. Extend abcjs integration to support the loading and playing of URLs with a .abc suffix. Increase media breakpoint width to 800px to determine when the font size and line-height changes from small to larger. Use SD Gallery 0.0.32. Add a custom style to SimpleSiteExample so that the smartdown-container expands to fit the window, as opposed to 'auto'.
- **1.0.5** - Fix XMLHttpRequest calls to use overrideMimeType() so that FireFox doesn't freak about non-XML content (such as .abc files). Deal with Chrome's new Autoplay policy by resuming the AudioContext that Chrome suspends until user interaction.
- **1.0.6** - Update dependencies. Add smartdown.importCssUrl() function. Adjust inline_helper.js so that it scrolls to top when a card is loaded.
- **1.0.7** - Updates Gallery to 0.0.36 (clearer jsPsych documentation and examples).

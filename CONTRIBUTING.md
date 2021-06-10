# State of the project :construction:

Although Smartdown has been in use for years, it has primarily been tended by
myself (Dan Keith), and is in need of better documentation, unit testing, and refactoring.
Thanks for your contribution, feedback and patience.

# Contributing to Smartdown

Contributions are always welcome. Before contributing, please read the
[CODE_OF_CONDUCT](CODE_OF_CONDUCT.md) and consult the [Issue Tracker](); your issue
may have already been discussed or fixed. To contribute,
[fork](https://help.github.com/articles/fork-a-repo/) Smartdown, commit your changes,
and [Submit a Pull Request](https://help.github.com/articles/using-pull-requests/).

## Development

### Local development

Run `webpack` in *watch* mode to enable auto-building of the Smartdown `dist/` contents. This command does not handle the serving of these contents via `http-server`.

`npm run dev`

### Local build of Simple Site Example

- `npm run build`
- `http-server docs/` *Or any other local web server*/

### Local build of Smartdown Viewer site

- Either `build` or `dev` in the `smartdown/` directory to ensure that the Smartdown library is updated.
- `cd site/`
- `npm run build` or `npm run dev`


### How to `npm publish` a new version

For publishing and distribution of this open source code, I've adapted the NPM structure described in via [Creating and Publishing a Node.js Module](https://quickleft.com/blog/creating-and-publishing-a-node-js-module/).

- Ensure master has the latest code for version `x.y.z`
- Ensure `package.json` has version `x.y.z`
- `git tag x.y.z`
- `git push --force origin master --tags`
- `npm publish`



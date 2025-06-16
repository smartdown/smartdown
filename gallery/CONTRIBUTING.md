# State of the project :construction:

Although Smartdown has been in use for years, it has primarily been tended by
myself (Dan Keith), and is in need of better documentation, unit testing, and refactoring.
Thanks for your contribution, feedback and patience.

# Contributing to Smartdown

Contributions are always welcome. Before contributing, please read the
[CODE_OF_CONDUCT](CODE_OF_CONDUCT.md) and consult the [Issue Tracker](https://github.com/smartdown/smartdown/issues); your issue
may have already been discussed or fixed. To contribute,
[fork](https://help.github.com/articles/fork-a-repo/) Smartdown, commit your changes,
and [Submit a Pull Request](https://help.github.com/articles/using-pull-requests/).

## Development

### How to generate valid certificates for use in local development

To use the `npm run dev` command and serve Smartdown locally via `https`, it is necessary to do a one-time setup of your local development environment to generate valid self-signed SSL certificates.

We will use [mkcert](https://github.com/FiloSottile/mkcert) to generate:

- ssl/ca.crt
- ssl/ca.key
- ssl/cert.crt
- ssl/cert.key

The `.gitignore` file ensures that these files will **not** be saved to `git`.

For convenience and uniformity, the NPM script `makeCert` is provided:

```
npm run makeCert
```

Smartdown does not currently use Webpack's `dev-server`; instead, it relies upon Webpack's `watch` command and serves the generated content via `http-server`. However, the following article proved useful in understanding how and why to use `mkcert` for local development certificates:
- [Locking Down your Dev Environment with Webpack DevServer and mkcert](https://www.theandrewgrass.com/blog/locking-down-your-dev-environment-with-webpack-devserver-and-mkcert/)

#### Trusting the `ca.crt` certificate.

As a final step, after the CA and server certificates have been generated in `ssl/`, it is necessary to *trust* the CA certificate.

##### Trusting on MacOS via `Keychain Access`

On MacOS, you will need to open `ssl/ca.crt` (via double-click in the Finder or via `open ssl/ca.crt` in your terminal). This will launch `Keychain Access` and allow you to explicitly *trust* the CA certificate. This will enable your SSL certificate in `ssl/cert.crt` to work properly in a browser without issuing SSL warnings.

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



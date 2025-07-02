rm -rf distdoc/ /tmp/doc
mkdir -p /tmp/doc/tutorials

cp README.md VERSIONS.md FAQ.md CONTRIBUTING.md LICENSE.md CODE_OF_CONDUCT.MD /tmp/doc/tutorials
cp doc/tutorials.json /tmp/doc/tutorials/

jsdoc -c doc/jsdoc.js

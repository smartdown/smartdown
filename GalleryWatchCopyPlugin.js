const fs = require('fs-extra');
const path = require('path');
const picomatch = require('picomatch');

class GalleryWatchCopyPlugin {
  constructor({ src, dest, ignore = [] }) {
    this.src = src;
    this.dest = dest;
    this.ignore = ignore;
  }

  shouldIgnore(filePath) {
    const rel = path.relative(this.src, filePath);
    return this.ignore.some(pattern => picomatch.isMatch(rel, pattern, { dot: true }));
  }

  apply(compiler) {
    // Add directory to Webpack's watch list
    compiler.hooks.afterCompile.tap('GalleryWatchCopyPlugin', (compilation) => {
      compilation.contextDependencies.add(this.src);
    });

    // On each watch run, copy files (excluding ignored)
    compiler.hooks.watchRun.tapAsync('GalleryWatchCopyPlugin', async (comp, callback) => {
      try {
        await fs.copy(this.src, this.dest, {
          filter: (srcFile) => !this.shouldIgnore(srcFile)
        });
        console.log(`[GalleryWatchCopyPlugin] Copied ${this.src} → ${this.dest} (ignored: ${this.ignore.join(', ')})`);
        callback();
      } catch (err) {
        console.error(`[GalleryWatchCopyPlugin] Copy failed:`, err);
        callback(err);
      }
    });
  }
}

module.exports = GalleryWatchCopyPlugin;

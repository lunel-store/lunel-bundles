/**
 * Bundles and minifies the Lunel assets served via CDN.
 * JS files are concatenated in load order (each is a guarded, self-executing
 * IIFE, so plain concatenation preserves behavior) then minified.
 * CSS files are concatenated and minified the same way.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

const ROOT = path.join(__dirname, '..');
const DIST = path.join(ROOT, 'dist');

const JS_ENTRIES = [
  'assets/js/lunel-constants.js',
  'assets/js/badge-icons.js',
  'assets/js/products.js',
  'assets/js/bundles.js',
  'assets/js/product-badges.js',
  'assets/js/custom-script.js',
  'assets/js/out-of-stock.js',
];

const CSS_ENTRIES = ['assets/css/salla-custom.css', 'assets/css/style.css'];

function concat(files) {
  return files
    .map((file) => fs.readFileSync(path.join(ROOT, file), 'utf8').trimEnd())
    .join('\n\n');
}

async function build() {
  fs.mkdirSync(DIST, { recursive: true });

  const jsSource = concat(JS_ENTRIES);
  const jsResult = await esbuild.transform(jsSource, {
    loader: 'js',
    minify: true,
    target: 'es2018',
  });
  fs.writeFileSync(path.join(DIST, 'lunel-bundle.min.js'), jsResult.code);

  const cssSource = concat(CSS_ENTRIES);
  const cssResult = await esbuild.transform(cssSource, {
    loader: 'css',
    minify: true,
  });
  fs.writeFileSync(path.join(DIST, 'lunel-bundle.min.css'), cssResult.code);

  console.log('Built dist/lunel-bundle.min.js and dist/lunel-bundle.min.css');
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});

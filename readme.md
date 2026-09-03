## Build

`init.js` loads the bundled, minified assets from `dist/`. After editing any
file under `assets/css` or `assets/js`, rebuild before committing:

```
npm install
npm run build
```

This regenerates `dist/lunel-bundle.min.css` and `dist/lunel-bundle.min.js`.

## Release

```
git tag -a v8.4.5.1 -m "Release v8.4.5.1"
```
```
git push origin v8.4.5.1
```
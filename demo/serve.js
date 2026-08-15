#!/usr/bin/env node
/**
 * Lunel Bundles — local demo server.
 * Serves the repository root so the demo pages under /demo/store/... can load
 * the real assets from /assets/... exactly like production.
 *
 * Usage (from anywhere):
 *   node demo/serve.js            # serves on http://localhost:8080
 *   node demo/serve.js 3000       # custom port
 *
 * Then open http://localhost:8080/demo/
 */
'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..'); // repo root
const PORT = Number(process.argv[2]) || 8080;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.json': 'application/json; charset=utf-8',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.mp4': 'video/mp4',
};

http
  .createServer((req, res) => {
    let pathname;
    try {
      pathname = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    } catch (_) {
      res.writeHead(400);
      return res.end('Bad request');
    }

    let filePath = path.join(ROOT, pathname);

    // Prevent path traversal outside the repo root.
    if (!filePath.startsWith(ROOT)) {
      res.writeHead(403);
      return res.end('Forbidden');
    }

    fs.stat(filePath, (err, stat) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        return res.end('404 Not Found: ' + pathname);
      }
      if (stat.isDirectory()) filePath = path.join(filePath, 'index.html');

      fs.readFile(filePath, (readErr, data) => {
        if (readErr) {
          res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
          return res.end('404 Not Found: ' + pathname);
        }
        res.writeHead(200, {
          'Content-Type':
            MIME[path.extname(filePath).toLowerCase()] ||
            'application/octet-stream',
          'Cache-Control': 'no-cache',
        });
        res.end(data);
      });
    });
  })
  .listen(PORT, () => {
    console.log('Lunel Bundles demo server running:');
    console.log('  http://localhost:' + PORT + '/demo/');
    console.log('Serving root: ' + ROOT);
    console.log('Press Ctrl+C to stop.');
  });

// Minimal static file server for the CRA build output.
//
// Why a hand-rolled server: Paketo's Node.js buildpack sets
// NODE_ENV=production and prunes devDependencies, which kills `serve`,
// `npx`, and `react-scripts start`. Node's built-in `http`/`fs` modules
// are always available in the launch image — no external runtime deps.
//
// Paketo's node-start buildpack auto-detects `server.cjs` (CommonJS
// extension matters when package.json lacks `"type": "module"`).
//
// SPA fallback: any unknown path returns index.html so client-side
// routing works.

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = parseInt(process.env.PORT || '8080', 10);
const BUILD_DIR = path.join(__dirname, 'build');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.map': 'application/json',
  '.txt': 'text/plain; charset=utf-8',
};

const send = (res, status, body, headers = {}) => {
  res.writeHead(status, headers);
  res.end(body);
};

const serveFile = (res, filePath) => {
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      return send(res, 404, 'Not found');
    }
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME[ext] || 'application/octet-stream';
    res.writeHead(200, {
      'Content-Type': contentType,
      'Content-Length': stats.size,
      'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=31536000',
    });
    fs.createReadStream(filePath).pipe(res);
  });
};

const server = http.createServer((req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    return send(res, 405, 'Method not allowed');
  }
  if (req.url === '/healthz') {
    return send(res, 200, 'ok', { 'Content-Type': 'text/plain' });
  }
  let pathname = decodeURIComponent(req.url.split('?')[0]);
  if (pathname === '/') pathname = '/index.html';
  // Block directory traversal — only files under BUILD_DIR.
  const resolved = path.normalize(path.join(BUILD_DIR, pathname));
  if (!resolved.startsWith(BUILD_DIR)) {
    return send(res, 403, 'Forbidden');
  }
  // SPA fallback: if the requested path has no extension and the file
  // doesn't exist, serve index.html so client-side routes work.
  fs.access(resolved, fs.constants.F_OK, (err) => {
    if (err) {
      const ext = path.extname(pathname);
      if (!ext) {
        return serveFile(res, path.join(BUILD_DIR, 'index.html'));
      }
      return send(res, 404, 'Not found');
    }
    serveFile(res, resolved);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Listening on 0.0.0.0:${PORT} (serving ${BUILD_DIR})`);
});

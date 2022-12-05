const url = require('url');
const http = require('http');
const path = require('path');
const fs = require('fs');
const LimitSizeStream = require('./LimitSizeStream');


const server = new http.Server();

server.on('request', (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname.slice(1);

  const filepath = path.join(__dirname, 'files', pathname);

  const limitedStream = new LimitSizeStream({limit: 1000000});

  switch (req.method) {
    case 'POST':
      if (pathname.includes('/')) {
        res.statusCode = 400;
        res.end('Prohibited directory');
        return;
      } 
      if (fs.existsSync(filepath)) {
        res.statusCode = 409;
        res.end('File already exists');
        return;
      }
      const fileWrite = fs.createWriteStream(filepath);
      
      req.pipe(limitedStream).pipe(fileWrite);

      limitedStream.on('end', () => {
      res.statusCode = 201;
      res.end('done');
      })

      limitedStream.on('error', (e) => {
        fileWrite.end();
        fs.unlink(filepath, () => console.log(e.message));
        res.statusCode = 413;
        res.end(e.message);
      })
      
      req.on('aborted', () => {
        fileWrite.end();
        limitedStream.destroy();
        fs.unlink(filepath, () => console.log('connection aborted'));
        res.end();
      });

      break;

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

module.exports = server;

const { createServer } = require('https');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');
const port = 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const httpsOptions = {
  key: fs.readFileSync('./localhost-key.pem'),
  cert: fs.readFileSync('./localhost.pem'),
};

app.prepare().then(() => {
  createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port, err => {
    if (err) throw err;
    console.log('ready - started server on url: https://localhost:' + port);
  });
});

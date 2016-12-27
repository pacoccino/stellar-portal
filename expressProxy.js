/* eslint-disable */

const express = require('express');
const path = require('path');
const httpProxy = require('express-http-proxy');

const proxy = process.env.PROXY || null;

const appPath = path.join(__dirname, 'build');

const proxyApi = httpProxy(proxy, {
  forwardPath: (req, res) => '/api' + req.url
});

const app = express();
app.set('port', process.env.PORT || 3000);

if (process.env.PROXY) {
  app.use('/api', proxyApi);
}

app.use(express.static(appPath));
app.get('/*', (req, res) => res.sendFile(path.join(appPath, 'index.html')));

app.listen(app.get('port'), () => console.log(`Server listening on port ${app.get('port')}`));

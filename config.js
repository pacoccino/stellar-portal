const path = require('path');

module.exports = {
  appPath: path.resolve.bind(path, 'app'),
  buildPath: path.resolve.bind(path, 'build'),
};
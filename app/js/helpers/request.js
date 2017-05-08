const fetch = require('isomorphic-fetch');
const qs = require('qs');

function request(o) {
  let uri = o.url;
  if(o.endpoint) {
    uri += o.endpoint;
  }
  if(o.qs) {
    uri += '?' + qs.stringify(o.qs);
  }

  const options = {
    method: o.method || 'GET',
    headers: Object.assign({}, o.headers),
  };

  if(o.body) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(o.body);
  }

  return fetch(uri, options)
    .then(response => {
      if(!response.ok) {
        throw response;
      }
      if(response.headers.get('Content-Type').includes('application/json')) {
        return response.json();
      } else {
        return response.text();
      }
    });
}

module.exports = request;
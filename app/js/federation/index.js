const request = require('../helpers/request');
import { StellarDataManager } from 'stellar-toolkit';


let federationUrl = "https://dex-backend.herokuapp.com/dex/user";
let trustUrl = "https://dex-backend.herokuapp.com/dex/trust";

function setUrl(url) {
  federationUrl = url;
}

function federationResolve(stellar_address) {
  return request({
    url: federationUrl,
    qs: {
      type: 'name',
      q: stellar_address,
    },
  });
}

function federationReverse(account_id) {
  return request({
    url: federationUrl,
    qs: {
      type: 'id',
      q: account_id,
    },
  });
}

function federationKeypair({ q, password }) {
  return request({
    url: federationUrl,
    qs: {
      type: 'keypair',
      q,
      password,
    },
  });
}

function federationCreate({ stellar_address, passport_nr, address, first_name, last_name }, keypair) {

  console.log(JSON.stringify({ stellar_address, passport_nr, address, first_name, last_name }));

  const body = {
    stellar_address,
    account_id: keypair.publicKey(),
    passport_nr,
    address,
    first_name,
    last_name,
  };
  const signature = StellarDataManager.sign(body, keypair.secret());
  return request({
    url: federationUrl,
    method: 'POST',
    body,
    headers: {
      signature,
    },
  });
}

function federationRegister({stellar_address, passport_nr, address, first_name, last_name }, keypair) {

  console.log(JSON.stringify({stellar_address, passport_nr, address, first_name, last_name}));

  const body = {
    stellar_address,
    account_id: keypair.publicKey(),
    passport_nr,
    address,
    first_name,
    last_name
  };
  const signature = StellarDataManager.sign(body, keypair.secret());

  return request({
    url: federationUrl,
    method: 'PUT',
    headers: {
      signature,
    },
    body,
  });
}

function federationDelete({ stellar_address, keypair }) {
  const body = {
    stellar_address,
    account_id: keypair.publicKey(),
  };
  const signature = StellarDataManager.sign(body, keypair.secret());

  return request({
    url: federationUrl,
    method: 'PUT',
    headers: {
      signature,
    },
    body,
  });
}

function federationTrust({ asset_code }, keypair) {

  const body = {
    asset_code,
    account_id: keypair.publicKey(),
  };
  const signature = StellarDataManager.sign(body, keypair.secret());

  return request({
    url: trustUrl,
    method: 'POST',
    headers: {
      signature,
    },
    body,
  });
}

module.exports = {
  setUrl,
  federationResolve,
  federationReverse,
  federationKeypair,
  federationCreate,
  federationRegister,
  federationDelete,
  federationTrust,
};
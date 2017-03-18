/* eslint-disable */
// import { CallBuilder } from 'stellar-sdk/lib/call_builder';

import* as mockData from'../initialStates/mockData';

class StellarOfflineCall {
  constructor(data, error) {
    this.data = data;
    this.error = error;
    this.called = false;
  }

  limit() {}
  order() {}
  cursor() {}

  call() {
    if(this.called) {
      throw'Instance already called';
    }
    this.called = true;

    return this.error ? Promise.reject(this.error) : Promise.resolve(this.data);
  }

  stream({ onmessage }) {
    if(!this.data) {
      throw'no endpoint defined';
    }

    /* TODO
     if(this.error) {
     return Promise.reject(this.error);
     }*/

    setInterval(() => {
      onmessage(this.data);
    }, 5000);
  }
}
class StellarOffline {
  constructor() {
    this.success = true;
  }

  success() {
    this.success = true;
  }
  error() {
    this.success = false;
  }

  accounts() {
    return new StellarOfflineCall([]);
  }

  effects() {
    return new StellarOfflineCall([]);
  }

  ledgers() {
    return new StellarOfflineCall([]);
  }
  loadAccount() {
    if(!this.success) { return new StellarOfflineCall(null, 'account error'); }
    return new StellarOfflineCall(mockData.account);
  }
  offers() {
    return new StellarOfflineCall([]);
  }
  operations() {
    return new StellarOfflineCall([]);
  }
  orderbook() {
    return new StellarOfflineCall([]);
  }
  paths() {
    return new StellarOfflineCall([]);
  }
  payments() {
    return new StellarOfflineCall([]);
  }
  paths() {
    return new StellarOfflineCall([]);
  }
  transactions() {
    return new StellarOfflineCall([]);
  }

  submitTransaction() {}

}

export default StellarOffline;

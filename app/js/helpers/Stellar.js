import Stellar from 'stellar-sdk';

const Server = new Stellar.Server('https://horizon-testnet.stellar.org');

export const getAccountBalance = (accountId) => {
  return Server.accounts()
    .accountId(accountId)
    .call()
    .then(account => account.balances);
};
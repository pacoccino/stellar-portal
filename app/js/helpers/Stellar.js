import Stellar from 'stellar-sdk';

const Server = new Stellar.Server('https://horizon-testnet.stellar.org');

const nativeAsset = Stellar.Asset.native();

export const getAccount = (accountId) => {
  return Server.accounts()
    .accountId(accountId)
    .call()
    .then(account => account);
};

export const getAccountBalance = (accountId) => {
  return Server.accounts()
    .accountId(accountId)
    .call()
    .then(account => {console.log(account); return account})
    .then(account => account.balances);
};

export const sendPayment = paymentData => {
  const sourceKeypair = Stellar.Keypair.fromSeed(paymentData.seed);
  const sourceAddress = sourceKeypair.accountId();
  const sourceAccount = new Stellar.Account(sourceAddress, paymentData.sequenceNumber);

  const transaction = new Stellar.TransactionBuilder(sourceAccount)
    .addOperation(Stellar.Operation.payment({
      destination: paymentData.destination,
      asset: nativeAsset,
      amount: paymentData.amount
    }))
    .build();

  transaction.sign(sourceKeypair);

  return Server.submitTransaction(transaction);
};
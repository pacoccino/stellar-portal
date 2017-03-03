
import { manageData } from './StellarOperations';

const encrypt = a => a;
const decrypt = a => a;

export const PASSWORD_FIELD = 'password';


export const getAccountSeed = (account, password) =>
  decrypt(account.data[PASSWORD_FIELD], password);

export const setAccountSeed = (authData, password) => {
  const encryptedSeed = encrypt(authData.keypair.secret(), password);
  const data = {
    PASSWORD_FIELD: encryptedSeed,
  };
  return manageData(data, authData);
};

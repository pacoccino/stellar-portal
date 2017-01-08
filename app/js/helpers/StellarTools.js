import { Asset, Keypair } from 'stellar-sdk';
import Decimal from 'decimal.js';

export const validPk = pk => {
  return Keypair.isValidPublicKey(pk);
};
export const validSeed = pk => {
  return Keypair.isValidPublicKey(pk);
};

export const AssetInstance = asset => {
  if(asset instanceof Asset) {
    return asset;
  }
  if(asset.asset_type === 'native') {
    return Asset.native();
  }
  return new Asset(asset.asset_code, asset.asset_issuer);
};

export const KeypairInstance = keypair => {
  if(keypair instanceof Keypair) {
    return keypair;
  }
  if(!!keypair.secretSeed) {
    return Keypair.fromSeed(keypair.secretSeed);
  }
  return Keypair.fromAccountId(keypair.publicKey);
};

export const AmountInstance = number => {
  const decimal = new Decimal(number);
  return decimal.toString();
};
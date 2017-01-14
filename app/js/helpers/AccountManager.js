import { setAccount } from '../actions-creators/account';

let store = null;

export const setStore = newStore => {
  store = newStore;
};

export const onPageLoad = nextState => {
  const { location: { query } } = nextState;
  if(query.accountId || query.secretSeed) {
    store.dispatch(setAccount({ publicKey: query.accountId, secretSeed: query.secretSeed }));
  }
};

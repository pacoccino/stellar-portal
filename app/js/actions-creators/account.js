import * as StellarServer from '../helpers/StellarServer';

import * as AccountActions from '../actions/account';
import { KeypairInstance} from '../helpers/StellarTools';

export const setAccount = keys => dispatch => {
  dispatch(AccountActions.fetchingAccount());

  const keypair = KeypairInstance(keys);

  return StellarServer
    .getAccount(keypair.accountId())
    .then(account => {
      dispatch(AccountActions.setAccountSuccess(account, keypair));
    })
    .catch(error => dispatch(AccountActions.getAccountError(error)));
};

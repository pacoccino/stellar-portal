import { connect } from 'react-redux';

import NetworkSwitcher from './component';
import { getAccounts, getKeypair } from '../../../selectors/account';
import { resetAccount, openAccountId } from '../../../actions-creators/account';

const mapStateToProps = (state) => {
  const accounts = getAccounts(state);
  const keypair = getKeypair(state);
  return {
    accounts,
    keypair,
  };
};

const mapDispatchToProps = {
  resetAccount,
  openAccountId,
};

export default connect(mapStateToProps, mapDispatchToProps)(NetworkSwitcher);

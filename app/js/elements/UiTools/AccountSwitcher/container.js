import { connect } from 'react-redux';

import NetworkSwitcher from './component';
import { getAccounts, getCurrentAccount } from '../../../selectors/account';
import { openAccountId } from '../../../actions-creators/account';

const mapStateToProps = (state) => {
  const accounts = getAccounts(state);
  const currentAccount = getCurrentAccount(state);
  return {
    accounts,
    currentAccount,
  };
};

const mapDispatchToProps = {
  openAccountId,
};

export default connect(mapStateToProps, mapDispatchToProps)(NetworkSwitcher);

import { connect } from 'react-redux';

import NetworkSwitcher from './component';
import { getAccounts } from '../../../selectors/account';
import { resetAccount } from '../../../actions-creators/account';

const mapStateToProps = (state) => {
  const accounts = getAccounts(state);
  return {
    accounts,
  };
};

const mapDispatchToProps = {
  resetAccount,
};

export default connect(mapStateToProps, mapDispatchToProps)(NetworkSwitcher);

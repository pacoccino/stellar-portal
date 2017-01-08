import { connect } from 'react-redux';

import { setAccount, switchNetwork } from '../../actions-creators/account';

import AccountSelector from './component';
import { isAccountLoading, getAccount, getAccountError, getKeypair, getNetwork } from '../../helpers/selector';

const mapStateToProps = (state) => ({
  isAccountLoading: isAccountLoading(state),
  account: getAccount(state),
  error: getAccountError(state),
  keypair: getKeypair(state),
  network: getNetwork(state),
});
const mapDispatchToProps = { setAccount, switchNetwork };

export default connect(mapStateToProps, mapDispatchToProps)(AccountSelector);

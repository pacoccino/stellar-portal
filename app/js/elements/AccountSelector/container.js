import { connect } from 'react-redux';

import { createTestAccount, setAccount } from '../../actions-creators/account';

import AccountSelector from './component';
import { isAccountLoading, isCreatingTestAccount, getAccount, getAccountError, getKeypair, getNetwork } from '../../helpers/selector';

const mapStateToProps = (state) => ({
  isAccountLoading: isAccountLoading(state),
  isCreatingTestAccount: isCreatingTestAccount(state),
  account: getAccount(state),
  error: getAccountError(state),
  keypair: getKeypair(state),
  network: getNetwork(state),
});
const mapDispatchToProps = { setAccount, createTestAccount };

export default connect(mapStateToProps, mapDispatchToProps)(AccountSelector);

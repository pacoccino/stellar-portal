import { connect } from 'react-redux';

import { setAccount } from '../../actions-creators/account';

import AccountSelector from './component';
import { isAccountLoading, getAccount, getAccountError, getKeypair } from '../../helpers/selector';

const mapStateToProps = (state) => ({
  isAccountLoading: isAccountLoading(state),
  account: getAccount(state),
  error: getAccountError(state),
  keypair: getKeypair(state)
});
const mapDispatchToProps = { setAccount };

export default connect(mapStateToProps, mapDispatchToProps)(AccountSelector);

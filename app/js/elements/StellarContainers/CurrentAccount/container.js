import { connect } from 'react-redux';

import CurrentAccount from './component';

import {
  getCurrentAccount,
} from '../../../selectors/account';
import {
  getNetwork,
} from '../../../selectors/stellarData';

const mapStateToProps = (state, ownProps) => {
  const currentAccount = getCurrentAccount(state);
  const currentKeypair = currentAccount && currentAccount.keypair;
  return {
    keypair: ownProps.keypair || currentKeypair,
    network: getNetwork(state),
    // openExternal: true,
  };
};

export default connect(mapStateToProps, null)(CurrentAccount);

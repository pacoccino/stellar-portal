import { connect } from 'react-redux';

import CurrentAccount from './component';

import {
  getKeypair,
} from '../../../selectors/account';
import {
  getNetwork,
} from '../../../selectors/stellarData';

const mapStateToProps = (state, ownProps) => ({
  keypair: ownProps.keypair || getKeypair(state),
  network: getNetwork(state),
});

export default connect(mapStateToProps, null)(CurrentAccount);

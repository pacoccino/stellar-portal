import { connect } from 'react-redux';

import CurrentAccount from './component';

import {
  getKeypair,
  getNetwork,
} from '../../../helpers/selector';

const mapStateToProps = (state, ownProps) => ({
  keypair: ownProps.keypair || getKeypair(state),
  network: getNetwork(state),
});

export default connect(mapStateToProps, null)(CurrentAccount);

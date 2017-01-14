import { connect } from 'react-redux';

import CurrentAccount from './component';

import {
  getAccount,
  getKeypair,
  canSign,
} from '../../../helpers/selector';

const mapStateToProps = (state) => ({
  account: getAccount(state),
  canSign: canSign(state),
  keypair: getKeypair(state),
});

export default connect(mapStateToProps, null)(CurrentAccount);

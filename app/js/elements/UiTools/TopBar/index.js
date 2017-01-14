import { connect } from 'react-redux';
import { push } from 'react-router-redux'

import Layout from './Layout';
import { getKeypair, isModalKeypairOpen } from '../../../helpers/selector';
import { openKeypairModal, closeKeypairModal } from '../../../actions/ui';

const mapStateToProps = (state) => ({
  keypair: getKeypair(state),
  keypairModalOpen: isModalKeypairOpen(state),
});

const mapDispatchToProps = dispatch => ({
  openKeypairModal: () => dispatch(openKeypairModal()),
  closeKeypairModal: () => dispatch(closeKeypairModal()),
  goHome: () => dispatch(push('/')),
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);

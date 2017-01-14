import { connect } from 'react-redux';

import Layout from './Layout';
import { isModalKeypairOpen } from '../../../helpers/selector';
import { openKeypairModal, closeKeypairModal } from '../../../actions/ui';

const mapStateToProps = (state) => ({
  keypairModalOpen: isModalKeypairOpen(state),
});

export default connect(mapStateToProps, { openKeypairModal, closeKeypairModal })(Layout);

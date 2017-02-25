import { connect } from 'react-redux';
import Component from './component';

import { getModalErrorOpen, getModalErrorData } from '../../../selectors/ui';
import { closeErrorModal } from '../../../actions/ui';

const mapStateToProps = state => ({
  open: getModalErrorOpen(state),
  errorData: getModalErrorData(state),
});

const mapDispatchToProps = { closeErrorModal };

export default connect(mapStateToProps, mapDispatchToProps)(Component);

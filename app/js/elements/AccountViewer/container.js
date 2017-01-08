import { connect } from 'react-redux';

import AccountViewer from './component';
import { getAccount, canSign } from '../../helpers/selector';

const mapStateToProps = (state) => ({
  account: getAccount(state),
  canSign: canSign(state),
});

export default connect(mapStateToProps, null)(AccountViewer);

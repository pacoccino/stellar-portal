import { connect } from 'react-redux';

import NetworkSwitcher from './component';
import { resetAccount } from '../../../actions-creators/account';

const mapDispatchToProps = {
  resetAccount,
};

export default connect(null, mapDispatchToProps)(NetworkSwitcher);

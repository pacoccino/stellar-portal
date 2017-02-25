import { connect } from 'react-redux';

import NetworkSwitcher from './component';
import { getNetwork } from '../../../selectors/stellarData';
import { switchNetwork } from '../../../actions-creators/account';

const mapStateToProps = state => ({
  network: getNetwork(state),
});

const mapDispatchToProps = {
  switchNetwork,
};

export default connect(mapStateToProps, mapDispatchToProps)(NetworkSwitcher);

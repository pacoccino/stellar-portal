import { connect } from 'react-redux';

import WelcomeScreen from './component';
import { accountSet, canSign, isAccountLoading } from '../../selectors/account';

const mapStateToProps = state => ({
  accountSet: accountSet(state),
  canSign: canSign(state),
  isAccountLoading: isAccountLoading(state),
});

export default connect(mapStateToProps, null)(WelcomeScreen);

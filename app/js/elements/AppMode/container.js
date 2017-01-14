import { connect } from 'react-redux';

import WelcomeScreen from './component';
import { accountSet, canSign } from '../../helpers/selector';

const mapStateToProps = (state) => ({
  accountSet: accountSet(state),
  canSign: canSign(state),
});

export default connect(mapStateToProps, null)(WelcomeScreen);

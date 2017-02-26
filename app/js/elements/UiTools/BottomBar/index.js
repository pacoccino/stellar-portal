import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import BottomBar from './BottomBar';

const mapDispatchToProps = dispatch => ({
  goDesktop: () => dispatch(push('/desktop')),
});

export default connect(null, mapDispatchToProps)(BottomBar);

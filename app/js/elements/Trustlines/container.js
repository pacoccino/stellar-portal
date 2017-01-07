import { connect } from 'react-redux';
import Component from './component'

import { changeTrust, deleteTrustline } from '../../actions-creators/stellar';
import { getTrustlines } from '../../selectors/selector';

const mapStateToProps = (state) => ({
  trustlines: getTrustlines(state),
});

const mapDispatchToProps = { changeTrust, deleteTrustline };

export default connect(mapStateToProps, mapDispatchToProps)(Component);

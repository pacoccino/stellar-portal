import { connect } from 'react-redux';
import Component from './component'

import { getTrustlines, getOrderbook } from '../../helpers/selector';
import { setOrderbook } from '../../actions-creators/stellar';

const mapStateToProps = (state) => ({
  orderbook: getOrderbook(state),
  trustlines: getTrustlines(state),
});

const mapDispatchToProps = { setOrderbook };

export default connect(mapStateToProps, mapDispatchToProps)(Component);

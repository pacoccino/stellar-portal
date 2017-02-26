import { connect } from 'react-redux';
import Component from './component';

import { getTrustlines, isFetchingOrderbook, getOrderbook } from '../../../selectors/stellarData';
import { setOrderbook } from '../../../actions-creators/stellar';

const mapStateToProps = state => ({
  isFetching: isFetchingOrderbook(state),
  orderbook: getOrderbook(state),
  trustlines: getTrustlines(state),
});

const mapDispatchToProps = { setOrderbook };

export default connect(mapStateToProps, mapDispatchToProps)(Component);

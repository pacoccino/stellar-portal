import { connect } from 'react-redux';
import Component from './component'

import { getOffers, getTrustlines } from '../../helpers/selector';
import { createOffer, deleteOffer } from '../../actions-creators/stellar';

const mapStateToProps = (state) => ({
  offers: getOffers(state),
  trustlines: getTrustlines(state),
});

const mapDispatchToProps = { createOffer, deleteOffer };

export default connect(mapStateToProps, mapDispatchToProps)(Component);

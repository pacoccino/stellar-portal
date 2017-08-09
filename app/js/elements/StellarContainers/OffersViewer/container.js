import { connect } from 'react-redux';
import Component from './component';

import { isSendingOffer } from '../../../selectors/ui';
import { canSign } from '../../../selectors/account';
import { getOffers, getTrustlines } from '../../../selectors/stellarData';
import { createOffer, deleteOffer } from '../../../actions-creators/stellar';

const mapStateToProps = state => ({
  offers: getOffers(state),
  trustlines: getTrustlines(state),
  canSign: canSign(state),
  sendingOffer: isSendingOffer(state),
});

const mapDispatchToProps = { createOffer, deleteOffer };

export default connect(mapStateToProps, mapDispatchToProps)(Component);

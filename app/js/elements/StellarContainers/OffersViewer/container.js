import { connect } from 'react-redux';

import { asyncSelectorObject } from 'js/helpers/asyncActions/selectors';
import { ASYNC_CREATE_OFFER } from 'js/constants/asyncActions';

import Component from './component';

import { canSign } from '../../../selectors/account';
import { getOffers, getTrustlines } from '../../../selectors/stellarData';
import { createOffer, deleteOffer } from '../../../actions-creators/stellar';

const mapStateToProps = state => ({
  offers: getOffers(state),
  trustlines: getTrustlines(state),
  canSign: canSign(state),
  sendingOffer: asyncSelectorObject(ASYNC_CREATE_OFFER).isLoading(state),
  offerSuccess: asyncSelectorObject(ASYNC_CREATE_OFFER).displayMessage(state),
});

const mapDispatchToProps = { createOffer, deleteOffer };

export default connect(mapStateToProps, mapDispatchToProps)(Component);

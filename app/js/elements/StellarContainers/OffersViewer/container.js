import { connect } from 'react-redux';
import { reduxForm, getFormValues } from 'redux-form';
import { StellarTools } from 'stellar-toolkit';
import { find } from 'lodash';

import { asyncSelectorObject } from 'js/helpers/asyncActions/selectors';
import { ASYNC_CREATE_OFFER } from 'js/constants/asyncActions';

import Component from './component';

import { canSign } from '../../../selectors/account';
import { getOffers, getTrustlines } from '../../../selectors/stellarData';
import { setOrderbook, createOffer, deleteOffer } from '../../../actions-creators/stellar';

const { AssetUid } = StellarTools;

const mapStateToProps = state => ({
  offers: getOffers(state),
  trustlines: getTrustlines(state),
  canSign: canSign(state),
  sendingOffer: asyncSelectorObject(ASYNC_CREATE_OFFER).isLoading(state),
  values: getFormValues(FORM_NAME)(state),
  initialValues: {},
});

const mapDispatchToProps = dispatch => ({
  deleteOffer(offer) {
    dispatch(deleteOffer(offer));
  },
  setOrderbook(assetCouple) {
    dispatch(setOrderbook(assetCouple));
  },
  onSubmit(values, a, props) {
    const selling = find(props.trustlines, t => (AssetUid(t) === values.sell_asset));
    const buying = find(props.trustlines, t => (AssetUid(t) === values.buy_asset));

    const offerData = {
      selling,
      buying,
      amount: values.amount,
      price: values.price,
      passive: values.passive,
    };

    console.log(offerData)
    return dispatch(createOffer(offerData)).then(() => {
      setTimeout(() => {
        props.reset();
      }, 5000);
    });
  },
});

const FORM_NAME = 'offer-form';

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: FORM_NAME, // a unique name for this form
})(Component));
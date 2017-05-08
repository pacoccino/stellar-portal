import { connect } from 'react-redux';
import { reduxForm, getFormValues } from 'redux-form';
import { StellarTools } from 'stellar-toolkit';
import { find } from 'lodash';

import { asyncSelectorObject } from 'js/helpers/asyncActions/selectors';
import { ASYNC_CREATE_OFFER } from 'js/constants/asyncActions';

import Component from './component';

import { getKeypair, canSign } from '../../../selectors/account';
import { getOffers, getTrustlines } from '../../../selectors/stellarData';
import { setOrderbook, createOffer, deleteOffer } from '../../../actions-creators/stellar';

const { AssetUid } = StellarTools;

const FORM_NAME = 'consume-form';

const mapStateToProps = state => ({
  keypair: getKeypair(state),
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

    return dispatch(createOffer(offerData)).then(() => {
      setTimeout(() => {
        props.reset();
      }, 5000);
    });
  },
});

export default reduxForm({
  form: FORM_NAME, // a unique name for this form
})(connect(mapStateToProps, mapDispatchToProps)(Component));
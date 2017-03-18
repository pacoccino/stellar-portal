import { connect } from 'react-redux';
import { reduxForm, getFormValues } from 'redux-form';

import Payment from './component';
import {
  sendOperation,
  getDestinationTrustlines,
} from '../../../actions-creators/stellar';
import {
  canSign,
  getAccount,
} from '../../../selectors/account';
import {
  getTrustlines,
} from '../../../selectors/stellarData';

import {
  getDestinationTrustlines as getDestinationTrustlinesSelector,
  isSendingPayment,
} from '../../../selectors/ui';

const FORM_NAME = 'payment-form';

const mapStateToProps = state => ({
  account: getAccount(state),
  trustlines: getTrustlines(state),
  canSign: canSign(state),
  sendingPayment: isSendingPayment(state),
  destinationTruslines: getDestinationTrustlinesSelector(state),

  values: getFormValues(FORM_NAME)(state),
});

const mapDispatchToProps = {
  sendOperation,
  getDestinationTrustlines,
};

export default reduxForm({
  form: FORM_NAME, // a unique name for this form
  initialValues: {
    memo: {
      type: 'none',
    },
  }
})(connect(mapStateToProps, mapDispatchToProps)(Payment));

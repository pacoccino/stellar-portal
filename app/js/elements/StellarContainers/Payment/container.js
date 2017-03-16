import { connect } from 'react-redux';
import { reduxForm, getFormValues } from 'redux-form';

import Payment from './component';
import {
  sendPayment,
  sendIssuePayment,
  sendPathPayment,
  sendCreateAccount,
  sendAccountMerge,
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

  values: getFormValues(FORM_NAME)(state) || {}, // WHY object ?
});

const mapDispatchToProps = {
  sendPayment,
  sendIssuePayment,
  sendPathPayment,
  sendCreateAccount,
  sendAccountMerge,
  getDestinationTrustlines,
};

export default reduxForm({
  form: FORM_NAME, // a unique name for this form
})(connect(mapStateToProps, mapDispatchToProps)(Payment));

import { connect } from 'react-redux';

import { asyncMessageSelector } from 'js/helpers/asyncActions/selectors';
import { ASYNC_SEND_OPERATION } from 'js/constants/asyncActions';

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

const mapStateToProps = state => ({
  account: getAccount(state),
  trustlines: getTrustlines(state),
  canSign: canSign(state),
  sendingPayment: isSendingPayment(state),
  destinationTruslines: getDestinationTrustlinesSelector(state),
  paymentSuccess: asyncMessageSelector(ASYNC_SEND_OPERATION)(state),
});
const mapDispatchToProps = {
  sendPayment,
  sendIssuePayment,
  sendPathPayment,
  sendCreateAccount,
  sendAccountMerge,
  getDestinationTrustlines,
};

export default connect(mapStateToProps, mapDispatchToProps)(Payment);

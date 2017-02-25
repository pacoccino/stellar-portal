import { connect } from 'react-redux';

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
} from '../../../selectors/stellarData';

const mapStateToProps = (state) => ({
  account: getAccount(state),
  trustlines: getTrustlines(state),
  canSign: canSign(state),
  sendingPayment: isSendingPayment(state),
  destinationTruslines: getDestinationTrustlinesSelector(state),
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

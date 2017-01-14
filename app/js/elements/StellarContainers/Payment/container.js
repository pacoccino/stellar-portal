import { connect } from 'react-redux';

import Payment from './component';
import {
  sendPayment,
  sendIssuePayment,
  sendPathPayment,
  sendCreateAccount,
  sendAccountMerge,
} from '../../../actions-creators/stellar';
import { canSign, getAccount, getTrustlines, isSendingPayment } from '../../../helpers/selector';

const mapStateToProps = (state) => ({
  account: getAccount(state),
  trustlines: getTrustlines(state),
  canSign: canSign(state),
  sendingPayment: isSendingPayment(state),
});
const mapDispatchToProps = {
  sendPayment,
  sendIssuePayment,
  sendPathPayment,
  sendCreateAccount,
  sendAccountMerge,
};

export default connect(mapStateToProps, mapDispatchToProps)(Payment);

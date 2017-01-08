import { connect } from 'react-redux';

import Payment from './component';
import { sendPayment, sendIssuePayment, sendPathPayment } from '../../actions-creators/stellar';
import { getAccount, getTrustlines } from '../../helpers/selector';

const mapStateToProps = (state) => ({
  account: getAccount(state),
  trustlines: getTrustlines(state),
});
const mapDispatchToProps = {
  sendPayment,
  sendIssuePayment,
  sendPathPayment,
};

export default connect(mapStateToProps, mapDispatchToProps)(Payment);

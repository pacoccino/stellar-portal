import { connect } from 'react-redux';

import Payment from '../../components/stellar/Payment';
import { sendPayment } from '../../actions-creators/stellar';
import { getAccount, getTrustlines } from '../../selectors/selector';

const mapStateToProps = (state) => ({
  account: getAccount(state),
  trustlines: getTrustlines(state),
});
const mapDispatchToProps = { sendPayment };

export default connect(mapStateToProps, mapDispatchToProps)(Payment);

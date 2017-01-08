import { connect } from 'react-redux';

import Payment from './component';
import { sendPayment } from '../../actions-creators/stellar';
import { getAccount, getTrustlines } from '../../helpers/selector';

const mapStateToProps = (state) => ({
  account: getAccount(state),
  trustlines: getTrustlines(state),
});
const mapDispatchToProps = { sendPayment };

export default connect(mapStateToProps, mapDispatchToProps)(Payment);

import { connect } from 'react-redux';

import Payment from '../../components/stellar/Payment';
import { sendPayment } from '../../actions-creators/account';

const mapStateToProps = ({ account }) => ({ account: account.data });
const mapDispatchToProps = { sendPayment };

export default connect(mapStateToProps, mapDispatchToProps)(Payment);

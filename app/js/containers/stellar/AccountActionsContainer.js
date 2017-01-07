import { connect } from 'react-redux';

import AccountActions from '../../components/stellar/AccountActions';
import { getAccountData } from '../../selectors/selector';

const mapStateToProps = (state) => ({ account: getAccountData(state) });

export default connect(mapStateToProps, null)(AccountActions);

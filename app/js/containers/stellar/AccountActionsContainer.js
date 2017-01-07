import { connect } from 'react-redux';

import AccountActions from '../../components/stellar/AccountActions';
import { getAccount } from '../../selectors/selector';

const mapStateToProps = (state) => ({ account: getAccount(state) });

export default connect(mapStateToProps, null)(AccountActions);

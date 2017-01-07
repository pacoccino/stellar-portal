import { connect } from 'react-redux';

import AccountViewer from '../../components/stellar/AccountViewer';
import { getAccount } from '../../selectors/selector';

const mapStateToProps = (state) => ({ account: getAccount(state) });

export default connect(mapStateToProps, null)(AccountViewer);

import { connect } from 'react-redux';

import AccountViewer from '../../components/stellar/AccountViewer';
import { getAccountData } from '../../selectors/selector';

const mapStateToProps = (state) => ({ account: getAccountData(state) });

export default connect(mapStateToProps, null)(AccountViewer);

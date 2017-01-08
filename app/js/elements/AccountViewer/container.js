import { connect } from 'react-redux';

import AccountViewer from './component';
import { getAccount } from '../../helpers/selector';

const mapStateToProps = (state) => ({ account: getAccount(state) });

export default connect(mapStateToProps, null)(AccountViewer);

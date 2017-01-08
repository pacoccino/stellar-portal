import { connect } from 'react-redux';

import AccountActions from './component';
import { getAccount } from '../../helpers/selector';

const mapStateToProps = (state) => ({ account: getAccount(state) });

export default connect(mapStateToProps, null)(AccountActions);

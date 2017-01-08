import { connect } from 'react-redux';

import { setAccount } from '../../actions-creators/account';

import AccountSelector from './component';

const mapStateToProps = ({ account }) => ({ account });
const mapDispatchToProps = { setAccount };

export default connect(mapStateToProps, mapDispatchToProps)(AccountSelector);

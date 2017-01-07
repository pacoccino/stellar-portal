import { connect } from 'react-redux';

import { getAccount } from '../../actions-creators/account';

import AccountSelector from '../../components/stellar/AccountSelector';

const mapStateToProps = ({ account }) => ({ account });
const mapDispatchToProps = { getAccount };

export default connect(mapStateToProps, mapDispatchToProps)(AccountSelector);

import { connect } from 'react-redux';
import Component from './component'

import { getAccount, getPayments } from '../../helpers/selector';

const mapStateToProps = (state) => ({
  payments: getPayments(state),
  account: getAccount(state),
});

export default connect(mapStateToProps, null)(Component);

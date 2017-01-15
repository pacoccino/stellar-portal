import { connect } from 'react-redux';
import Component from './component'

import { getAccount } from '../../../helpers/selector';
import { getPaymentsFromPayments, getPathPaymentsFromPayments } from '../../../selectors/stellarData';

const mapStateToProps = (state) => ({
  payments: getPaymentsFromPayments(state),
  pathPayments: getPathPaymentsFromPayments(state),
  account: getAccount(state),
});

export default connect(mapStateToProps, null)(Component);

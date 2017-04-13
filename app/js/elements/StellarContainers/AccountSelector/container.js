import { connect } from 'react-redux';
import { reduxForm, getFormValues } from 'redux-form';

import { createTestAccount, setAccount } from '../../../actions-creators/account';

import AccountSelector from './component';
import {
  isAccountLoading,
  isCreatingTestAccount,
  getAccountError,
  canSign,
} from '../../../selectors/account';
import {
  getNetwork,
} from '../../../selectors/stellarData';

const FORM_NAME = 'account-selector';

const mapStateToProps = state => ({
  isAccountLoading: isAccountLoading(state),
  isCreatingTestAccount: isCreatingTestAccount(state),
  canSign: canSign(state),
  error: getAccountError(state),
  network: getNetwork(state),

  values: getFormValues(FORM_NAME)(state),
});

const mapDispatchToProps = { setAccount, createTestAccount };

export default reduxForm({
  form: FORM_NAME,
  initialValues: {},
})(connect(mapStateToProps, mapDispatchToProps)(AccountSelector));

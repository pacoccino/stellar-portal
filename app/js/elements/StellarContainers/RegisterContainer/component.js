import React, { Component, PropTypes } from 'react';
import { Form, Container, Button, Checkbox } from 'semantic-ui-react';
import Clipboard from 'clipboard';
import { Field, propTypes } from 'redux-form';

import { StellarTools } from 'stellar-toolkit';
import InputFormField from '../../UiTools/SemanticForm/Input';

const styles = {
  inputContainer: {
    width: '720px',
    maxWidth: '90%',
    margin: 'auto',
  },
};

class RegisterContainer extends Component {

  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(newProps) {
  }

  componentDidMount() {
  }

  newForm() {
    return (
      <div style={styles.inputCntainer}>
        <Form>
          <Form.Field>
            <label>First Name</label>
            <input placeholder='First Name' />
          </Form.Field>
          <Form.Field>
            <label>Last Name</label>
            <input placeholder='Last Name' />
          </Form.Field>
          <Form.Field>
            <Checkbox label='I agree to the Terms and Conditions' />
          </Form.Field>
          <Button type='submit'>Submit</Button>
        </Form>
      </div>
    );
  }

  render() {
    return (
      <div>
        <Container textAlign="center">
          {this.newForm()}
        </Container>
      </div>
    );
  }
}

RegisterContainer.propTypes = {
  isAccountLoading: PropTypes.bool,
  isCreatingTestAccount: PropTypes.bool,
  error: PropTypes.object,
  keypair: PropTypes.object,
  setAccount: PropTypes.func.isRequired,
  createTestAccount: PropTypes.func.isRequired,
  network: PropTypes.string.isRequired,
  ...propTypes,
};

export default RegisterContainer;

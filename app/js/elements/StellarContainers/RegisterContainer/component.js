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
         <Form onSubmit={this.props.createTestAccount}>
           <Form.Group>
              <Form.Input name= "user_name" placeholder='User Name' width={7} />
              <Form.Input name= "password" type="password" placeholder='Password' width={7} />
            </Form.Group>
            <Form.Group>
              <Form.Input name= "first_name" placeholder='First Name' width={5} />
              <Form.Input name= "last_name" placeholder='Last Name' width={5} />
            </Form.Group>
            <Form.Group>
              <Form.Input name= "address_nr" placeholder='No.' width={1} />
              <Form.Input name= "street" placeholder='Street' width={4} />
              <Form.Input name= "postal_code" placeholder='Postal Code' width={3} />
              <Form.Input name= "city" placeholder='City' width={3} />
              <Form.Input name= "country" placeholder='Country' width={3} />
            </Form.Group>
            <Form.Group>
              <Form.Input name= "passport_nr" placeholder='Passport Number' width={6} />
            </Form.Group>
          <Button type='submit'>Register</Button>
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

import React, { Component, PropTypes } from 'react';
import { Icon, Header, Segment, Grid, Form, Container, Button, Checkbox, Dropdown, Input } from 'semantic-ui-react';
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
      <div style={styles.inputContainer}>
        <Header as='h2'>
          <Icon name='user' />
          <Header.Content>
            Asset Registration
          </Header.Content>
        </Header>
        <Segment color="blue">
          Please enter your assets to register on the exchange platform.
        </Segment>
        <Form onSubmit={this.props.createAsset}>
        <Form.Field>
          <label>Asset Code:</label>
          <input placeholder='code' name='asset_code' />
        </Form.Field>
        <Form.Field>
          <label>Asset Amount:</label>
          <input placeholder='amount' name='asset_amount' />
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
  createAsset: PropTypes.func.isRequired,
  network: PropTypes.string.isRequired,
  ...propTypes,
};

export default RegisterContainer;

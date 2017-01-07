import React, { Component, PropTypes } from 'react';
import { Button, Header, Form, Message } from 'semantic-ui-react'

class Payment extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedAsset: null,
    };
  }
  sendPayment(e, { formData }) {
    e.preventDefault();
    formData.asset = this.props.trustlines[formData.asset].asset;
    this.props.sendPayment(formData);
  };

  render() {
    return (
      <div>
        <Header as="h3">
          Payment
        </Header>
        {this.state.selectedAsset ? <Asset {...this.state.selectedAsset} /> : null}
        <Form onSubmit={::this.sendPayment}>
          <Form.Field
            label='Asset' control='select'
            name="asset"
          >
            {this.props.trustlines.map((t, index) => (
              <option key={index} value={index}>{t.label}</option>
            ))}
          </Form.Field>
          {this.state.selectedAsset ? <Asset {...this.state.selectedAsset} /> : null}
          <Form.Field
            name="destination"
            label='Destination account'
            control='input'
            type='text'
            placeholder='GRDT...'
            required
          />
          <Form.Field
            name="amount"
            label='Amount'
            control='input'
            type='number'
            min={0}
            placeholder='0'
            required
          />
          <Button type='submit'>Send</Button>

          <Message
            success
            header='Payment completed !'
            content="You've successfuly sent some money"
          />
          <Message
            error
            header='Payment error'
            content='There was a problem during the payment'
          />
          <Message
            warning
            header='Invalid address'
            content='The address you entered is not a valid stellar address'
          />
        </Form>
      </div>
    );
  }
}

Payment.propTypes = {
  sendPayment: PropTypes.func.isRequired,
  account: PropTypes.object,
  trustlines: PropTypes.array,
};

export default Payment;

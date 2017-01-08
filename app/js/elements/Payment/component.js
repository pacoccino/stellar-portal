import React, { Component, PropTypes } from 'react';
import { Button, Header, Form, Message } from 'semantic-ui-react'

import Asset from '../../components/stellar/Asset';

class Payment extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedAsset: null,
    };
  }
  sendPayment(e, { formData }) {
    e.preventDefault();
    formData.asset = this.props.trustlines[formData.asset];
    formData.asset_destination = formData.asset_destination ? this.props.trustlines[formData.asset_destination] : null;
    this.props.sendPayment(formData);
  };

  render() {
    const getAssetsOptions = assets => assets.map((asset, index) => (
    {
      value: index,
      text: Asset.getAssetString(asset),
    }));

    return (
      <div>
        <Header as="h3">
          Payment
        </Header>
        <Form onSubmit={::this.sendPayment}>
          <Form.Select
            label='Source asset'
            name='asset'
            options={getAssetsOptions(this.props.trustlines)}
            placeholder='Asset to send'
            required
          />
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

          <Form.Select
            label='Destination asset'
            name='asset_destination'
            options={getAssetsOptions(this.props.trustlines)}
            placeholder='Asset to receive'
          />

          <Form.Field
            name="amount_destination"
            label='Destination amount'
            control='input'
            type='number'
            min={0}
            placeholder='0'
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

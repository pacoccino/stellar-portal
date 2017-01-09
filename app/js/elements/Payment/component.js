import React, { Component, PropTypes } from 'react';
import { Button, Header, Form, Message } from 'semantic-ui-react'

import Asset from '../../components/stellar/Asset';

const styles = {
  padV: {
    margin: '1rem 0',
  },
};

class Payment extends Component {

  constructor(props) {
    super(props);
    this.state = {
      type: 'payment',
    };
  }

  submitForm(e, {formData}) {
    e.preventDefault();
    switch(this.state.type) {
      case 'payment': {
        formData.asset = this.props.trustlines[formData.asset];
        this.props.sendPayment(formData);
        break;
      }
      case 'path_payment': {
        if(formData.asset_source === formData.asset_destination) {
          return;
        }
        formData.asset_source = this.props.trustlines[formData.asset_source];
        formData.asset_destination = this.props.trustlines[formData.asset_destination];
        this.props.sendPathPayment(formData);
        break;
      }
      case 'issue_asset': {
        formData.accountId = this.props.account.account_id;
        this.props.sendIssuePayment(formData);
        break;
      }
    }
  }

  getPaymentForm() {
    const getAssetsOptions = assets => assets.map((asset, index) => (
    {
      value: index,
      text: Asset.getAssetString(asset),
    }));

    return (
      <div>
        <Form.Select
          label='Source asset'
          name='asset'
          options={getAssetsOptions(this.props.trustlines)}
          placeholder='Asset to send'
          required
        />
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
      </div>
    );
  }

  getPathPaymentForm() {
    const getAssetsOptions = assets => assets.map((asset, index) => (
    {
      value: index,
      text: Asset.getAssetString(asset),
    }));

    return (
      <div>
        <Form.Group>
          <Form.Select
            label='Source asset'
            name='asset_source'
            options={getAssetsOptions(this.props.trustlines)}
            placeholder='Asset to send'
            required
          />
          <Form.Select
            label='Destination asset'
            name='asset_destination'
            options={getAssetsOptions(this.props.trustlines)}
            placeholder='Asset to receive'
          />
        </Form.Group>
        <Form.Field
          name="destination"
          label='Destination account'
          control='input'
          type='text'
          placeholder='GRDT...'
          required
        />
        <Form.Field
          name="max_amount"
          label='Maximum amount to send'
          control='input'
          type='number'
          min={0}
          placeholder='0'
          required
        />
        <Form.Field
          name="amount_destination"
          label='Amount to receive'
          control='input'
          type='number'
          min={0}
          placeholder='0'
          required
        />
      </div>
    );
  }

  getIssueForm() {

    return (
      <div>
        <Form.Field
          name="asset_code"
          label='Code'
          control='input'
          type='text'
          placeholder='EUR'
          required
        />
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
      </div>
    );
  }

  getNoSigner() {
    return (
      <div>
        Can't make payment with public key.
      </div>
    )
  }

  render() {
    if(!this.props.canSign) return this.getNoSigner();

    return (
      <div>
        <Header as="h2">
          Payment
        </Header>
        <Button.Group fluid style={styles.padV}>
          <Button
            positive={this.state.type === 'payment'}
            onClick={() => this.setState({type: 'payment'})}
          >
            Payment
          </Button>
          <Button
            positive={this.state.type === 'path_payment'}
            onClick={() => this.setState({type: 'path_payment'})}
          >
            Path payment
          </Button>
          <Button
            positive={this.state.type === 'issue_asset'}
            onClick={() => this.setState({type: 'issue_asset'})}
          >
            Issue asset
          </Button>
        </Button.Group>
        <Form onSubmit={::this.submitForm}
        loading={this.props.sendingPayment}>

          {this.state.type === 'payment' ? this.getPaymentForm() : null}
          {this.state.type === 'path_payment' ? this.getPathPaymentForm() : null}
          {this.state.type === 'issue_asset' ? this.getIssueForm() : null}

          <Form.Button
            type='submit'
            fluid
            style={styles.padV}
            primary
          >Send</Form.Button>

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
  sendingPayment: PropTypes.bool,
  sendPayment: PropTypes.func.isRequired,
  sendPathPayment: PropTypes.func.isRequired,
  sendIssuePayment: PropTypes.func.isRequired,
  account: PropTypes.object,
  trustlines: PropTypes.array,
  canSign: PropTypes.bool,
};

export default Payment;

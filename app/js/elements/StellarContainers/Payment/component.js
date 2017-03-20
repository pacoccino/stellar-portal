import React, { Component, PropTypes } from 'react';
import { Dimmer, Dropdown, Header, Form, Message } from 'semantic-ui-react';

import style from './style.css';

import Asset from '../../../components/stellar/Asset';
import { STROOP, validPk } from '../../../helpers/StellarTools';

function MemoFields() {
  const types = [
    {
      value: 'none',
      text: 'None',
    },
    {
      value: 'text',
      text: 'Text',
    },
    {
      value: 'id',
      text: 'ID',
    },
    {
      value: 'hash',
      text: 'Hash',
    },
    {
      value: 'returnHash',
      text: 'Return Hash',
    },
  ];

  return (
    <Form.Group widths="two">
      <Form.Select
        label="Memo type"
        name="memo.type"
        options={types}
        defaultValue="none"
      />
      <Form.Field
        name="memo.value"
        label="Memo Value"
        control="input"
        type="text"
        placeholder="Memo"
      />
    </Form.Group>
  );
}
class Payment extends Component {

  constructor(props) {
    super(props);
    this.state = {
      type: 'payment',
      validDestination: true,
      customDestination: false,
      showConfirmation: false,
    };
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
          label="Source asset"
          name="asset"
          options={getAssetsOptions(this.props.trustlines)}
          placeholder="Asset to send"
          required
        />
        <Form.Field
          name="amount"
          label="Amount"
          control="input"
          type="number"
          min={0}
          step={STROOP}
          placeholder="0"
          required
        />
        <MemoFields />
      </div>
    );
  }

  getPathPaymentForm() {
    const sourceAssets = this.props.trustlines.map((asset, index) => (
      {
        value: index,
        text: Asset.getAssetString(asset),
      }));
    const destAssets = this.props.destinationTruslines.map((asset, index) => (
      {
        value: index,
        text: Asset.getAssetString(asset),
      }));

    return (
      <div>
        <Form.Group widths="2">
          <Form.Select
            label="Source asset"
            name="asset_source"
            options={sourceAssets}
            placeholder="Asset to send"
            required
          />
          <Form.Select
            label="Destination asset"
            name="asset_destination"
            options={destAssets}
            placeholder="Asset to receive"
            required
          />
        </Form.Group>
        <Form.Field
          name="max_amount"
          label="Maximum amount to send"
          control="input"
          type="number"
          min={0}
          step={STROOP}
          placeholder="0"
          required
        />
        <Form.Field
          name="amount_destination"
          label="Amount to receive"
          control="input"
          type="number"
          min={0}
          step={STROOP}
          placeholder="0"
          required
        />
        <MemoFields />
      </div>
    );
  }

  getIssueForm() {
    return (
      <div>
        <Form.Field
          name="asset_code"
          label="Code"
          control="input"
          type="text"
          placeholder="EUR"
          required
        />
        <Form.Field
          name="amount"
          label="Amount"
          control="input"
          type="number"
          min={0}
          step={STROOP}
          placeholder="0"
          required
        />
      </div>
    );
  }

  getCreateAccountForm() {
    return (
      <div>
        <p>
          Click on "Generate keypair" on the menu bar to get a new couple of public and secret key.
        </p>
        <Form.Field
          name="amount"
          label="Starting balance"
          control="input"
          type="number"
          min={0}
          step={STROOP}
          placeholder="0"
          required
        />
      </div>
    );
  }

  getAccountMergeForm() {
    return null;
  }

  getNoSigner() {
    return (
      <div>
        Cannot make payment with public key.
      </div>
    );
  }

  submitForm(e, { formData }) {
    e.preventDefault();
    if (!validPk(formData.destination)) {
      return;
    }
    const enhancedFormData = { ...formData };
    enhancedFormData.memo = {
      type: enhancedFormData['memo.type'],
      value: enhancedFormData['memo.value'],
    };
    switch (this.state.type) {
      case 'payment': {
        enhancedFormData.asset = this.props.trustlines[enhancedFormData.asset];
        this.props.sendPayment(enhancedFormData);
        break;
      }
      case 'path_payment': {
        enhancedFormData.asset_source =
          this.props.trustlines[enhancedFormData.asset_source];
        enhancedFormData.asset_destination =
          this.props.destinationTruslines[enhancedFormData.asset_destination];
        this.props.sendPathPayment(enhancedFormData);
        break;
      }
      case 'issue_asset': {
        enhancedFormData.accountId = this.props.account.account_id;
        this.props.sendIssuePayment(enhancedFormData);
        break;
      }
      case 'create_account': {
        this.props.sendCreateAccount(enhancedFormData);
        break;
      }
      case 'account_merge': {
        this.props.sendAccountMerge(enhancedFormData);
        break;
      }
    }
    // TODO sendOperation.then => showConfirmation=true
  }

  checkDestination(e) {
    const destinationAddress = e.target.value;
    const validDestination = validPk(destinationAddress);
    this.setState({ validDestination });
    if (validDestination) {
      this.props.getDestinationTrustlines(destinationAddress);
    }
  }

  render() {
    if (!this.props.canSign) return this.getNoSigner();

    return (
      <div>
        <Dimmer className="successDimmer" active={this.state.showConfirmation}>
          Sent
        </Dimmer>
        <Header as="h2" textAlign="center">
          Operations
        </Header>
        <Dropdown
          options={
          [
              { text: 'Payment', value: 'payment' },
              { text: 'Path payment', value: 'path_payment' },
              { text: 'Issue asset', value: 'issue_asset' },
              { text: 'Create account', value: 'create_account' },
              { text: 'Account merge', value: 'account_merge' },
          ]
          }
          selection fluid
          color="green"
          value={this.state.type}
          onChange={(e, t) => this.setState({ type: t.value })}
        />
        <Form
          onSubmit={::this.submitForm}
          loading={this.props.sendingPayment}
        >
          <Form.Field
            name="destination"
            label="Destination account"
            control="input"
            type="text"
            placeholder="GRDT..."
            error={!this.state.validDestination}
            onChange={::this.checkDestination}
            required
          />

          {this.state.type === 'payment' ? this.getPaymentForm() : null}
          {this.state.type === 'path_payment' ? this.getPathPaymentForm() : null}
          {this.state.type === 'issue_asset' ? this.getIssueForm() : null}
          {this.state.type === 'create_account' ? this.getCreateAccountForm() : null}
          {this.state.type === 'account_merge' ? this.getAccountMergeForm() : null}

          <Form.Button
            type="submit"
            fluid
            className={style.padV}
            primary
            icon="send"
            content="Send"
          />

          <Message
            success
            header="Payment completed !"
            content="You've successfuly sent some money"
          />
          <Message
            error
            header="Payment error"
            content="There was a problem during the payment"
          />
          <Message
            warning
            header="Invalid address"
            content="The address you entered is not a valid stellar address"
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
  sendCreateAccount: PropTypes.func.isRequired,
  sendAccountMerge: PropTypes.func.isRequired,
  getDestinationTrustlines: PropTypes.func.isRequired,
  account: PropTypes.object,
  trustlines: PropTypes.array,
  destinationTruslines: PropTypes.array,
  canSign: PropTypes.bool,
};

export default Payment;

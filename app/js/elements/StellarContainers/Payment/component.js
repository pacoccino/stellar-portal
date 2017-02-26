import React, { Component, PropTypes } from 'react';
import { Dropdown, Header, Input, Form, Message } from 'semantic-ui-react';

import Asset from '../../../components/stellar/Asset';
import { STROOP, KeypairInstance, resolveAddress } from '../../../helpers/StellarTools';

const styles = {
  padV: {
    margin: '1rem 0',
  },
};

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
      validDestination: false,
      destinationKeypair: null,
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
    if (!this.state.destinationKeypair) {
      return;
    }
    const enhancedFormData = {
      ...formData,
      destination: this.state.destinationKeypair.publicKey(),
    };
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
  }

  checkDestination(e) {
    const destinationAddress = e.target.value;

    this.setState({ resolving: true });
    resolveAddress(destinationAddress)
      .then((resolved) => {
        this.props.getDestinationTrustlines(resolved.account_id);

        const { memo_type, memo } = resolved;
        if (memo_type && memo) {
          // TODO set memo to fields
        }

        this.setState({
          validDestination: true,
          resolving: false,
          destinationKeypair: KeypairInstance({ publicKey: resolved.account_id }),
        });
        return null;
      })
      .catch(() => {
        this.setState({
          validDestination: false,
          resolving: false,
          destinationKeypair: null,
        });
      });
  }

  render() {
    if (!this.props.canSign) return this.getNoSigner();

    const destinationFormLabel = {
      color: this.state.validDestination ? 'teal' : 'red',
      icon: this.state.validDestination ? 'checkmark' : 'remove',
      className: 'iconOnly',
    };

    return (
      <div>
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
        <div style={{ height: '1rem' }} />
        <Form
          onSubmit={::this.submitForm}
          loading={this.props.sendingPayment}
        >
          <Form.Field>
            <Input
              name="destination"
              onChange={::this.checkDestination}
              placeholder="GRDT... or bob*federation.org"
              label={destinationFormLabel}
              labelPosition="right"
              required
            />
          </Form.Field>

          {this.state.type === 'payment' ? this.getPaymentForm() : null}
          {this.state.type === 'path_payment' ? this.getPathPaymentForm() : null}
          {this.state.type === 'issue_asset' ? this.getIssueForm() : null}
          {this.state.type === 'create_account' ? this.getCreateAccountForm() : null}
          {this.state.type === 'account_merge' ? this.getAccountMergeForm() : null}

          <Form.Button
            type="submit"
            fluid
            style={styles.padV}
            primary
            icon="send"
            content="Send"
            disabled={this.state.resolving || !this.state.validDestination}
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

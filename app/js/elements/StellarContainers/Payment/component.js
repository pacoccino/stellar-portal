import React, { Component, PropTypes } from 'react';
import { Button, Icon, Dimmer, Loader, Modal, Grid, Dropdown, Header, Form as FormUI } from 'semantic-ui-react';
import { Field, propTypes } from 'redux-form';
import { debounce } from 'lodash';

import Asset from '../../../components/stellar/Asset';
import { STROOP, KeypairInstance, resolveAddress } from '../../../helpers/StellarTools';
import { OPERATIONS } from '../../../actions-creators/stellar';

import DropdownFormField from '../../UiTools/SemanticForm/Dropdown';
import InputFormField from '../../UiTools/SemanticForm/Input';

const styles = {
  padV: {
    margin: '1rem 0',
  },
};

// TODO ask send validation
function MemoFields({ memo }) {
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
    <div>
      <label>Memo</label>
      <Grid columns={2} doubling>
        <Grid.Column>
          <Field
            component={DropdownFormField}
            name="memo.type"
            options={types}
            fluid
          />
        </Grid.Column>
        <Grid.Column>
          <Field
            component={InputFormField}
            name="memo.value"
            type="text"
            placeholder="Memo"
            fluid
            disabled={memo && memo.type === 'none'}
          />
        </Grid.Column>
      </Grid>
    </div>
  );
}

MemoFields.propTypes = {
  memo: PropTypes.object.isRequired,
};

class Payment extends Component {

  constructor(props) {
    super(props);
    this.state = {
      type: 'payment',
      destinationKeypair: null,
    };

    this.checkDestinationDebounced = debounce(this.checkDestinationDebounced, 200);
  }

  getPaymentForm() {
    const getAssetsOptions = assets => assets.map((asset, index) => (
      {
        value: index,
        text: Asset.getAssetString(asset),
      }));

    return (
      <div>
        <FormUI.Field>
          <label>Source asset</label>
          <Field
            component={DropdownFormField}
            name="asset"
            placeholder="Asset to send"
            options={getAssetsOptions(this.props.trustlines)}
            fluid
            required
          />
        </FormUI.Field>
        <FormUI.Field>
          <label>Amount</label>
          <Field
            component={InputFormField}
            name="amount"
            type="number"
            min={0}
            step={STROOP}
            placeholder="0"
            fluid
            required
          />
        </FormUI.Field>
        <MemoFields memo={this.props.values.memo} />
      </div>
    );
  }

  getPathPaymentForm() {
    const sourceAssets = this.props.trustlines.map((asset, index) => (
      {
        value: index,
        text: Asset.getAssetString(asset),
      }));
    const destAssets = this.state.destinationKeypair ?
      this.props.destinationTruslines.map((asset, index) => (
        {
          value: index,
          text: Asset.getAssetString(asset),
        })) : [];

    return (
      <div>
        <FormUI.Group widths="2">
          <FormUI.Field>
            <label>Source asset</label>
            <Field
              component={DropdownFormField}
              name="asset_source"
              placeholder="Asset to send"
              options={sourceAssets}
              fluid
              required
            />
          </FormUI.Field>
          <FormUI.Field>
            <label>Destination asset</label>
            <Field
              component={DropdownFormField}
              name="asset_destination"
              placeholder="Asset to receive"
              options={destAssets}
              fluid
              required
            />
          </FormUI.Field>
        </FormUI.Group>
        <FormUI.Field>
          <label>Maximum amount to send</label>
          <Field
            component={InputFormField}
            name="max_amount"
            type="number"
            min={0}
            step={STROOP}
            placeholder="0"
            fluid
            required
          />
        </FormUI.Field>
        <FormUI.Field>
          <label>Amount to receive</label>
          <Field
            component={InputFormField}
            name="amount_destination"
            type="number"
            min={0}
            step={STROOP}
            placeholder="0"
            fluid
            required
          />
        </FormUI.Field>
        <MemoFields memo={this.props.values.memo} />
      </div>
    );
  }

  getIssueForm() {
    return (
      <div>
        <FormUI.Field>
          <label>Code</label>
          <Field
            component={InputFormField}
            name="asset_code"
            type="text"
            placeholder="EUR"
            fluid
            required
          />
        </FormUI.Field>
        <FormUI.Field>
          <label>Amount</label>
          <Field
            component={InputFormField}
            name="amount"
            type="number"
            min={0}
            step={STROOP}
            placeholder="0"
            fluid
            required
          />
        </FormUI.Field>
      </div>
    );
  }

  getCreateAccountForm() {
    return (
      <div>
        <p>
          Click on "Generate keypair" on the menu bar to get a new couple of public and secret key.
        </p>
        <FormUI.Field>
          <label>Starting balance</label>
          <Field
            component={InputFormField}
            name="amount"
            type="number"
            min={0}
            step={STROOP}
            placeholder="0"
            fluid
            required
          />
        </FormUI.Field>
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

  openConfirmModal() {
    this.setState({ confirmModalOpen: true });
  }
  closeConfirmModal() {
    this.setState({ confirmModalOpen: false });
  }

  submitForm() {
    if (!this.state.destinationKeypair) {
      return Promise.reject();
    }
    this.closeConfirmModal();
    const enhancedFormData = {
      ...this.props.values,
      destination: this.state.destinationKeypair.publicKey(),
    };
    return this.props.sendOperation(this.state.type, enhancedFormData);
  }

  checkDestination(e, destinationAddress) {
    this.setState({ resolving: true });
    this.checkDestinationDebounced(destinationAddress);
  }

  checkDestinationDebounced(destinationAddress) {
    resolveAddress(destinationAddress)
      .then((resolved) => {
        this.props.getDestinationTrustlines(resolved.account_id);

        const { memo_type, memo } = resolved;
        if (memo_type && memo) {
          this.props.change('memo.type', memo_type);
          this.props.change('memo.value', memo);
        }

        this.setState({
          resolving: false,
          destinationKeypair: KeypairInstance({ publicKey: resolved.account_id }),
        });
        return null;
      })
      .catch(() => {
        this.setState({
          resolving: false,
          destinationKeypair: null,
        });
      });
  }

  renderConfirmModal() {
    return (
      <Modal open={this.state.confirmModalOpen} basic size="small">
        <Header icon="archive" content="Comfirm operation" />
        <Modal.Content>
          <p>
            You are going to send a
            <b> {this.state.type} </b>
            operation to {this.props.values.destination}
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button basic color="red" inverted onClick={::this.closeConfirmModal}>
            <Icon name="remove" /> Cancel
          </Button>
          <Button color="green" inverted onClick={::this.submitForm}>
            <Icon name="checkmark" /> Ok ?
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }

  render() {
    if (!this.props.canSign) return this.getNoSigner();

    const destinationFormLabel = {
      color: this.state.destinationKeypair ? 'teal' : 'red',
      icon: this.state.destinationKeypair ? 'checkmark' : 'remove',
      className: 'iconOnly',
    };

    const isFormValid = this.state.resolving ||
      !this.state.destinationKeypair ||
      this.props.sendingPayment;
    return (
      <FormUI onSubmit={e => e.preventDefault()}>
        <Dimmer active={this.props.sendingPayment} inverted>
          <Loader>Sending...</Loader>
        </Dimmer>
        <Header as="h2" textAlign="center">
          Operations
        </Header>
        <Dropdown
          options={
          [
              { text: 'Payment', value: OPERATIONS.PAYMENT },
              { text: 'Path payment', value: OPERATIONS.PATH_PAYMENT },
              { text: 'Issue asset', value: OPERATIONS.ISSUE_ASSET },
              { text: 'Create account', value: OPERATIONS.CREATE_ACCOUNT },
              { text: 'Account merge', value: OPERATIONS.ACCOUNT_MERGE },
          ]
          }
          selection fluid
          name="operation_type"
          color="green"
          value={this.state.type}
          onChange={(e, t) => this.setState({ type: t.value })}
        />
        <div style={{ height: '1rem' }} />
        <FormUI.Field>
          <label>Destination</label>
          <Field
            component={InputFormField}
            name="destination"
            onChange={::this.checkDestination}
            placeholder="GRDT... or bob*federation.org"
            label={!this.state.resolving && destinationFormLabel}
            labelPosition="right"
            loading={this.state.resolving}
            icon={this.state.resolving && 'user'}
            fluid
            required
          />
        </FormUI.Field>
        {this.state.type === OPERATIONS.PAYMENT ? this.getPaymentForm() : null}
        {this.state.type === OPERATIONS.PATH_PAYMENT ? this.getPathPaymentForm() : null}
        {this.state.type === OPERATIONS.ISSUE_ASSET ? this.getIssueForm() : null}
        {this.state.type === OPERATIONS.CREATE_ACCOUNT ? this.getCreateAccountForm() : null}
        {this.state.type === OPERATIONS.ACCOUNT_MERGE ? this.getAccountMergeForm() : null}

        <Button
          fluid
          style={styles.padV}
          onClick={::this.openConfirmModal}
          primary
          icon="send"
          type="submit"
          content="Send"
          disabled={isFormValid}
        />

        {this.renderConfirmModal()}
      </FormUI>
    );
  }
}

Payment.propTypes = {
  sendingPayment: PropTypes.bool,
  sendOperation: PropTypes.func.isRequired,
  getDestinationTrustlines: PropTypes.func.isRequired,
  account: PropTypes.object,
  trustlines: PropTypes.array,
  destinationTruslines: PropTypes.array,
  canSign: PropTypes.bool,
  ...propTypes,
};

export default Payment;

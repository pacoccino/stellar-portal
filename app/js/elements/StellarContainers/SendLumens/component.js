import React, { Component, PropTypes } from 'react';
import { Button, Icon, Dimmer, Loader, Modal, Grid, Dropdown, Header, Form as FormUI } from 'semantic-ui-react';
import { Field, propTypes } from 'redux-form';
import { debounce } from 'lodash';
import { StellarTools } from 'stellar-toolkit';

import Asset from '../../../components/stellar/Asset';
import { OPERATIONS } from '../../../actions-creators/stellar';

import DropdownFormField from '../../UiTools/SemanticForm/Dropdown';
import InputFormField from '../../UiTools/SemanticForm/Input';

const { STROOP, KeypairInstance, resolveAddress, AssetInstance } = StellarTools;

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

class SendLumens extends Component {

  constructor(props) {
    super(props);
    this.state = {
      type: 'payment',
      destinationKeypair: null,
      showConfirmation: false,
    };

    this.checkDestinationDebounced = debounce(this.checkDestinationDebounced, 200);
  }

  getPaymentForm() {
    return (
      <div>
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
    return this.props.sendLumens(enhancedFormData)
      .then((result) => {
        this.setState({
          showConfirmation: true,
        });
        setTimeout(() => {
          this.setState({
            showConfirmation: false,
          });
        }, 2000);
        return result;
      });
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
        <Header icon="archive" content="Confirm operation" />
        <Modal.Content>
          <p>
            Are you sure you want to send
            <b> {this.props.values.amount} </b>XLM
            to {this.props.values.destination}
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
        <Dimmer className="successDimmer" active={this.state.showConfirmation}>
          Sent
        </Dimmer>
        <Header as="h2" textAlign="center">
          Withdraw
        </Header>
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
        {this.getPaymentForm()}

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

SendLumens.propTypes = {
  sendingPayment: PropTypes.bool,
  sendLumens: PropTypes.func.isRequired,
  getDestinationTrustlines: PropTypes.func.isRequired,
  account: PropTypes.object,
  trustlines: PropTypes.array,
  destinationTruslines: PropTypes.array,
  canSign: PropTypes.bool,
  ...propTypes,
};

export default SendLumens;

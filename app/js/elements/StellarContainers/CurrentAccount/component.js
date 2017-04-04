import React, { Component, PropTypes } from 'react';
import { Input, Modal, Table, Container, Button, Header } from 'semantic-ui-react';
import Clipboard from 'clipboard';

import * as routes from '../../../constants/routes';

// TODO addSeed
class CurrentAccount extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showSeedModal: false,
      showSeed: props.showSeed || false,
    };
  }

  componentDidMount() {
    new Clipboard('.account-address-copy'); // eslint-disable-line no-new
  }

  openOnNewTab() {
    const url = routes.Account_G(this.props.keypair.publicKey());
    window.open(url);
  }

  renderSeedModal() {
    return (
      <Modal open>
        <Modal.Header>Add seed to account</Modal.Header>
        <Modal.Content>
          <Container>
            <p>
                You can set seed of this account to be able to interact with it.
              </p>
            <p><b>Account ID: </b> {this.props.keypair.publicKey()}</p>
          </Container>
        </Modal.Content>
        <Modal.Content>
          <Input
            fluid
            onChange={e => this.setState({ seed: e.target.value })}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={::this.setSeed} primary>Add</Button>
          <Button onClick={() => this.closeSeedModal()} secondary>Cancel</Button>
        </Modal.Actions>
      </Modal>
    );
  }

  setSeed() {
    const { seed } = this.state;
  }

  showSeedModal() {
    this.setState({
      showSeedModal: true,
    });
  }

  closeSeedModal() {
    this.setState({
      showSeedModal: false,
    });
  }

  renderSeedBtn() {
    const { keypair } = this.props;
    const canSign = keypair.canSign();

    if (canSign) {
      return (
        this.state.showSeed ?
          <Button
            basic compact
            size="medium"
            icon="clipboard"
            content="Hide seed"
            color="olive"
            onClick={() => this.setState({ showSeed: false })}
          />
          :
          <Button
            basic compact
            size="medium"
            icon="clipboard"
            content="Show seed"
            color="orange"
            onClick={() => this.setState({ showSeed: true })}
          />
      );
    }
    return (
      <Button
        basic compact
        size="medium"
        icon="add"
        content="Set seed"
        color="teal"
        onClick={() => this.showSeedModal()}
      />
    );
  }

  accountInfo() {
    if (!this.props.keypair) { return null; }

    const { keypair } = this.props;
    const canSign = keypair.canSign();

    return (
      <Table compact>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell textAlign="center">
              {this.props.openExternal && <Button
                onClick={::this.openOnNewTab}
                content="Open on new tab"
                icon="external"
              />
              }
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center">
              <Header as="h3">Account addresses</Header>
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="right">
              {this.renderSeedBtn()}
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.HeaderCell>
              Public address
            </Table.HeaderCell>
            <Table.Cell>
              {keypair.publicKey()}
            </Table.Cell>
            <Table.Cell textAlign="right">
              <Button
                className="account-address-copy"
                basic compact
                size="mini"
                icon="clipboard"
                content="Copy"
                color="blue"
                data-clipboard-text={keypair.publicKey()}
              />
            </Table.Cell>
          </Table.Row>
          {
            canSign && this.state.showSeed &&
            <Table.Row>
              <Table.HeaderCell>
                Secret seed
              </Table.HeaderCell>
              <Table.Cell>
                {keypair.secret()}
              </Table.Cell>
              <Table.Cell textAlign="right">
                <Button
                  className="account-address-copy"
                  basic compact
                  size="mini"
                  icon="clipboard"
                  content="Copy"
                  color="red"
                  data-clipboard-text={keypair.secret()}
                />
              </Table.Cell>
            </Table.Row>
          }
        </Table.Body>
      </Table>
    );
  }
  render() {
    return (
      <div>
        <Container textAlign="center">
          {this.accountInfo()}
        </Container>
        {this.state.showSeedModal && this.renderSeedModal()}
      </div>
    );
  }
}

CurrentAccount.propTypes = {
  keypair: PropTypes.object.isRequired,
  network: PropTypes.string.isRequired,
  openExternal: PropTypes.bool,
  showSeed: PropTypes.bool,
};

export default CurrentAccount;

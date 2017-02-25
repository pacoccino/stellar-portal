import React, { Component, PropTypes } from 'react';
import { Table, Container, Button, Header } from 'semantic-ui-react';
import Clipboard from 'clipboard';

class CurrentAccount extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showSeed: props.showSeed || false,
    };
  }

  componentDidMount() {
    new Clipboard('.account-address-copy'); // eslint-disable-line no-new
  }

  openOnNewTab() {
    let url = '/?';
    url += `network=${this.props.network}`;
    if (this.props.keypair.canSign()) {
      url += `&secretSeed=${this.props.keypair.seed()}`;
    } else {
      url += `&accountId=${this.props.keypair.accountId()}`;
    }
    window.open(url);
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
              {
                canSign && (this.state.showSeed ?
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
                  />)
              }
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.HeaderCell>
              Public address
            </Table.HeaderCell>
            <Table.Cell>
              {keypair.accountId()}
            </Table.Cell>
            <Table.Cell textAlign="right">
              <Button
                className="account-address-copy"
                basic compact
                size="mini"
                icon="clipboard"
                content="Copy"
                color="blue"
                data-clipboard-text={keypair.accountId()}
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
                {keypair.seed()}
              </Table.Cell>
              <Table.Cell textAlign="right">
                <Button
                  className="account-address-copy"
                  basic compact
                  size="mini"
                  icon="clipboard"
                  content="Copy"
                  color="red"
                  data-clipboard-text={keypair.seed()}
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

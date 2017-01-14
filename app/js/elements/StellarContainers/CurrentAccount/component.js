import React, { Component, PropTypes } from 'react';
import { Table, Container, Button, Header } from 'semantic-ui-react'
import Clipboard from 'clipboard';

class AccountSelector extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showSeed: false
    };
  }

  componentDidMount() {
    new Clipboard(".account-address-copy");
  }

  accountInfo() {
    if(!this.props.account)
      return null;
    return (
      <Table compact>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell textAlign="center" colSpan="3">
              <Header as="h3">Selected account</Header>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.HeaderCell>
              Public address
            </Table.HeaderCell>
            <Table.Cell>
              {this.props.keypair.accountId()}
            </Table.Cell>
            <Table.Cell textAlign="right">
              <Button
                className="account-address-copy"
                basic compact
                size="mini"
                icon="clipboard"
                content="Copy"
                color="blue"
                data-clipboard-text={this.props.keypair.accountId()}
              />
            </Table.Cell>
          </Table.Row>
          {this.props.canSign && (
            this.state.showSeed ?
              <Table.Row>
                <Table.HeaderCell>
                  Secret seed
                </Table.HeaderCell>
                <Table.Cell>
                  {this.props.keypair.seed()}
                </Table.Cell>
                <Table.Cell textAlign="right">
                  <Button
                    basic compact
                    size="small"
                    icon="clipboard"
                    content="Hide seed"
                    color="yellow"
                    onClick={() => this.setState({ showSeed: false })}
                  />
                  <Button
                    className="account-address-copy"
                    basic compact
                    size="mini"
                    icon="clipboard"
                    content="Copy"
                    color="red"
                    data-clipboard-text={this.props.keypair.seed()}
                  />
                </Table.Cell>
              </Table.Row>
              :
              <Table.Row textAlign="center">
                <Table.Cell colSpan="3">
                  <Button
                    basic compact
                    size="small"
                    icon="clipboard"
                    content="Show seed"
                    color="yellow"
                    onClick={() => this.setState({ showSeed: true })}
                  />
                </Table.Cell>
              </Table.Row>
          )}
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

AccountSelector.propTypes = {
  account: PropTypes.object,
  canSign: PropTypes.bool,
  keypair: PropTypes.object,
};

export default AccountSelector;

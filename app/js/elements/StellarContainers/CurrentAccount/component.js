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
            <Table.HeaderCell textAlign="center" colSpan="2">
              <Header as="h3">Account addresses</Header>
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="right" colSpan="1">
              {
                this.props.canSign && (this.state.showSeed ?
                  <Button
                    basic compact
                    size="medium"
                    icon="clipboard"
                    content="Hide seed"
                    color="olive"
                    onClick={() => this.setState({showSeed: false})}
                  />
                  :
                  <Button
                    basic compact
                    size="medium"
                    icon="clipboard"
                    content="Show seed"
                    color="orange"
                    onClick={() => this.setState({showSeed: true})}
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
          {
            this.props.canSign && this.state.showSeed &&
            <Table.Row>
              <Table.HeaderCell>
                Secret seed
              </Table.HeaderCell>
              <Table.Cell>
                {this.props.keypair.seed()}
              </Table.Cell>
              <Table.Cell textAlign="right">
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

AccountSelector.propTypes = {
  account: PropTypes.object,
  canSign: PropTypes.bool,
  keypair: PropTypes.object,
};

export default AccountSelector;

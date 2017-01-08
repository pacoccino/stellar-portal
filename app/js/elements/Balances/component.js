import React, { PropTypes } from 'react';
import Stellar from 'stellar-sdk';
import { Header, Form, Button, Table } from 'semantic-ui-react'
import Decimal from 'decimal.js';

import Asset from '../../components/stellar/Asset';
import Amount from '../../components/stellar/Amount';

class Balances extends React.Component {

  getBalanceRows() {
    return this.props.balances.map((balance, index) => {
      const bnBalance = new Decimal(balance.balance);
      return (
        <Table.Row key={index}>
          <Table.Cell>
            <Asset {...balance} />
          </Table.Cell>
          <Table.Cell>
            <Amount amount={balance.balance} />
          </Table.Cell>
          <Table.Cell>
            {this.props.canSign ?
              <Button
                onClick={() => this.props.deleteTrustline(asset)}
                basic color='red'
                floated="right"
                disabled={!bnBalance.isZero()}
              >
                Remove
              </Button>
              : null}
          </Table.Cell>
        </Table.Row>
      );
    });
  }

  addTrustline(e, { formData }) {
    e.preventDefault();
    const asset = new Stellar.Asset(formData.asset_code, formData.asset_issuer);
    this.props.createTrustline(asset);
  }

  getTrustlineForm() {
    if(!this.props.canSign) {
      return null;
    }
    return (
      <div>
        <Header as="h3">Add trustline</Header>
        <Form onSubmit={::this.addTrustline}>
          <Form.Group>
            <Form.Field
              name="asset_code"
              label='Code'
              control='input'
              type='text'
              placeholder='Asset code'
              width="3"
              required
            />
            <Form.Field
              name="asset_issuer"
              label='Issuer'
              control='input'
              type='text'
              placeholder='Issuer account id'
              width="10"
              required
            />
            <Form.Button
              size="large"
              primary
              width="3"
              style={{position: 'relative', top: 20}}
            >Add</Form.Button>
          </Form.Group>
        </Form>
      </div>
    );
  }

  render() {
    return (
      <div>
        <Header as="h2">Balances</Header>
        <Table singleLine size="small" compact unstackable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Asset</Table.HeaderCell>
              <Table.HeaderCell>Balance</Table.HeaderCell>
              <Table.HeaderCell textAlign="right">Trustline</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.getBalanceRows()}
          </Table.Body>
        </Table>
        {this.getTrustlineForm()}
      </div>
    );
  }
}

Balances.propTypes = {
  balances: PropTypes.array.isRequired,
  trustlines: PropTypes.array,
  createTrustline: PropTypes.func.isRequired,
  deleteTrustline: PropTypes.func.isRequired,
};

export default Balances;

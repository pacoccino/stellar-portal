import React, { PropTypes } from 'react';
import { Header, Form, Button, Table } from 'semantic-ui-react';
import Decimal from 'decimal.js';
import { StellarTools } from 'stellar-toolkit';

import Asset from '../../../components/stellar/Asset';
import Amount from '../../../components/stellar/Amount';

const { validPk, AssetInstance } = StellarTools;

class Balances extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      validIssuer: true,
    };
  }

  checkIssuer(e) {
    const destinationAddress = e.target.value;
    this.setState({ validIssuer: validPk(destinationAddress) });
  }

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
                onClick={() => this.props.deleteTrustline(balance.asset)}
                basic color="red"
                floated="right"
                disabled={!bnBalance.isZero()}
                loading={balance.isDeleting}
                content="Remove"
                icon="trash"
              />
              : null}
          </Table.Cell>
        </Table.Row>
      );
    });
  }

  addTrustline(e, { formData }) {
    e.preventDefault();
    this.props.createTrustline(AssetInstance(formData));
  }

  getTrustlineForm() {
    if (!this.props.canSign) {
      return null;
    }
    return (
      <div>
        <Form
          onSubmit={::this.addTrustline}
          loading={this.props.creatingTrustline}
        >
          <Form.Group>
            <Form.Field
              name="asset_code"
              label="Code"
              control="input"
              type="text"
              placeholder="Asset code"
              width="3"
              required
            />
            <Form.Field
              name="asset_issuer"
              label="Issuer"
              onChange={::this.checkIssuer}
              error={!this.state.validIssuer}
              control="input"
              type="text"
              placeholder="Issuer account id"
              width="10"
              required
            />
            <Form.Button
              size="large"
              icon="add user"
              primary
              width="4"
              style={{ position: 'relative', top: 20 }}
              content="Add trustline"
            />
          </Form.Group>
        </Form>
      </div>
    );
  }

  render() {
    return (
      <div>
        <Header as="h2">Balances</Header>
        {this.getTrustlineForm()}

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
      </div>
    );
  }
}

Balances.propTypes = {
  canSign: PropTypes.bool.isRequired,
  creatingTrustline: PropTypes.bool,
  balances: PropTypes.array.isRequired,
  createTrustline: PropTypes.func.isRequired,
  deleteTrustline: PropTypes.func.isRequired,
};

export default Balances;

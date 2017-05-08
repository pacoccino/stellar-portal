import React, { PropTypes } from 'react';
import { Segment, Header, Form, Button, Table } from 'semantic-ui-react';
import Decimal from 'decimal.js';
import { StellarTools } from 'stellar-toolkit';

import Asset from '../../../components/stellar/Asset';
import Amount from '../../../components/stellar/Amount';
import ConsumeContainer from "../ConsumeContainer";

const { validPk, AssetInstance } = StellarTools;

class Balances extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prices: {
        xlm: {},
        fiat: {},
      },
    };
  }

  componentWillMount() {
    this.interval = setInterval(() => {
      this.props.balances.forEach(b => {
        this.setState(state => {
          state.prices.xlm[b.asset_code] = 100 * Math.random();
          state.prices.fiat[b.asset_code] = 100*Math.random();
          return state;
        });
      });
    }, 500);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  checkIssuer(e) {
    const destinationAddress = e.target.value;
    this.setState({ validIssuer: validPk(destinationAddress) });
  }

  getBalanceRows() {
    return this.props.balances.map((balance, index) => {
      const bnBalance = new Decimal(balance.balance);
      const xlmPrice = this.state.prices.xlm[balance.asset_code] || null;
      const fiatPrice = this.state.prices.fiat[balance.asset_code] || null;

      return (
        <Table.Row key={index}>
          <Table.Cell>
            <Asset {...balance} />
          </Table.Cell>
          <Table.Cell>
            <Amount amount={balance.balance} />
          </Table.Cell>
          <Table.Cell>
            <Amount amount={xlmPrice} />
          </Table.Cell>
          <Table.Cell>
            <Amount amount={fiatPrice} />
          </Table.Cell>
          {this.props.canSign ?
            <Table.Cell>
              <Button
                onClick={() => this.sellAsset(balance)}
                basic color="red"
                floated="right"
                content="Sell"
                disabled
                icon="trophy"
              />
              <Button
                onClick={() => this.buyAsset(balance)}
                basic color="green"
                floated="right"
                content="Buy"
                icon="shop"
              />
            </Table.Cell>
            : null}
        </Table.Row>
      );
    });
  }

  buyAsset(asset) {
    this.setState({
      tradeAsset: AssetInstance(asset),
      tradeType: 'buy',
    });
  }

  sellAsset(asset) {
    this.setState({
      tradeAsset: AssetInstance(asset),
      tradeType: 'sell',
    });
  }

  renderBuySell() {
    if(!this.state.tradeAsset) {
      return null;
    }
    return (
      <ConsumeContainer tradeAsset={this.state.tradeAsset} tradeType={this.state.tradeType} />
    );
  }
  render() {
    return (
      <div>
        <Header as="h2">Market</Header>
        <Table singleLine size="small" compact unstackable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Asset</Table.HeaderCell>
              <Table.HeaderCell>Balance</Table.HeaderCell>
              <Table.HeaderCell>XLM</Table.HeaderCell>
              <Table.HeaderCell>Fiat</Table.HeaderCell>
              {this.props.canSign ?
                <Table.HeaderCell textAlign="right">Action</Table.HeaderCell>
                :
                null
              }
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.getBalanceRows()}
          </Table.Body>
        </Table>
        {this.renderBuySell()}
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

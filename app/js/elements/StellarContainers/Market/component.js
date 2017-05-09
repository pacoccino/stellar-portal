import React, { PropTypes } from 'react';
import { Segment, Header, Form, Button, Table } from 'semantic-ui-react';
import Decimal from 'decimal.js';
import { StellarTools, StellarStats } from 'stellar-toolkit';

import Asset from '../../../components/stellar/Asset';
import Amount from '../../../components/stellar/Amount';
import ConsumeContainer from "../ConsumeContainer";
import request from '../../../helpers/request';

const { validPk, AssetInstance } = StellarTools;

class Balances extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prices: {},
      xlmXusd: 0,
    };
  }

  componentWillMount() {
    this.updateAssetValues();
    this.updateXLMValues();
  }
  componentWillUnmount() {
    clearInterval(this.intervalXLM);
    this.off = true;
  }

  updateXLMValues() {
    this.intervalXLM = setInterval(() => {
      request({
        url: 'https://api.kraken.com/0/public/Ticker?pair=XLMUSD',
      }).then(data => data.result.XXLMZUSD.c[0])
        .then(xlmXusd => this.setState({xlmXusd}));
    }, 10000);
  }

  updateAssetValue(asset, account_id) {
    return StellarStats.getExchangeRateFromAutoPath({
      account_id,
      sourceAsset: AssetInstance({asset_type: 'native'}),
      destinationAsset: AssetInstance(asset),
      destinationAmount: 1,
    }).then(r => {
      if(this.off) throw new Error();
      this.setState(state => {
        state.prices[asset.asset_code] = r.sendMax;
        return state;
      });
    });
  }

  getAssetList() {
    const untrustedAssets = this.props.assets.filter(asset =>
      !this.props.balances.find(balance => balance.asset_code === asset.asset_code));
    return this.props.balances.concat(untrustedAssets);
  }

  updateAssetValues() {
    const account_id = this.props.keypair.publicKey();
    Promise.all(this.getAssetList().map(b => this.updateAssetValue(b, account_id)))
      .then(() => this.updateAssetValues()).catch(() => 0);
  }


  checkIssuer(e) {
    const destinationAddress = e.target.value;
    this.setState({ validIssuer: validPk(destinationAddress) });
  }

  getLumensValue() {
    const lBalance = this.props.balances
      .find(b => b.asset_type === 'native');

    return (
      <Segment textAlign="right">
        Balance: <b>{lBalance.balance}</b> XLM
      </Segment>
    );
  }

  getBalanceRows() {
    return this.getAssetList()
      .filter(b => b.asset_type !== 'native')
      .map((balance, index) => {
        const xlmPrice = this.state.prices[balance.asset_code] || null;
        const fiatPrice = this.state.xlmXusd && xlmPrice*this.state.xlmXusd || null;

        return (
          <Table.Row key={index}>
            <Table.Cell>
              {balance.asset_code}
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
            {balance.limit ?
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
              :
              <Table.Cell>
                <Button
                  onClick={() => this.props.createTrustline(balance)}
                  basic color="blue"
                  floated="right"
                  content="Request access"
                  icon="add"
                />
              </Table.Cell>
            }
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
        {this.getLumensValue()}
        <Table singleLine size="small" compact unstackable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Asset</Table.HeaderCell>
              <Table.HeaderCell>Balance</Table.HeaderCell>
              <Table.HeaderCell>Price in XLM</Table.HeaderCell>
              <Table.HeaderCell>Price in USD</Table.HeaderCell>
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
  keypair: PropTypes.object.isRequired,
  balances: PropTypes.array.isRequired,
  createTrustline: PropTypes.func.isRequired,
  deleteTrustline: PropTypes.func.isRequired,
};

export default Balances;

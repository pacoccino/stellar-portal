import React, { PropTypes } from 'react';
import { Dropdown, Grid, Form, Header, Table } from 'semantic-ui-react';
import { find, isEmpty } from 'lodash';
import Asset from '../../components/stellar/Asset';
import Amount from '../../components/stellar/Amount';
import { AssetInstance, AssetUid } from '../../helpers/StellarTools';

class OrderBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selling: null,
      buying: null,
    };
  }

  getBidRow(bid, index) {
    return (
      <Table.Row key={index} textAlign="right">
        <Table.Cell>
          <Amount amount={bid.amount} />
        </Table.Cell>
        <Table.Cell>
          <Amount amount={bid.price} />
        </Table.Cell>
      </Table.Row>
    );
  }
  getBids() {
    const bids = this.props.orderbook.bids;
    if(!bids) return null;
    return (
      <Table singleLine size="small" compact unstackable>
        <Table.Header>
          <Table.Row textAlign="right">
            <Table.HeaderCell>Volume</Table.HeaderCell>
            <Table.HeaderCell>Price</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {bids.map((bid, i) => (this.getBidRow(bid, i)))}
        </Table.Body>
      </Table>
    );
  }

  getAskRow(ask, index) {
    return (
      <Table.Row key={index}>
        <Table.Cell>
          <Amount amount={ask.price} />
        </Table.Cell>
        <Table.Cell>
          <Amount amount={ask.amount} />
        </Table.Cell>
      </Table.Row>
    );
  }
  getAsks() {
    const asks = this.props.orderbook.asks;
    if(!asks) return null;
    return (
      <Table singleLine size="small" compact unstackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Price</Table.HeaderCell>
            <Table.HeaderCell>Volume</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {asks.map((ask, i) => (this.getAskRow(ask, i)))}
        </Table.Body>
      </Table>
    );

  }

  getOrderbook() {
    if(isEmpty(this.props.orderbook)) {
      return      (
        <Grid.Row>
          <Header as="h3" textAlign="center">Please select a pair of assets</Header>
        </Grid.Row>
      );
    }
    return (
      <Grid.Row>
        <Grid.Column>
          {this.getBids()}
        </Grid.Column>
        <Grid.Column>
          {this.getAsks()}
        </Grid.Column>
      </Grid.Row>
    );
  }

  updateOrderbook() {
    if(this.state.selling && this.state.buying) {
      this.props.setOrderbook(this.state);
    }
  }
  changeBuyingAsset(a, b) {
    const asset = find(this.props.trustlines, t => (AssetUid(t) === b.value));
    this.setState({ buying: asset }, ::this.updateOrderbook);
  }
  changeSellingAsset(a, b) {
    const asset = find(this.props.trustlines, t => (AssetUid(t) === b.value));
    this.setState({ selling: asset }, ::this.updateOrderbook);
  }
  getTrustedAssets() {
    return this.props.trustlines.map((asset, index) => (
    {
      value: AssetUid(asset),
      text: Asset.getAssetString(asset),
    }));
  }

  render() {
    return (
      <div>
        <Header as="h2">Order Book</Header>
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column>
              <Header as="h3" textAlign="center">
                Buying <Asset asset={AssetInstance(this.props.orderbook.counter)} />
              </Header>

              <Dropdown
                selection fluid
                options={this.getTrustedAssets()}
                placeholder='Asset bought'
                onChange={::this.changeBuyingAsset}
              />
            </Grid.Column>
            <Grid.Column>
              <Header as="h3" textAlign="center">
                Selling <Asset asset={AssetInstance(this.props.orderbook.base)} />
              </Header>

              <Dropdown
                selection fluid
                options={this.getTrustedAssets()}
                placeholder='Asset sold'
                onChange={::this.changeSellingAsset}
              />
            </Grid.Column>
          </Grid.Row>
          {this.getOrderbook()}
        </Grid>
      </div>
    );
  }
}

OrderBook.propTypes = {
  setOrderbook: PropTypes.func.isRequired,
  trustlines: PropTypes.array,
  orderbook: PropTypes.object,
};

export default OrderBook;

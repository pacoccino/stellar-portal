import React, { PropTypes } from 'react';
import { Grid, Loader, Segment, Form, Button, Header, Table } from 'semantic-ui-react';
import { StellarTools } from 'stellar-toolkit';
import { Field, propTypes } from 'redux-form';
import { find } from 'lodash';

import Asset from '../../../components/stellar/Asset';
import Amount from '../../../components/stellar/Amount';
import DropdownFormField from '../../UiTools/SemanticForm/Dropdown';
import InputFormField from '../../UiTools/SemanticForm/Input';

const { AssetInstance, AssetUid, STROOP } = StellarTools;

class Offers extends React.Component {
  constructor() {
    super();
    this.state = {
      showConfirmation: false,
      tradeType: 'buy',
    };
  }
  deleteOffer(offer) {
    return (e) => {
      e.preventDefault();
      this.props.deleteOffer(offer);
    };
  }

  getOfferRow(offer, index) {
    return (
      <Table.Row key={index}>
        <Table.Cell>
          {offer.selling.asset_code}
        </Table.Cell>
        <Table.Cell>
          <Asset {...offer.buying} />
        </Table.Cell>
        <Table.Cell>
          <Amount amount={offer.price} />
        </Table.Cell>
        <Table.Cell>
          <Amount amount={offer.amount} />
        </Table.Cell>
        <Table.Cell>
          {this.props.canSign ?
            <Button
              basic
              color="red"
              floated="right"
              onClick={::this.deleteOffer(offer)}
              loading={offer.isRemoving}
              content="Remove"
              icon="trash"
            />
            : null}
        </Table.Cell>
      </Table.Row>
    );
  }

  getOfferTable() {
    return (
      <Table singleLine size="small" compact unstackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Selling</Table.HeaderCell>
            <Table.HeaderCell>Buying</Table.HeaderCell>
            <Table.HeaderCell>Price</Table.HeaderCell>
            <Table.HeaderCell>Amount</Table.HeaderCell>
            <Table.HeaderCell textAlign="right">Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {this.props.offers.map(::this.getOfferRow)}
        </Table.Body>
      </Table>
    );
  }

  getAssetOptions() {
    return this.props.trustlines.map((asset, index) => (
      {
        value: AssetUid(asset),
        text: asset.getCode(),
      })).filter(b => b.value !== 'native');
  }

  changeAsset(a, b) {
    const asset = find(this.props.trustlines, t => (AssetUid(t) === b));
    this.setState({ tradeAsset: asset }, () => {
      this.updateOrderbook();
      this.props.change('sell_asset', this.getBuyingAsset());
      this.props.change('buy_asset', this.getSellingAsset());
    });
  }

  getSellingAsset() {
    if(this.state.tradeType === 'sell') {
      return this.state.tradeAsset;
    } else {
      return AssetInstance({asset_type: 'native'});
    }
  }
  getBuyingAsset() {
    if(this.state.tradeType === 'buy') {
      return this.state.tradeAsset;
    } else {
      return AssetInstance({asset_type: 'native'});
    }
  }

  updateOrderbook() {
    if(!this.state.tradeAsset) return;
    this.props.setOrderbook({
      selling: this.getSellingAsset(),
      buying: this.getBuyingAsset(),
    });
  }

  setTradeType(tradeType) {
    this.setState({tradeType}, ::this.updateOrderbook);
  }

  getOfferForm() {
    if(this.props.submitting) {
      return (
        <Loader active inline='centered'>
          Creating offer ...
        </Loader>
      );
    }
    if(this.props.submitSucceeded) {
      return (
        <Segment color="green">
          Offer successfully created !
        </Segment>
      );
    }

    const xlmWallet = this.props.balances.find(b => b.asset.isNative());
    const xlmBalance  = xlmWallet ? xlmWallet.balance : 0;

    return (
      <div>
        <Grid columns={3}>
          <Grid.Row>
            <Grid.Column>
              <Form.Field>
                <label>Asset</label>
                <Field
                  component={DropdownFormField}
                  name="asset"
                  placeholder="Asset to sell"
                  options={this.getAssetOptions()}
                  onChange={::this.changeAsset}
                  fluid
                  required
                />
              </Form.Field>
            </Grid.Column>
            <Grid.Column>
              <Button.Group>
                <Button
                  color="green"
                  disabled={this.state.tradeType === 'buy'}
                  onClick={() => this.setTradeType('buy')}
                >Buy</Button>
                <Button.Or />
                <Button
                  color="red"
                  disabled={this.state.tradeType === 'sell'}
                  onClick={() => this.setTradeType('sell')}
                >Sell</Button>
              </Button.Group>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Form.Field>
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
              </Form.Field>
            </Grid.Column>
            <Grid.Column>
              <Form.Field>
                <label>Price in XLM</label>
                <Field
                  component={InputFormField}
                  name="price"
                  type="number"
                  min={0}
                  step={STROOP}
                  placeholder="1"
                  fluid
                  required
                />
              </Form.Field>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Form.Button
                type="submit"
                primary
                content="Create offer"
                onClick={::this.props.handleSubmit}
                icon="book"
                fluid
              />
            </Grid.Column>
            <Grid.Column>
              <Segment>
                Current balance: <b>{xlmBalance}</b> XLM
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }

  render() {
    return (
      <div>
        <Header as="h2">Orders</Header>
        {this.props.canSign ?
          <div>
            <Header as="h3">Create offer</Header>
            {this.getOfferForm()}
          </div>
          : null
        }
        <Header as="h2">Your offers</Header>
        {this.getOfferTable()}
      </div>
    );
  }
}

Offers.propTypes = {
  trustlines: PropTypes.array,
  offers: PropTypes.array,
  deleteOffer: PropTypes.func.isRequired,
  canSign: PropTypes.bool,
  sendingOffer: PropTypes.bool,
  ...propTypes,
};

export default Offers;

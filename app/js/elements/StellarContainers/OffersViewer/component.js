import React, { PropTypes } from 'react';
import { Grid, Loader, Segment, Form, Button, Header, Table } from 'semantic-ui-react';
import { StellarTools } from 'stellar-toolkit';
import { Field, propTypes } from 'redux-form';
import { find } from 'lodash';

import Asset from '../../../components/stellar/Asset';
import Amount from '../../../components/stellar/Amount';
import DropdownFormField from '../../UiTools/SemanticForm/Dropdown';
import InputFormField from '../../UiTools/SemanticForm/Input';

const { AssetUid, STROOP } = StellarTools;

class Offers extends React.Component {
  constructor() {
    super();
    this.state = {
      showConfirmation: false,
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
          <Asset {...offer.selling} />
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

  getAssetOptions(assets) {
    return assets.map((asset, index) => (
      {
        value: AssetUid(asset),
        text: Asset.getAssetString(asset),
      }));
  }
  getSellAssetsOptions(assets) {
    let assetsOptions = this.getAssetOptions(assets);
    if(this.props.values && this.props.values.buy_asset) {
      assetsOptions = assetsOptions.filter(t => !this.props.values.buy_asset || t.value !== this.props.values.buy_asset);
    }
    return assetsOptions;
  }
  getBuyAssetsOptions(assets) {
    let assetsOptions = this.getAssetOptions(assets);
    if(this.props.values && this.props.values.sell_asset) {
      assetsOptions = assetsOptions.filter(t => !this.props.values.sell_asset || t.value !== this.props.values.sell_asset);
    }
    return assetsOptions;
  }

  changeBuyingAsset(a, b) {
    const asset = find(this.props.trustlines, t => (AssetUid(t) === b));
    this.setState({ buying: asset }, ::this.updateOrderbook);
  }
  changeSellingAsset(a, b) {
    const asset = find(this.props.trustlines, t => (AssetUid(t) === b));
    this.setState({ selling: asset }, ::this.updateOrderbook);
  }

  updateOrderbook() {
    if (this.state.selling && this.state.buying) {
      this.props.setOrderbook(this.state);
    }
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

    return (
      <div>
        <Grid columns={3}>
          <Grid.Row>
            <Grid.Column>
              <Form.Field>
                <label>Sell</label>
                <Field
                  component={DropdownFormField}
                  name="sell_asset"
                  placeholder="Asset to sell"
                  options={this.getSellAssetsOptions(this.props.trustlines)}
                  onChange={::this.changeSellingAsset}
                  fluid
                  required
                />
              </Form.Field>
            </Grid.Column>
            <Grid.Column>
              <Form.Field>
                <label>Buy</label>
                <Field
                  component={DropdownFormField}
                  name="buy_asset"
                  placeholder="Asset to buy"
                  options={this.getBuyAssetsOptions(this.props.trustlines)}
                  onChange={::this.changeBuyingAsset}
                  fluid
                  required
                />
              </Form.Field>
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
                <label>Price</label>
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
        </Grid>
        <Field
          component={Form.Checkbox}
          name="passive"
          label="Passive offer"
        />
        <Form.Button
          type="submit"
          primary
          content="Create offer"
          onClick={::this.props.handleSubmit}
          icon="book"
        />
      </div>
    );
  }

  render() {
    return (
      <div>
        <Header as="h2">Offers</Header>
        {this.props.canSign ?
          <div>
            <Header as="h3">Create offer</Header>
            {this.getOfferForm()}
          </div>
          : null
        }
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

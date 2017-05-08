import React, { PropTypes } from 'react';
import { Dimmer, Form, Button, Header, Table } from 'semantic-ui-react';
import { StellarTools } from 'stellar-toolkit';

import Asset from '../../../components/stellar/Asset';
import Amount from '../../../components/stellar/Amount';

const { STROOP } = StellarTools;

class Offers extends React.Component {
  constructor() {
    super();
    this.state = {
      showConfirmation: false,
    };
  }
  createOffer(e, { formData }) {
    e.preventDefault();

    const selling = this.props.trustlines[formData.sell_asset];
    const buying = this.props.trustlines[formData.buy_asset];

    const offerData = {
      selling,
      buying,
      amount: formData.amount,
      price: formData.price,
      passive: formData.passive,
    };

    this.props.createOffer(offerData).then(() => {
      this.setState({
        showConfirmation: true,
      });
      setTimeout(() => {
        this.setState({
          showConfirmation: false,
        });
      }, 2000);
    });
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
  getSellAssetsOptions(assets) {
    return assets.map((asset, index) => (
      {
        value: index,
        text: Asset.getAssetString(asset),
      }));
  }
  getBuyAssetsOptions(assets) {
    return assets.map((asset, index) => (
      {
        value: index,
        text: Asset.getAssetString(asset),
      }));
  }

  getOfferForm() {

    return (
      <Form onSubmit={::this.createOffer} loading={this.props.sendingOffer}>
        <Dimmer className="successDimmer" active={this.state.showConfirmation}>
          Created
        </Dimmer>
        <Form.Group widths="2">
          <Form.Select
            label="Sell"
            name="sell_asset"
            options={this.getSellAssetsOptions(this.props.trustlines)}
            placeholder="Asset to sell"
            required
          />
          <Form.Select
            label="Buy"
            name="buy_asset"
            options={this.getBuyAssetsOptions(this.props.trustlines)}
            placeholder="Asset to buy"
            required
          />
        </Form.Group>
        <Form.Group widths="2">
          <Form.Field
            name="amount"
            label="Amount"
            control="Input"
            type="number"
            placeholder="0"
            step={STROOP}
            required
          />
          <Form.Field
            name="price"
            label="Price"
            control="Input"
            type="number"
            placeholder="1"
            step={STROOP}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Checkbox
            name="passive"
            label="Passive offer"
          />
          <Form.Button
            type="submit"
            primary
            content="Create offer"
            icon="book"
          />
        </Form.Group>
      </Form>
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
  createOffer: PropTypes.func.isRequired,
  deleteOffer: PropTypes.func.isRequired,
  canSign: PropTypes.bool,
  sendingOffer: PropTypes.bool,
};

export default Offers;

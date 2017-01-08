import React, { PropTypes } from 'react';
import { Form, Button, Header, Table } from 'semantic-ui-react'
import Asset from '../../components/stellar/Asset';

class Offers extends React.Component {
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

    this.props.createOffer(offerData);
  }

  deleteOffer(offer) {
    return e => {
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
          {offer.price}
        </Table.Cell>
        <Table.Cell>
          {offer.amount}
        </Table.Cell>
        <Table.Cell>
          {this.props.canSign ?
            <Button
              basic
              color="red"
              onClick={::this.deleteOffer(offer)}
            >
              Delete
            </Button>
            : null}
        </Table.Cell>
      </Table.Row>
    );
  }

  getOfferTable() {
    return (
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Selling</Table.HeaderCell>
            <Table.HeaderCell>Buying</Table.HeaderCell>
            <Table.HeaderCell>Price</Table.HeaderCell>
            <Table.HeaderCell>Amount</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {this.props.offers.map(::this.getOfferRow)}
        </Table.Body>
      </Table>
    );
  }

  getOfferForm() {
    const getAssetsOptions = assets => assets.map((asset, index) => (
    {
      value: index,
      text: Asset.getAssetString(asset),
    }));

    return (
      <Form onSubmit={::this.createOffer}>
        <Form.Group>
          <Form.Select
            label='Sell'
            name='sell_asset'
            options={getAssetsOptions(this.props.trustlines)}
            placeholder='Asset to sell'
            required
          />
          <Form.Select
            label='Buy'
            name='buy_asset'
            options={getAssetsOptions(this.props.trustlines)}
            placeholder='Asset to buy'
            required
          />
          <Form.Checkbox
            name="passive"
            label='Passive offer'
          />
        </Form.Group>
        <Form.Group>
          <Form.Field
            name="amount"
            label='Amount'
            control='Input'
            type='number'
            placeholder='0'
            required
          />
          <Form.Field
            name="price"
            label='Price'
            control='Input'
            type='number'
            placeholder='1'
            required
          />
          <Button type='submit'>Create offer</Button>
        </Form.Group>
      </Form>
    );
  }

  render() {
    return (
      <div>
        <Header as="h2">Offers</Header>
        {this.getOfferTable()}

        {this.props.canSign ?
          <div>
            <Header as="h3">Create offer</Header>
            {this.getOfferForm()}
          </div>
          : null
        }
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
};

export default Offers;

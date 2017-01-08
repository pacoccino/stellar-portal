import React, { PropTypes } from 'react';
import { Form, Button, Header, Table } from 'semantic-ui-react'
import Asset from '../../components/stellar/Asset';

class Offers extends React.Component {
  createOffer(e, { formData }) {
    e.preventDefault();

    const selling = this.props.trustlines[formData.buy_asset];
    const buying = this.props.trustlines[formData.sell_asset];

    const offerData = {
      selling,
      buying,
      amount: formData.amount,
      price: formData.price,
    };

    this.props.createOffer(offerData);
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
      </Table.Row>
    );
  }

  render() {
    const { offers } = this.props;

    const getAssetsOptions = assets => assets.map((asset, index) => (
    {
      value: index,
      text: Asset.getAssetString(asset),
    }));

    return (
      <div>
        <Header as="h2">Offers</Header>
        <Table singleLine>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Selling</Table.HeaderCell>
              <Table.HeaderCell>Buying</Table.HeaderCell>
              <Table.HeaderCell>Price</Table.HeaderCell>
              <Table.HeaderCell>Amount</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {offers.map(::this.getOfferRow)}
          </Table.Body>
        </Table>

        <Header as="h3">Create offer</Header>
        <Form onSubmit={::this.createOffer}>
          <Form.Select
            label='Buy'
            name='buy_asset'
            options={getAssetsOptions(this.props.trustlines)}
            placeholder='Asset to buy'
            required
          />
          <Form.Select
            label='Sell'
            name='sell_asset'
            options={getAssetsOptions(this.props.trustlines)}
            placeholder='Asset to sell'
            required
          />
          <Form.Field
            name="amount"
            label='Amount'
            control='input'
            type='number'
            placeholder='0'
            required
          />
          <Form.Field
            name="price"
            label='Price'
            control='input'
            type='number'
            placeholder='1'
            required
          />
          <Button type='submit'>Add</Button>
        </Form>
      </div>
    );
  }
}

Offers.propTypes = {
  trustlines: PropTypes.array,
  offers: PropTypes.array,
  createOffer: PropTypes.func.isRequired,
};

export default Offers;

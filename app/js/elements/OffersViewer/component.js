import React, { PropTypes } from 'react';
import { Header, List } from 'semantic-ui-react'

const getOffers = (payment, index) => {
  return (
    <List.Item key={index}>
      {payment.amount}
{/*      <b>Type:</b> {transaction.asset_type}
      <br />
      <b>Amount:</b> {transaction.balance}*/}
    </List.Item>
  );
};

const Offers = ({ offers }) =>
  <div>
    <Header as="h2">Offers</Header>
    {offers ?
      <List>
        {offers.map(getOffers)}
      </List>
    : null
    }
  </div>;

Offers.propTypes = {
  offers: PropTypes.array,
};

export default Offers;

import React, { PropTypes } from 'react';
import { Header, List } from 'semantic-ui-react'

const getPayments = (payment, index) => {
  return (
    <List.Item key={index}>
      {payment.amount}
{/*      <b>Type:</b> {transaction.asset_type}
      <br />
      <b>Amount:</b> {transaction.balance}*/}
    </List.Item>
  );
};

const Payments = ({ payments }) =>
  <div>
    <Header as="h2">Payments</Header>
    {payments ?
      <List>
        {payments.map(getPayments)}
      </List>
    : null
    }
  </div>;

Payments.propTypes = {
  payments: PropTypes.array,
};

export default Payments;

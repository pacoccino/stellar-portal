import React, { PropTypes } from 'react';
import { Header, List } from 'semantic-ui-react'

const getTransactions = (transaction, index) => {
  return (
    <List.Item key={index}>
      t
{/*      <b>Type:</b> {transaction.asset_type}
      <br />
      <b>Amount:</b> {transaction.balance}*/}
    </List.Item>
  );
};

const Transactions = ({ transactions }) =>
  <div>
    <Header as="h2">Transactions</Header>
    {transactions ?
      <List>
        {transactions.map(getTransactions)}
      </List>
    : null
    }
  </div>;

Transactions.propTypes = {
  transactions: PropTypes.array,
};

export default Transactions;

import React, { PropTypes } from 'react';
import { Header, List } from 'semantic-ui-react'
import Asset from './Asset';

const getBalance = (balance, index) => {
  return (
    <List.Item key={index}>
      <Asset {...balance} />
      <div>
        <Header as="h5">Amount</Header>
        {balance.balance}
      </div>
    </List.Item>
  );
};

const Balances = ({ balances }) =>
  <div>
    <Header as="h2">Balances</Header>
    <List>
      {balances.map(getBalance)}
    </List>
  </div>;

Balances.propTypes = {
  balances: PropTypes.array.isRequired,
};

export default Balances;

import React, { PropTypes } from 'react';
import { Header, List } from 'semantic-ui-react'

const getBalance = (balance, index) => {
  return (
    <List.Item key={index}>
      <b>Type:</b> {balance.asset_type}
      <br />
      <b>Amount:</b> {balance.balance}
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

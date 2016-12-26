import React, { PropTypes } from 'react';

const getBalance = (balance, index) => {
  return (
    <li key={index}>
      <b>Type:</b> {balance.asset_type}
      <br />
      <b>Amount:</b> {balance.balance}
    </li>
  );
};

const Balances = ({ balances }) =>
  <div>
    <ul>
      {balances.map(getBalance)}
    </ul>
  </div>;

Balances.propTypes = {
  balances: PropTypes.array.isRequired,
};

export default Balances;

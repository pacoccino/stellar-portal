import React from 'react';

import AccountSelectorContainer from '../../containers/stellar/AccountSelectorContainer';
import BalancesContainer from '../../containers/stellar/BalancesContainer';

const Main = () => (
  <div>
    <AccountSelectorContainer />
    <BalancesContainer />
  </div>
);

export default Main;
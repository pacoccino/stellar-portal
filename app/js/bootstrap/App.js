import React from 'react';
import { Provider } from 'react-redux';

import 'styles/app.scss';

import Initializer from './initializer';
import store from './store';

import Router from './router';

const App = () =>
  <Provider store={store}>
    <Initializer>
      <Router />
    </Initializer>
  </Provider>;

export default App;

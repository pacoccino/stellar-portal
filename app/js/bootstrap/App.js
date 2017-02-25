import React from 'react';
import { Provider } from 'react-redux';

import store from './store';

// import 'styles/main.scss';

import Router from './router';

const App = () =>
  <Provider store={store}>
    <Router />
  </Provider>;

export default App;

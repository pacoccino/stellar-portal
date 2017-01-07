/* eslint global-require: 0, no-shadow: 0 */
import 'react-hot-loader/patch';
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import 'babel-polyfill';
import App from './containers/App';


render(
  <AppContainer>
    <App/>
  </AppContainer>,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept('./containers/App', () => {
    const NewApp = require('./containers/App').default;
    render(
      <AppContainer>
        <NewApp/>
      </AppContainer>,
      document.getElementById('app')
    );
  });
}

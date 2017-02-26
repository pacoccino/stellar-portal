/* eslint global-require: 0, no-shadow: 0 */
import React from 'react';
import { render } from 'react-dom';
import 'babel-polyfill';
import 'isomorphic-fetch';

import App from './bootstrap/App';

render(<App />, document.getElementById('app'));

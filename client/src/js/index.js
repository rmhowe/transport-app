import 'normalize.css';
import 'font-awesome/css/font-awesome.css';
import '../css/app.css';

import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<App/>, document.getElementById('app'));
});

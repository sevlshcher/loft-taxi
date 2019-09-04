import React from 'react';
import ReactDOM from 'react-dom';
import RootRouter from './components/RootRouter';
import './index.css';
import createStore from './store';
import { Provider } from 'react-redux';

const store = createStore();

ReactDOM.render(
  <Provider store={store}>
    <RootRouter />
  </Provider>,
  document.getElementById('root')
);

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux'
import store from './store';
import 'ysynet_reset/ysynet_mobile.css';
ReactDOM.render(  
  <Provider store={store}>
    <App/>
  </Provider>, document.getElementById('root'));

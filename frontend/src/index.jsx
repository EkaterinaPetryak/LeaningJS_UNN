import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux';
import store, { history } from './store';
import Main from './components/Main';
import './style.css';
import {ConnectedRouter} from 'connected-react-router'

ReactDom.render(
    <Provider store={store}>
    <ConnectedRouter history={history}>
      <Main/>
    </ConnectedRouter>
    </Provider>
    , document.getElementById('app'));

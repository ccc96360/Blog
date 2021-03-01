import 'react-app-polyfill/ie9';
import 'react-app-polyfill/ie11';
import 'core-js'
//import 'react-app'
import 'antd/dist/antd.css';

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from './reportWebVitals';

import rootReducer from './_reducers';
import {Provider} from 'react-redux'
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore)
//일반 Store는 객체만 받을수 있기때문에 Promise와 Function도 받을 수 있게 해줌


ReactDOM.render( 
  <Provider 
    store = {createStoreWithMiddleware(rootReducer,
      window.__REDUX_DEVTOOLS_EXTENSION__&&
      window.__REDUX_DEVTOOLS_EXTENSION__()//extension Redux dev tool 사용
      )}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  ,document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();



require('./bootstrap');
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from "react-redux";


ReactDOM.render(
  <BrowserRouter basename='/realtime-chat-app'>
    <App />
  </BrowserRouter>
, document.getElementById('root'));

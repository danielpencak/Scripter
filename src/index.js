import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App';
import './index.css';
import deepstreamClient from 'deepstream.io-client-js';
import DeepstreamMixin from 'deepstream.io-tools-react';

console.log(process.env.PORT);
const client = deepstreamClient( `danielpencak-scripter.herokuapp.com:${process.env.PORT}` ).login({}, function(){
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
});

DeepstreamMixin.setDeepstreamClient(client);

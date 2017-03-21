import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App';
import './index.css';
import deepstreamClient from 'deepstream.io-client-js';
import DeepstreamMixin from 'deepstream.io-tools-react';

// TODO: set deepstream url programtically localhost or danielpencak-deepstream.herokuapp.com:80
const DS_URL = 'danielpencak-deepstream.herokuapp.com:80'
// const DS_URL = 'localhost:6020'
const client = deepstreamClient( DS_URL )
// const record = client.record.getRecord('script');
// console.log(record);
client.login({}, function(){
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
});

DeepstreamMixin.setDeepstreamClient(client);

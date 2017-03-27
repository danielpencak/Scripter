/* eslint-disable max-len, no-unused-vars, no-undef, prefer-arrow-callback */
import './index.css';
import App from './App/App';
import DeepstreamMixin from 'deepstream.io-tools-react';
import React from 'react';
import ReactDOM from 'react-dom';
import deepstreamClient from 'deepstream.io-client-js';

// TODO: set deepstream url programtically localhost or danielpencak-deepstream.herokuapp.com:80
const DS_URL = 'danielpencak-deepstream.herokuapp.com:80';

// const DS_URL = 'localhost:6020'
const client = deepstreamClient(DS_URL);

client.login({}, function() {
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
});

DeepstreamMixin.setDeepstreamClient(client);

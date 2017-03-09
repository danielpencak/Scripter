import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App';
import './index.css';
import deepstreamClient from 'deepstream.io-client-js';
import DeepstreamMixin from 'deepstream.io-tools-react';

const ds = deepstreamClient( 'localhost:6020' ).login({}, function(){
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
});

DeepstreamMixin.setDeepstreamClient( ds );

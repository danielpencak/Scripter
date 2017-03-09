import React, { Component } from 'react';
import deepstream from 'deepstream.io-client-js';
import DeepstreamMixin from 'deepstream.io-tools-react';

const client = deepstream('localhost:6020').login({}, () => {

})

DeepstreamMixin.setDeepstreamClient(client)
export default class Parent extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <input
    );
  }
}

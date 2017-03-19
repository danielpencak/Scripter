import React, { Component } from 'react';
import Header from '../Header/Header';
import LoginModal from '../LoginModal/LoginModal';
import SignupModal from '../SignupModal/SignupModal';
import axios from 'axios';
import { browserHistory } from 'react-router';
// import './Parent.css';

export default class Parent extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="Parent">
        <Header />
        <div className="page">
          {React.cloneElement(this.props.children)}
        </div>
      </div>
    );
  }
}

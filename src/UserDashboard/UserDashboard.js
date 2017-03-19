import React, { Component } from 'react';
import axios from 'axios';
import './UserDashboard.css';

export default class UserDashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="UserDashboard">
        {this.props.params.userId}
        UserDashboard
      </div>
    );
  }
}

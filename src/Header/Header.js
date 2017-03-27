/* eslint-disable no-unused-vars, no-unused-expressions, operator-linebreak, max-len */
import './Header.css';
import { Link, browserHistory } from 'react-router';
import React, { Component } from 'react';
import UserHeader from '../UserHeader/UserHeader';

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.fetchUserProjects();

    this.props.userId
    ?
    browserHistory.push('/dashboard')
    : browserHistory.push('/');
  }

  render() {
    return (
      <nav className="Header">
        <div
          onClick={this.handleClick}
          className="title">
            Scripter
        </div>
        {
          this.props.userId
          ?
          <div className="account">
            <UserHeader
              lastName={this.props.lastName}
              firstName={this.props.firstName} handleLogout={this.props.handleLogout} />
          </div>
          :
          <div className="loginButtons">
            <button
              name="loginModalOpen"
              onClick={this.props.toggleModal}>
                Login
            </button>
            <button
              name="signupModalOpen"
              onClick={this.props.toggleModal}>
                Signup
            </button>
          </div>
        }
      </nav>
    );
  }
}

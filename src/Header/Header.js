import React from 'react';
import './Header.css';
import { Link } from 'react-router';
import UserHeader from '../UserHeader/UserHeader';

export default function Header(props) {
  return (
    <nav className="Header">
      <Link to={props.userId ? `/dashboard` : '/'}>Scripter</Link>
         {
          props.userId
          ?
          <div className="account">
            <UserHeader lastName={props.lastName} firstName={props.firstName} handleLogout={props.handleLogout} />
          </div>
          :
          <div className="loginButtons">
            <button
              name='loginModalOpen'
              onClick={props.toggleModal}>
              Login
            </button>
            <button
              name='signupModalOpen'
              onClick={props.toggleModal}>
              Signup
            </button>
          </div>
        }
    </nav>
  );
}

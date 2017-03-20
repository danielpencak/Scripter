import React, { Component } from 'react';
import './UserHeader.css';
import { Button, Col } from 'react-bootstrap'

export default class UserHeader extends Component {
  constructor(props) {
    super(props)

    this.state = { menuIsOpen: false }

    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu() {
    this.setState({ menuIsOpen: !this.state.menuIsOpen })
  }

  render() {
    const { props, state, toggleMenu } = this;
    return (
      <div className="UserHeader">
        <div className="userIcon" onClick={ toggleMenu }>
          <Col className="name" smHidden xsHidden>
            {props.firstName} {props.lastName}
          </Col>
          {/* <img
            src={`https://robohash.org/${props.username}`}
            alt={`${props.username}'s Avatar`}
          /> */}
        </div>
        {
          state.menuIsOpen
          ?
          <Button
            onClick={props.handleLogout}
            className="logOut"
            bsStyle="primary"
          >
            Logout
          </Button>
          : null
        }
      </div>
    );
  }
}

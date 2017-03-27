/* eslint-disable no-unused-vars, operator-linebreak */
import './UserHeader.css';
import { Button, Col, Glyphicon } from 'react-bootstrap';
import React, { Component } from 'react';

export default class UserHeader extends Component {
  constructor(props) {
    super(props);

    this.state = { menuIsOpen: false };

    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu() {
    this.setState({ menuIsOpen: !this.state.menuIsOpen });
  }

  render() {
    const { props, state, toggleMenu } = this;

    return (
      <div className="UserHeader">
        <div className="userIcon" onClick={ toggleMenu }>
          <Col className="name" smHidden xsHidden>
            {props.firstName} {props.lastName}
            <Glyphicon glyph="chevron-down" className="chevron" />
          </Col>
        </div>
        {
          state.menuIsOpen
          ?
          <Button
            onClick={props.handleLogout}
            className="logOut"
            bsStyle="primary">
              Logout
          </Button>
          : null
        }
      </div>
    );
  }
}

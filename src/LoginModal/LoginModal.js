import React, { Component } from 'react';
import { Modal, Row, Col, ControlLabel } from 'react-bootstrap';
import './LoginModal.css';
import Validation from 'react-validation';
import '../Validations';

export default class LoginModal extends Component{
  constructor(props) {
    super(props);

    this.state = {
      errors: {}
    }
  }

  render() {
    const { props } = this;
    return (
      <div className="static-modal">
        <Modal.Dialog>
          <Modal.Body>
            <h2>Login</h2>
            <Validation.components.Form
              noValidate
              onSubmit={props.handleLoginSubmit}
            >
              <Row className="inputField">
                <Col componentClass={ControlLabel} sm={2}>
                  Email
                </Col>
                <Col sm={10}>
                  <Validation.components.Input
                    validations={['required', 'email']}
                    value={props.loginEmail}
                    onChange={props.handleChange}
                    name='loginEmail'
                    type="email"
                    placeholder="Email"
                  />
                </Col>
              </Row>
              <Row className="inputField">
                <Col componentClass={ControlLabel} sm={2}>
                  Password
                </Col>
                <Col sm={10}>
                  <Validation.components.Input
                    validations={['required', 'passwordLength']}
                    onChange={props.handleChange}
                    value={props.loginPassword}
                    name='loginPassword'
                    type="password"
                    placeholder="Password"
                  />
                </Col>
              </Row>
              <div>
                <div className="buttons">
                  <a name='loginModalOpen' onClick={props.toggleModal}>
                    Close
                  </a>
                  <button type="submit">
                    Sign in
                  </button>
                </div>
              </div>
            </Validation.components.Form>
          </Modal.Body>
        </Modal.Dialog>
      </div>
    );

  }
}

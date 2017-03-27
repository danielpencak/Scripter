/* eslint-disable no-unused-vars, arrow-parens, id-length, no-return-assign */
import '../SignupModal/SignupModal.css';
import '../Validations';
import { Col, ControlLabel, Modal, Row } from 'react-bootstrap';
import React, { Component } from 'react';
import Validation from 'react-validation';

export default class SignupModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const validations = this.form.validateAll();
    const errors = Object.keys(validations);

    if (!errors.length) {
      return this.props.handleSignupSubmit();
    }
  }

  render() {
    const { props } = this;

    return (
      <div className="static-modal">
        <Modal.Dialog>
          <Modal.Body>
            <h2>Signup</h2>
            <Validation.components.Form
              ref={c => this.form = c}
              onSubmit={this.handleSubmit}
            >
              <Row>
                <Col componentClass={ControlLabel} sm={4}>
                  Email
                </Col>
                <Col sm={8}>
                  <Validation.components.Input
                    validations={['email', 'required']}
                    value={props.signupEmail}
                    onChange={props.handleChange}
                    name="signupEmail"
                    type="email"
                    placeholder="Email"
                  />
                </Col>
              </Row>
              <Row>
                <Col componentClass={ControlLabel} sm={4}>
                  First Name
                </Col>
                <Col sm={8}>
                  <Validation.components.Input
                    validations={['required']}
                    value={props.signupFirstName}
                    onChange={props.handleChange}
                    name="signupFirstName"
                    type="text"
                    placeholder="First Name"
                  />
                </Col>
              </Row>
              <Row>
                <Col componentClass={ControlLabel} sm={4}>
                  Last Name
                </Col>
                <Col sm={8}>
                  <Validation.components.Input
                    validations={['required']}
                    value={props.signupLastName}
                    onChange={props.handleChange}
                    name="signupLastName"
                    type="text"
                    placeholder="Last Name"
                  />
                </Col>
              </Row>
              <Row>
                <Col componentClass={ControlLabel} sm={4}>
                  Password
                </Col>
                <Col sm={8}>
                  <Validation.components.Input
                    validations={['required', 'passwordLength', 'password']}
                    onChange={props.handleChange}
                    value={props.signupPassword}
                    name="signupPassword"
                    type="password"
                    placeholder="Password"
                  />
                </Col>
              </Row>
              <Row>
                <Col componentClass={ControlLabel} sm={4}>
                  Confirm Password
                </Col>
                <Col sm={8}>
                  <Validation.components.Input
                    validations={['required', 'passwordLength', 'password']}
                    onChange={props.handleChange}
                    value={props.signupConfirmPassword}
                    name="signupConfirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                  />
                </Col>
              </Row>
              <Row>
                <Col componentClass={ControlLabel} sm={4}>
                  Bio
                </Col>
                <Col sm={8}>
                  <textarea
                    onChange={props.handleChange}
                    value={props.signupBio}
                    name="signupBio"
                    placeholder="Bio"
                  />
                </Col>
              </Row>
              <div>
                <div className="buttons">
                  <a name="signupModalOpen" onClick={props.toggleModal}>
                    Close
                  </a>
                  <button type="submit">
                    Sign up
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

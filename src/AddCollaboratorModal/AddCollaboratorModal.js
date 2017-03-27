/* eslint-disable max-len, no-unused-vars, no-console, arrow-parens*/
import '../Validations';
import './AddCollaboratorModal.css';
import { Col, ControlLabel, Modal, Row } from 'react-bootstrap';
import React, { Component } from 'react';
import Validation from 'react-validation';
import axios from 'axios';
import { browserHistory } from 'react-router';

export default class AddCollaboratorModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addEmail: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleAddCollaboratorSubmit = this.handleAddCollaboratorSubmit.bind(this);
  }

  handleAddCollaboratorSubmit(event) {
    event.preventDefault();
    axios.post(`/api/projects/${this.props.projectId}/invite/collaborator`, { email: this.state.addEmail })
      .then(() => {
        return this.props.fetchProjectCollaborators();
      })
      .then(() => {
        this.props.toggleAddCollaboratorModal();
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleChange({ target }) {
    this.setState({ addEmail: target.value });
  }

  render() {
    return (
      <div className="static-modal">
        <Modal.Dialog>
          <Modal.Body>
            <h2>Add Collaborator</h2>
            <Validation.components.Form
              noValidate
              onSubmit={this.handleAddCollaboratorSubmit}
              >
                <Row className="inputField">
                  <Col componentClass={ControlLabel} sm={3}>
                    Collaborator Email
                  </Col>
                  <Col sm={9}>
                    <Validation.components.Input
                      validations={['required', 'email']}
                      value={this.state.addEmail}
                      onChange={this.handleChange}
                      name="addEmail"
                      type="email"
                      placeholder="Collaborator Email"
                    />
                  </Col>
                </Row>
                <div>
                  <div className="buttons">
                    <a
                      name="addCollaboratorModalOpen" onClick={this.props.toggleAddCollaboratorModal}>
                        Close
                    </a>
                    <button type="submit">
                      Add Collaborator
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

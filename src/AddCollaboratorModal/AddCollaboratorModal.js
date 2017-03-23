import React, { Component } from 'react';
import './AddCollaboratorModal.css';
import { Modal, Row, Col, ControlLabel } from 'react-bootstrap';
import Validation from 'react-validation';
import '../Validations';
import axios from 'axios';
import { browserHistory } from 'react-router';

export default class AddCollaboratorModal extends Component {
  constructor(props) {
    super(props);

    this.state= {
      addEmail: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleAddCollaboratorSubmit = this.handleAddCollaboratorSubmit.bind(this);
  }

  handleAddCollaboratorSubmit(event) {
    event.preventDefault();
    axios.post(`/api/projects/${this.props.projectId}/invite/collaborator`, { email: this.state.addEmail})
      .then(() => {
        return this.props.fetchProjectCollaborators();
      })
      .then(() => {
        this.props.toggleAddCollaboratorModal();
      })
      .catch(err => {
        console.log(err);
      })
  }

  handleChange({ target }) {
    this.setState({ addEmail: target.value});
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
                  <Col componentClass={ControlLabel} sm={2}>
                    Collaborator Email
                  </Col>
                  <Col sm={10}>
                    <Validation.components.Input
                      validations={['required']}
                      value={this.state.addEmail}
                      onChange={this.handleChange}
                      name='addEmail'
                      type="text"
                      placeholder="Collaborator Email"
                    />
                  </Col>
                </Row>
                <div>
                  <div className="buttons">
                    <a name='addCollaboratorModalOpen' onClick={this.props.toggleAddCollaboratorModal}>
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

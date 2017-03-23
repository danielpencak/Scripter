import React, { Component } from 'react';
import './EditProjectModal.css';
import { Modal, Row, Col, ControlLabel } from 'react-bootstrap';
import Validation from 'react-validation';
import '../Validations';
import axios from 'axios';
import { browserHistory } from 'react-router';

export default class AddProjectModal extends Component {
  constructor(props) {
    super(props);
    this.state= {
      addProjectName: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleEditProjectSubmit = this.handleEditProjectSubmit.bind(this);
  }

  handleEditProjectSubmit(event) {
    event.preventDefault();
    axios.patch(`/api/projects/${this.props.projectId}`, { name: this.state.editProjectName})
      .then(() => {
        this.props.toggleEditProjectModal();
      })
      .catch(err => {
        console.log(err);
      })
  }

  handleChange({ target }) {
    this.setState({ editProjectName: target.value});
  }

  render() {
    return (
      <div className="static-modal">
        <Modal.Dialog>
          <Modal.Body>
            <h2>Update Project</h2>
            <Validation.components.Form
              noValidate
              onSubmit={this.handleEditProjectSubmit}
              >
                <Row className="inputField">
                  <Col componentClass={ControlLabel} sm={2}>
                    Project Name
                  </Col>
                  <Col sm={10}>
                    <Validation.components.Input
                      validations={['required']}
                      value={this.state.addProjectName}
                      onChange={this.handleChange}
                      name='addProjectName'
                      type="text"
                      placeholder="Project Name"
                    />
                  </Col>
                </Row>
                <div>
                  <div className="buttons">
                    <a name='addProjectModalOpen' onClick={this.props.toggleEditProjectModal}>
                      Close
                    </a>
                    <button type="submit">
                      Update Project
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

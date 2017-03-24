import React, { Component } from 'react';
import { Modal, Row, Col, ControlLabel, Button } from 'react-bootstrap';
import './DeleteProjectModal.css';
import Validation from 'react-validation';
import '../Validations';
import { browserHistory } from 'react-router';
import axios from 'axios';

export default class DeleteProjectModal extends Component{
  constructor(props) {
    super(props);

    this.state = {
      errors: {}
    }
    this.handleDeleteProject = this.handleDeleteProject.bind(this);
  }

  handleDeleteProject() {
    axios.delete(`/api/projects/${this.props.projectId}`)
      .then(() => {
        this.props.fetchUserProjects();
      })
      .then(() => {
        this.props.toggleDeleteProjectModal();
        browserHistory.push('/dashboard');
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    const { props } = this;
    return (
      <div className="static-modal">
        <Modal.Dialog>
          <Modal.Body>
            <h2>Delete Project</h2>
            <p>Are you sure you want to delete this project?</p>
            <div>
              <div className="buttons">
                <a name='deleteProjectModalOpen' onClick={this.props.toggleDeleteProjectModal}>
                  Close
                </a>
                <button onClick={this.handleDeleteProject}>
                  Delete Project
                </button>
              </div>
            </div>
          </Modal.Body>
        </Modal.Dialog>
      </div>
    );
  }
}

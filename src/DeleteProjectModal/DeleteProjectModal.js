/* eslint-disable no-unused-vars, no-console, arrow-parens, max-len */
import './DeleteProjectModal.css';
import '../Validations';
import { Button, Col, ControlLabel, Modal, Row } from 'react-bootstrap';
import React, { Component } from 'react';
import Validation from 'react-validation';
import axios from 'axios';
import { browserHistory } from 'react-router';

export default class DeleteProjectModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {}
    };

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
      });
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
                <a
                  name="deleteProjectModalOpen" onClick={this.props.toggleDeleteProjectModal}>
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

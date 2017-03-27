/* eslint-disable no-unused-vars, no-console, arrow-parens, max-len */
import './UnsubscribeFromProjectModal.css';
import '../Validations';
import { Button, Col, ControlLabel, Modal, Row } from 'react-bootstrap';
import React, { Component } from 'react';
import Validation from 'react-validation';
import axios from 'axios';
import { browserHistory } from 'react-router';

export default class UnsubscribeFromProjectModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {}
    };

    this.handleUnsubscribe = this.handleUnsubscribe.bind(this);
  }

  handleUnsubscribe() {
    axios.delete(`/api/projects/${this.props.projectId}/unsubscribe/collaborator`)
      .then(() => {
        this.props.fetchUserProjects();
      })
      .then(() => {
        browserHistory.push('/dashboard');
      });
  }

  render() {
    return (
      <div className="static-modal">
        <Modal.Dialog>
          <Modal.Body>
            <h2>Leave Project</h2>
            <p>Are you sure you want to be removed from this project?</p>
            <div>
              <div className="buttons">
                <a
                  name="deleteProjectModalOpen" onClick={this.props.toggleUnsubscribeFromProjectModal}>
                  Close
                </a>
                <button onClick={this.handleUnsubscribe}>
                  Leave Project
                </button>
              </div>
            </div>
          </Modal.Body>
        </Modal.Dialog>
      </div>
    );
  }
}

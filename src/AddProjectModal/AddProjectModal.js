import React, { Component } from 'react';
import './AddProjectModal.css';
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
    this.handleAddProjectSubmit = this.handleAddProjectSubmit.bind(this);
  }

  handleAddProjectSubmit(event) {
    event.preventDefault();
    axios.post('/api/projects', { name: this.state.addProjectName})
      .then(res => {
        const { id } = res.data;
        browserHistory.push(`/project/${id}`);
      })
      .catch(err => {
        console.log(err);
      })
  }

  handleChange({ target }) {
    this.setState({ addProjectName: target.value});
  }

  render() {
    return (
      <div className="static-modal">
        <Modal.Dialog>
          <Modal.Body>
            <h2>Create Project</h2>
            <Validation.components.Form
              noValidate
              onSubmit={this.handleAddProjectSubmit}
              >
                <Row className="inputField">
                  <Col componentClass={ControlLabel} sm={3}>
                    Project Name
                  </Col>
                  <Col sm={9}>
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
                    <a name='addProjectModalOpen' onClick={this.props.toggleModal}>
                      Close
                    </a>
                    <button type="submit">
                      Create Project
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

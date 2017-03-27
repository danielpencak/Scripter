/* eslint-disable no-unused-vars, no-console, arrow-parens, operator-linebreak, max-len */
import './UserDashboard.css';
import { Col, Glyphicon, Grid, Row } from 'react-bootstrap';
import React, { Component } from 'react';
import AddProjectModal from '../AddProjectModal/AddProjectModal';
import { Link } from 'react-router';
import ProjectCard from '../ProjectCard/ProjectCard';
import UserCard from '../UserCard/UserCard';
import axios from 'axios';

export default class UserDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collaborators: [],
      addProjectModalOpen: false
    };

    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({ addProjectModalOpen: !this.state.addProjectModalOpen });
  }

  componentWillMount() {
    axios.get('/api/projects/collaborators')
      .then(({ data }) => {
        this.setState({ collaborators: data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="UserDashboard">
        <Grid>
          <Row className="show-grid">
            <Col sm={8} className="project">
              <div className="projectsHeader">
                <Glyphicon glyph="folder-open" />
                <h2>Projects</h2>
              </div>
              <div className="projectList">
                {
                  this.props.userProjects.map(project => {
                    return (
                      <Link
                        to={`/project/${project.projectId}`} key={project.projectId}>
                        <ProjectCard
                          projectName={project.projectName}
                          isOwner={this.props.userId === project.projectOwnerId}
                          projectUpdatedAt={project.projectUpdatedAt}
                          projectCreatedAt={project.projectCreatedAt}
                          projectId={project.projectId}
                        />
                      </Link>
                    );
                  })
              }
              <a
                className="addProject"
                name="addProjectModalOpen"
                onClick={this.toggleModal}>
                  <Glyphicon glyph="plus" />
              </a>
              </div>
            </Col>
            <Col sm={4} className="collaborators">
              <div className="collabHeader">
                <h2>
                  <Glyphicon glyph="user" /> Collaborators
                </h2>
              </div>
              <div className="collabList">
                {
                  this.state.collaborators.map(collaborator => {
                    return (
                      <UserCard
                        userFirstName={collaborator.userFirstName}
                        userLastName={collaborator.userLastName}
                        userBio={collaborator.userBio}
                        key={collaborator.userId}
                      />
                    );
                  })
                }
              </div>
            </Col>
          </Row>
        </Grid>
        {
          this.state.addProjectModalOpen
          ?
          <AddProjectModal
            toggleModal={this.toggleModal}
          />
          : null
        }
      </div>
    );
  }
}

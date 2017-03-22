import React, { Component } from 'react';
import axios from 'axios';
import { Grid, Row, Col, Glyphicon } from 'react-bootstrap';
import './UserDashboard.css';
import { Link } from 'react-router';
import ProjectCard from '../ProjectCard/ProjectCard';
import UserCard from '../UserCard/UserCard';
import AddProjectModal from '../AddProjectModal/AddProjectModal';

export default class UserDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collaborators: [],
      addProjectModalOpen: false,
    }
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
      })
  }

  render() {
    console.log(this.state.collaborators);
    return (
      <div className="UserDashboard">
        <Grid>
          <Row className="show-grid">
            <Col sm={8} className="project">
              {
                this.props.userProjects.map(project => {
                  return (
                    <Link to={`/project/${project.projectId}`}                     key={project.projectId}>
                      <ProjectCard
                        projectName={project.projectName}
                        isOwner={this.props.userId === project.projectOwnerId}
                        projectUpdatedAt={project.projectUpdatedAt}
                        projectCreatedAt={project.projectCreatedAt}
                        projectId={project.projectId}
                      />
                    </Link>
                  )
                })
              }
              <a className="addProject" name="addProjectModalOpen" onClick={this.toggleModal}>
                <Glyphicon glyph="plus" />
              </a>
            </Col>
            <Col sm={4} className="collaborators">
              <div className="collabHeader">
                <h3>
                  <Glyphicon glyph="user" /> Collaborators
                </h3>
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
                    )
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

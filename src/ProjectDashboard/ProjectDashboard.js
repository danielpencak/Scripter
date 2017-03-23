import React, { Component } from 'react';
import axios from 'axios';
import './ProjectDashboard.css';
import { Grid, Row, Col, Glyphicon } from 'react-bootstrap';
import ScriptEditor from '../ScriptEditor/ScriptEditor';
import ProjectUserCards from '../ProjectUserCards/ProjectUserCards';
import AddCollaboratorModal from '../AddCollaboratorModal/AddCollaboratorModal';
import { browserHistory } from 'react-router';
import EditProjectModal from '../EditProjectModal/EditProjectModal';
import DeleteProjectModal from '../DeleteProjectModal/DeleteProjectModal';

export default class ProjectDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collaborators: [],
      projectName: '',
      ownerId: '',
      addCollaboratorModalOpen: false,
      editProjectModalOpen: false,
      deleteProjectModalOpen: false
    }
    this.toggleAddCollaboratorModal = this.toggleAddCollaboratorModal.bind(this);
    this.toggleEditProjectModal = this.toggleEditProjectModal.bind(this);
    this.handleRemoveCollaborator = this.handleRemoveCollaborator.bind(this);
    this.fetchProjectCollaborators = this.fetchProjectCollaborators.bind(this);
    this.fetchProject = this.fetchProject.bind(this);
    this.toggleDeleteProjectModal = this.toggleDeleteProjectModal.bind(this);
  }

  toggleAddCollaboratorModal(target) {
    this.setState({ addCollaboratorModalOpen: !this.state.addCollaboratorModalOpen });
  }

  toggleEditProjectModal(target) {
    this.setState({ editProjectModalOpen: !this.state.editProjectModalOpen });
  }

  toggleDeleteProjectModal(target) {
    this.setState({ deleteProjectModalOpen: !this.state.deleteProjectModalOpen });
  }

  componentDidMount() {
    axios.get(`/api/projects/${this.props.params.projectId}/collaborators`)
      .then(({ data }) => {
        this.setState({ collaborators: data });
        this.fetchProject();
      })
      .catch(err => {
        console.log(err);
      })
  }

  handleRemoveCollaborator(userId) {
    axios.delete(`/api/projects/${this.props.params.projectId}/remove/collaborator/${userId}`)
      .then(() => {
      this.fetchProjectCollaborators();
      })
      .catch(err => {
        console.log(err);
      })
  }

  fetchProject() {
    axios.get(`/api/projects/${this.props.params.projectId}`)
      .then(({ data }) => {
        this.setState({
          projectName: data.name,
          ownerId: data.ownerId
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  fetchProjectCollaborators() {
    axios.get(`/api/projects/${this.props.params.projectId}/collaborators`)
      .then(({ data }) => {
        this.setState({ collaborators: data });
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    return (
      <Grid className="ProjectDashboard">
        <Row className="show-grid">
          <Col sm={10} className="scriptEditor">
            <ScriptEditor dsRecord={this.props.params.projectId} />
          </Col>
          <Col sm={2} className="collaborators">
            <div className="projectTitle">
              <h2>
                {this.state.projectName}
              </h2>
            </div>
            {
              this.props.userId === this.state.ownerId
              ?
              <div className="deleteProjectButton" onClick={this.toggleDeleteProjectModal}>
                Delete Project
              </div>
              : null
            }
            {
              this.props.userId === this.state.ownerId
              ?
              <div className="editProjectButton" name="editProjectModalOpen" onClick={this.toggleEditProjectModal}>
                Update Project
              </div>
              : null
            }
            <div className="collabHeader">
              <h3>
                <Glyphicon glyph="user" /> Collaborators
              </h3>
            </div>
            <div className="collabList">
              {
                this.state.collaborators.map(collaborator => {
                  return (
                    <ProjectUserCards
                      userFirstName={collaborator.userFirstName}
                      userLastName={collaborator.userLastName}
                      ownerId={this.state.ownerId}
                      key={collaborator.userId}
                      loginUserId={this.props.userId}
                      collabUserId={collaborator.userId}
                      handleRemoveCollaborator={this.handleRemoveCollaborator}
                    />
                  )
                })
              }
            </div>
            <div>
              {
                this.props.userId === this.state.ownerId
                ?
                <div className="addCollab" name="addCollaboratorModalOpen" onClick={this.toggleAddCollaboratorModal}>
                  <Glyphicon glyph="plus" />
                </div>
                : null
              }
            </div>
          </Col>
        </Row>
        {
          this.state.addCollaboratorModalOpen
          ?
          <AddCollaboratorModal
            toggleAddCollaboratorModal={this.toggleAddCollaboratorModal} projectId={this.props.params.projectId}
            fetchProjectCollaborators={this.fetchProjectCollaborators}
          />
          : null
        }
        {
          this.state.editProjectModalOpen
          ?
          <EditProjectModal
            toggleEditProjectModal={this.toggleEditProjectModal}
            projectId={this.props.params.projectId}
            fetchProject={this.fetchProject}
          />
          : null
        }
        {
          this.state.deleteProjectModalOpen
          ?
          <DeleteProjectModal
            toggleDeleteProjectModal={this.toggleDeleteProjectModal}
            projectId={this.props.params.projectId}
            fetchUserProjects={this.props.fetchUserProjects}
          />
          : null
        }
      </Grid>
    );
  }
}

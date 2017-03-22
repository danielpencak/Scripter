import React, { Component } from 'react';
import axios from 'axios';
import './ProjectDashboard.css';
import { Grid, Row, Col, Glyphicon } from 'react-bootstrap';
import ScriptEditor from '../ScriptEditor/ScriptEditor';
import UserCard from '../UserCard/UserCard';
import AddCollaboratorModal from '../AddCollaboratorModal/AddCollaboratorModal';

export default class ProjectDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collaborators: [],
      projectName: '',
      ownerId: '',
      addCollaboratorModalOpen: false
    }
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({ addCollaboratorModalOpen: !this.state.addCollaboratorModalOpen });
  }

  componentDidMount() {
    axios.get(`/api/projects/${this.props.params.projectId}/collaborators`)
      .then(({ data }) => {
        this.setState({ collaborators: data });
      })
      .catch(err => {
        console.log(err);
      })
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
                      key={collaborator.userId}
                    />
                  )
                })
              }
            </div>
            <div>
              {
                this.props.userId === this.state.ownerId
                ?
                <div className="addCollab" name="addCollaboratorModalOpen" onClick={this.toggleModal}>
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
            toggleModal={this.toggleModal} projectId={this.props.params.projectId}
          />
          : null
        }
      </Grid>
    );
  }
}

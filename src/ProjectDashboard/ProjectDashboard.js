import React, { Component } from 'react';
import axios from 'axios';
import './ProjectDashboard.css';
import { Grid, Row, Col, Glyphicon } from 'react-bootstrap';
import ScriptEditor from '../ScriptEditor/ScriptEditor';
import UserCard from '../UserCard/UserCard';

export default class ProjectDashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid className="ProjectDashboard">
        <Row className="show-grid">
          <Col sm={9} className="scriptEditor">
            <ScriptEditor dsRecord={this.props.params.projectId} />
          </Col>
          <Col sm={3} className="collaborators">
            <div className="collabHeader">
              <h3>
                <Glyphicon glyph="user" /> Collaborators
              </h3>
            </div>
            <div className="collabList">
              {/* {
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
              } */}
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

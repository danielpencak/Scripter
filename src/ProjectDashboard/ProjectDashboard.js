import React, { Component } from 'react';
import axios from 'axios';
import './ProjectDashboard.css';
import ScriptEditor from '../ScriptEditor/ScriptEditor';

export default class ProjectDashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="ProjectDashboard">
        {this.props.params.projectId}
        ProjectDashboard
        <ScriptEditor dsRecord="script" />
      </div>
    );
  }
}

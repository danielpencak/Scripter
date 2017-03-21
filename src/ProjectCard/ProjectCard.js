import React from 'react';
import './ProjectCard.css'
import moment from 'moment'
import { Glyphicon } from 'react-bootstrap';

export default function ProjectCard(props) {
  const { projectName, projectId, projectCreatedAt, projectUpdatedAt } = props;
  return(
    <div className="ProjectCard">
      <div>
        <h2>{ projectName }</h2>
        <h3>Created on:</h3>
        <p>{ moment(projectCreatedAt).format('MMMM Do YYYY, h:mm a') }</p>
      </div>
    </div>
  )
}

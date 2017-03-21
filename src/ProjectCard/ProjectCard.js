import React from 'react';
import './ProjectCard.css'
import moment from 'moment'

export default function ProjectCard(props) {
  const { projectName, projectCreatedAt } = props;
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

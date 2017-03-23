import React from 'react';
import './UserCard.css';
import { Glyphicon } from 'react-bootstrap';

export default function UserCard(props) {
  console.log(props);
  console.log(props.userId, props.ownerId);
  return (
      <div className="UserCard">
        <div className="userName">
          <h3>{props.userFirstName} {props.userLastName}</h3>
        </div>
      </div>
  );
}

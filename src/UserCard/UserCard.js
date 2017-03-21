import React from 'react';
import './UserCard.css';

export default function UserCard(props) {
  return (
      <div className="UserCard">
        <div className="userName">
          <h3>{props.userFirstName} {props.userLastName}</h3>
        </div>
      </div>
  );
}

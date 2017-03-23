import React from 'react';
import './ProjectUserCards.css';
import { Glyphicon } from 'react-bootstrap';

export default function UserCard(props) {
  console.log(props);
  console.log(props.userId, props.ownerId);
  return (
      <div className="UserCard">
        <div className="userName">
          <h3>{props.userFirstName} {props.userLastName}</h3>
        </div>
        <div>
          {
            props.loginUserId === props.ownerId
            ?
            <div className="removeCollab">
              {
                <Glyphicon
                  glyph="remove"
                  onClick={() => props.handleRemoveCollaborator(props.collabUserId)}
                />
              }
            </div>
            : null
          }
        </div>
      </div>
  );
}

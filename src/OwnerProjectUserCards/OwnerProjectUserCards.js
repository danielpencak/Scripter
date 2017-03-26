import React from 'react';
import './OwnerProjectUserCards.css';
import { Glyphicon } from 'react-bootstrap';

export default function OwnerProjectUserCards(props) {
  return (
      <div className="OwnerProjectUserCard">
        <div className="name">
          <h3>{props.userFirstName} {props.userLastName}</h3>
        </div>
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
  );
}
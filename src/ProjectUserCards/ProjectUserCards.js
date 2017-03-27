/* eslint-disable no-unused-vars, max-len, operator-linebreak */
import './ProjectUserCards.css';
import { Glyphicon } from 'react-bootstrap';
import React from 'react';

export default function ProjectUserCards(props) {
  return (
      <div className="ProjectUserCard">
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

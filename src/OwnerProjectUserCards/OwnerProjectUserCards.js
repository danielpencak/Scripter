/* eslint-disable no-unused-vars, max-len, operator-linebreak */
import './OwnerProjectUserCards.css';
import { Glyphicon } from 'react-bootstrap';
import React from 'react';

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

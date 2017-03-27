/* eslint-disable no-unused-vars, max-len */
import './Home.css';
import { Col, Glyphicon, Grid, Row } from 'react-bootstrap';
import React from 'react';

export default function Home(props) {
  return (
    <div className="Home">
      <div
        className="hero"
        style={{ backgroundImage: 'url(/assets/images/screenplay.png)' }}
        >
          <div className="banner">
            Writing the next big screenplay will take a team.
          </div>
        </div>
        <Grid>
          <Row>
            <Col sm={4}>
              <Glyphicon glyph="transfer" />
              <div className="marketing">
                Using data synchronization technology you can see a collaborator's edits as they make them.
              </div>
            </Col>
            <Col sm={4}>
              <Glyphicon glyph="film" />
              <div className="marketing">
                We take care of the formatting. That way you can focus on what will make your script stand out: the story.
              </div>
            </Col>
            <Col sm={4}>
              <Glyphicon glyph="pencil" />
              <div className="marketing">
                Since everyone on your team has the most recent version of the script at all times getting feedback and revisions is simpler than ever.
              </div>
            </Col>
          </Row>
        </Grid>
        <small>© 2017 Scripter</small>
      </div>
  );
}

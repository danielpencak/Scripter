import React from 'react';
import './Home.css';
import axios from 'axios';
import { Grid, Row, Col, Glyphicon } from 'react-bootstrap'

export default function Home(props) {
    return (
      <div className="Home">
        <div className="hero"
          style={{backgroundImage:'url(/assets/images/screenplay.png)'}}
          >
            <div className="banner">
              Writing the next big screenplay will take a team.
            </div>
          </div>
          <Grid>
            <Row>
              <Col sm={4}>
                <Glyphicon glyph="transfer" />
                <div>Using data synchronization technology you can see a collaborator's edits as they make them.</div>
              </Col>
              <Col sm={4}>
                <Glyphicon glyph="film" />
                <div>We take care of the formatting. That way you can focus on what will make your script stand out: the story.</div>
              </Col>
              <Col sm={4}>
                <Glyphicon glyph="pencil" />
                <div>Since everyone on your team has the most recent version of the script at all times getting feedback and revisions is simpler than ever.</div>
              </Col>
            </Row>
          </Grid>
          <small>© 2017 Scripter</small>
        </div>
      );
  }

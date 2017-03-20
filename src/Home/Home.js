import React, { Component } from 'react';
import './Home.css';
import axios from 'axios';
import { Grid, Row, Col, Glyphicon } from 'react-bootstrap'

export default class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
    }

  }

  render() {
    return (
      <div className="Home">
        {/* <div className="hero"
          style={{backgroundImage:'url(https://maps.googleapis.com/maps/api/staticmap?center=seattle&zoom=13&size=1200x300&scale=2&maptype=roadmap&key=AIzaSyCtST93n2hGc5ay2hN6DmtqnuB1zCKu1UA&style=feature:all|element:labels|visibility:off&style=feature:landscape.man_made%7Celement:geometry%7Ccolor:0xf7f1df&style=feature:landscape.natural%7Celement:geometry%7Ccolor:0xd0e3b4&style=feature:landscape.natural.terrain%7Celement:geometry%7Cvisibility:off&style=feature:poi%7Celement:labels%7Cvisibility:off&style=feature:poi.business%7Cvisibility:off&style=feature:poi.medical%7Celement:geometry%7Ccolor:0xfbd3da&style=feature:poi.park%7Celement:geometry%7Ccolor:0xbde6ab&style=feature:road%7Celement:geometry.stroke%7Cvisibility:off&style=feature:road%7Celement:labels%7Cvisibility:off&style=feature:road.arterial%7Celement:geometry.fill%7Ccolor:0xffffff&style=feature:road.highway%7Celement:geometry.fill%7Ccolor:0xffe15f&style=feature:road.highway%7Celement:geometry.stroke%7Ccolor:0xefd151&style=feature:road.local%7Celement:geometry.fill%7Ccolor:0xlack&style=feature:transit.station.airport%7Celement:geometry.fill%7Ccolor:0xcfb2db&style=feature:water%7Celement:geometry%7Ccolor:0xa2daf2)'}}
          >
            <div className="banner">
              {this.state.heroString}
            </div>
          </div>
          <Grid>
            <Row>
              <Col sm={4}>
                <Glyphicon glyph="map-marker" />
                <div>We use maps to help you find people playing nearby</div>
              </Col>
              <Col sm={4}>
                <Glyphicon glyph="knight" />
                <div>Discover new games that are popular in your area</div>
              </Col>
              <Col sm={4}>
                <Glyphicon glyph="globe" />
                <div>Explore your city and its unique places</div>
              </Col>
            </Row>
          </Grid> */}
          <small>© 2017 Scripter</small>
        </div>
      );
  }
}

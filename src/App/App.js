/* eslint-disable no-unused-vars */
import { IndexRoute, Route, Router, browserHistory } from 'react-router';
import React, { Component } from 'react';
import Home from '../Home/Home';
import Parent from '../Parent/Parent';
import ProjectDashboard from '../ProjectDashboard/ProjectDashboard';
import UserDashboard from '../UserDashboard/UserDashboard';

export default class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Parent}>
          <IndexRoute component={Home} />
          <Route path="/dashboard" component={UserDashboard} />
          <Route path="/project/:projectId" component={ProjectDashboard} />
        </Route>
      </Router>
    );
  }
}

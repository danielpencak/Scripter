import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Home from '../Home/Home';
import ProjectDashboard from '../ProjectDashboard/ProjectDashboard';
import CreateProject from '../CreateProject/CreateProject';
import Parent from '../Parent/Parent';
import UserDashboard from '../UserDashboard/UserDashboard';

export default class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path='/' component={Parent}>
          <IndexRoute component={Home} />
          <Route path='/dashboard' component={UserDashboard} />
          <Route path='/project/create' component={CreateProject} />
          <Route path='/project/:projectId' component={ProjectDashboard} />
        </Route>
      </Router>
    );
  }
}

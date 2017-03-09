import React, { Component } from 'react';
// import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import ScriptEditor from '../ScriptEditor/ScriptEditor';

class App extends Component {
  render() {
    return (
      <ScriptEditor dsRecord="script"/>
      // <Router history={browserHistory}>
      //   <Route path='/' component={Parent}>
      //     {/* <IndexRoute component={Home} /> */}
      //   </Route>
      // </Router>
    );
  }
}

export default App;

import React, { Component } from 'react';
// import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Deepstream from '../Deepstream/Deepstream';
// import ScriptEditor from '../ScriptEditor/ScriptEditor';

class App extends Component {
  render() {
    return (
      <Deepstream dsRecord="script"/>
      // <ScriptEditor dsRecord="script"/>
      // <Router history={browserHistory}>
      //   <Route path='/' component={Parent}>
      //     {/* <IndexRoute component={Home} /> */}
      //   </Route>
      // </Router>
    );
  }
}

export default App;

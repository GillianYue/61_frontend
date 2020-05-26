import React from 'react';
import SignIn from './signin';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import PrivateRoute from './PrivateRoute'


function App() {

  return (
    <Router>

      <div>
        <Switch>
          <Route path="/signin" render={(props)=><SignIn {...props} />} />
          <PrivateRoute path="/search" />
          <PrivateRoute path="/profile" />
          <PrivateRoute path="/" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

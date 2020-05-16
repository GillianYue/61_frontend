import React from 'react';
import Thing from './components/Thing';
import SignIn from './signin';
import Dashboard from './dashboard'
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div>

        <Switch>
          <Route path="/signin">
            <SignIn />
          </Route>
          <Route path="/thing">
            <Thing />
          </Route>
          <Route path="/">
            <Dashboard />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

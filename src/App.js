import React from 'react';
import SearchResult from './components/SearchResult';
import SignIn from './signin';
import Dashboard from './dashboard';
import TopBar from './components/topbar.js';
import Profile from './profile';
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
          <Route path="/search">
          <TopBar />
            <SearchResult />
          </Route>
          <Route path="/profile">
          <TopBar />
            <Profile />
          </Route>
          <Route path="/">
          <TopBar />
            <Dashboard />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

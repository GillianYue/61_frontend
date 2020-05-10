import React from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types'
import './index.css';
import App from './App';
import store from './app/store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom'

const Root = ({ store }) => (
    <Provider store={store}>
    <Router>
      <Route path="/:filter?" component={App} />
    </Router>
    </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired
}

render(<Root store={store} />, document.getElementById('root'))



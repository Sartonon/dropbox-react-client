import React, { Component } from 'react';
import {Router, Route, browserHistory} from 'react-router';
import MainPage from './mainPage';

export default class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path='/' component={MainPage} />
      </Router>
    );
  }
}

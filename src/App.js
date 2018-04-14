import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';

import { PoAForm } from './components';
import Home from './Home.js';


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
              <Link to="/form">Form</Link>
            </li>
          </ul>

          <hr />

          <Route exact path="/" component={Home} />
          <Route exact path="/form" component={PoAForm} />
        </div>
      </Router>
    );
  }
}

export default App;

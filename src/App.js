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
          <nav className="navbar navbar-default">
            <div className="container-fluid">
              <div className="navbar-header">
                <Link className="navbar-brand" to="/">Power of Attorney</Link>
              </div>
              <div className="navbar-right">
                <Link role="button" className="btn btn-info" to="/form">
                  Start Filling Out Your Power of Attorney
                </Link>
              </div>
            </div>
          </nav>
          <section className="container-fluid">
            <Route exact path="/" component={Home} />
            <Route exact path="/form" component={PoAForm} />
          </section>
        </div>
      </Router>
    );
  }
}

export default App;

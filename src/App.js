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
          <nav class="navbar navbar-default">
            <div className="container-fluid">
              <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="#">Power of Attorney</a>
              </div>

              <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul className="nav navbar-nav">
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/form">Form</Link>
                  </li>
                </ul>
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

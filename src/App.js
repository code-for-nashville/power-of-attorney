import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';

import { Home, PoAForm } from './components';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

class App extends Component {

  render() {
    var docDefinition = { content: 'This is an sample PDF printed with pdfMake' };
    return (
      <Router>
        <div>
          <nav style={{marginBottom: "0px"}} className="navbar navbar-default">
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
          <Route exact path="/" component={Home} />
          <Route exact path="/form" component={PoAForm} />
        </div>
      </Router>
    );
  }
}

export default App;

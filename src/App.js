import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { Home, PoAForm } from './components';

const FORM_PATH = '/form'

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
            </div>
          </nav>
          <Route exact path="/" component={Home} />
          <Route exact path={FORM_PATH} component={PoAForm} />
        </div>
      </Router>
    );
  }
}

export default App;

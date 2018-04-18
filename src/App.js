import React, { Component } from 'react';
import { Modal as ReactModal } from 'react-modal';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';

import { Disclaimer, Home, PoAForm} from './components';

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
                <button onClick={Disclaimer.handleOpenModal} className="btn btn-info"
                >Start Filling Out Your Power of Attorney</button>
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

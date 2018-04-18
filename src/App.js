import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import { Modal as ReactModal } from 'react-modal';

import { Home, PoAForm} from './components';

class App extends Component {
  constructor () {
    super();
    this.state = {
      showModal: true
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal () {
    this.setState({ showModal: true });
  }

  handleCloseModal () {
    this.setState({ showModal: false });
  }

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
                <button onClick={this.handleOpenModal} className="btn btn-info"
                >Start Filling Out Your Power of Attorney</button>
                <ReactModal
                   isOpen={true}
                >
                  <button onClick={this.handleCloseModal} to="/form">
                    Accept
                  </button>
                </ReactModal>
                <Route exact path="/form" component={PoAForm} />
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

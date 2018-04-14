import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';

import { PoAForm } from './components';
import Home from './Home.js';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

class App extends Component {

  render() {
    var docDefinition = { content: 'This is an sample PDF printed with pdfMake' };
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

          <div>
            <h1>
              heyyyyy
            </h1>
            <button onClick={() => pdfMake.createPdf(docDefinition).open()}>
              Click
            </button>

            {
              
            }
          </div>

          <Route exact path="/" component={Home} />
          <Route exact path="/form" component={PoAForm} />
        </div>
      </Router>
    );
  }
}

export default App;

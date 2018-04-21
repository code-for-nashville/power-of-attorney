import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { FAQ, Header, Home, PoAForm } from './components';

import { FAQ_PATH, FORM_PATH, HOME_PATH } from './paths';

import {
  App as GrommetApp,
  Article,
  Footer
} from 'grommet';


class App extends Component {
  render() {
    return (
      <Router>
        <GrommetApp>
          <Article>
            <Header/>
            <Route exact path={FAQ_PATH} component={FAQ} />
            <Route exact path={FORM_PATH} component={PoAForm} />
            <Route exact path={HOME_PATH} component={Home} />
            <Footer/>
          </Article>
        </GrommetApp>
      </Router>
    );
  }
}

export default App;

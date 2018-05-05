import React, {Component} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {App as GrommetApp, Article, Footer} from 'grommet'
import {I18nextProvider} from 'react-i18next'
import {Header} from './components'
import {FAQ, Home, PoAForm} from './screens'

import {FAQ_PATH, FORM_PATH, HOME_PATH} from './paths'
import i18n from './strings/i18n'

class App extends Component {
  render() {
    return (
      <Router>
        <GrommetApp>
          <I18nextProvider i18n={i18n}>
            <Article pad={{horizontal: 'large'}}>
              <Header />
              <Route exact path={FAQ_PATH} component={FAQ} />
              <Route exact path={FORM_PATH} component={PoAForm} />
              <Route exact path={HOME_PATH} component={Home} />
              <Footer />
            </Article>
          </I18nextProvider>,
        </GrommetApp>
      </Router>
    )
  }
}

export default App

import React from 'react'
import {HashRouter as Router, Route} from 'react-router-dom'
import {Grommet, Box, Footer} from 'grommet'
import {FAQ, Home, PoAForm} from './screens'
import { GROMMET_THEME } from "./styles/grommet/theme"

import {FAQ_PATH, FORM_PATH, HOME_PATH} from './paths'
import POAHeader from './components/POAHeader'

function App() {
  return (
    <Router>
      <Grommet full={true} theme={GROMMET_THEME}>
        <Box width="full" direction="row" justify="center">
          <Box pad="" width={{max: "xlarge"}} justify="center" tag="article">
            <POAHeader/>
            <Route exact path={FAQ_PATH} component={FAQ} />
            <Route path={FORM_PATH} component={PoAForm} />
            <Route exact path={HOME_PATH} component={Home} />
            <Footer />
          </Box>
        </Box>
      </Grommet>
    </Router>
  )
}

export default App

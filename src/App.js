import React from 'react'
import {HashRouter as Router, Route} from 'react-router-dom'
import {Grommet, Box, Footer} from 'grommet'
import {FAQ, Home, PoAForm} from './screens'

import {FAQ_PATH, FORM_PATH, HOME_PATH} from './paths'
import POAHeader from './components/POAHeader'

const POA_CORAL_BLUE = "#679ba1"
const POA_DARK_RED = "#f55d3e"
const POA_RED = "#dc2878"

const GROMMET_THEME = {
  global: {
    colors: {
      control: POA_DARK_RED,
      brand: POA_CORAL_BLUE
    }
  },
  // TODO Can some of this be more specific?
  button: {
    primary: {
      extend: {
        color: "white",
      }
    },
    extend: {
      // Center the label within the button
      alignItems: "center",
      direction: "column",
      justifyContent: "center",

      // Make it square
      borderRadius: "0",

      // Lower max-width
      maxWidth: "12rem",

      // Match the padding of the design
      padding: "15px 2rem !important",
      textTransform: "uppercase"
    }
  },
  heading: {
    weight: 300
  },
  anchor: {
    color: {
      light: POA_CORAL_BLUE
    }
  },
  radioButton: {
    color: POA_CORAL_BLUE,
    border: {
      color: POA_CORAL_BLUE
    },
    hover: {
      border: {
        color: POA_CORAL_BLUE
      }
    }
  }
}

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

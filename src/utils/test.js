// @flow
import React from 'react'
import {HashRouter as Router} from 'react-router-dom'

export const withRouter = (comp: React.Component) => <Router>{comp}</Router>

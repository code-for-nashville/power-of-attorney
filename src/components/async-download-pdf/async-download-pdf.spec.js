// @flow
import React from 'react'
import ReactDOM from 'react-dom'
import AsyncDownload from './'
import defaultState from '../../screens/poa-form/defaultState'
it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<AsyncDownload data={defaultState} />, div)
})

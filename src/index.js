// polyfills
import 'raf/polyfill'
import 'core-js/es6/map'
import 'core-js/es6/set'

import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import registerServiceWorker from './registerServiceWorker'

import './index.css'

import './helpers/i18n'

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()

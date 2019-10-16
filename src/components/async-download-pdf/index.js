// @flow
import React from 'react'
import {asyncComponent} from 'react-async-component'

import {Spinning, Toast} from 'grommet'
import {translate} from 'react-i18next'

const ErrorNotification = ({t}) => (
  <Toast status="critical">{t('unknownError')}</Toast>
)

export default asyncComponent({
  ErrorComponent: translate()(ErrorNotification),
  LoadingComponent: Spinning,
  name: 'AsyncDownloadPDF',
  resolve: () => import('./DownloadPDF')
})

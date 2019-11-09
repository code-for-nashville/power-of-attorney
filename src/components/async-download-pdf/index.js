// @flow
import * as React from 'react'
import {asyncComponent} from 'react-async-component'
import DownloadPDF from './DownloadPDF'
import {Spinning, Toast} from 'grommet'
import {translate} from 'react-i18next'

const ErrorNotification = ({t}) => (
  <Toast status="critical">{t('unknownError')}</Toast>
)

const asyncDownload: typeof DownloadPDF = asyncComponent({
  ErrorComponent: translate()(ErrorNotification),
  LoadingComponent: Spinning,
  name: 'AsyncDownloadPDF',
  resolve: () => import('./DownloadPDF')
})

export default asyncDownload

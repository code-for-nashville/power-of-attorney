// @flow
import * as React from 'react'
import {asyncComponent} from 'react-async-component'
import DownloadPDF from './DownloadPDF'
import {withTranslation} from 'react-i18next'

// TODO Toast for error
const ErrorNotification = ({t}) => (
  <alert>{t('unknownError')}</alert>
)

// TODO Add spinner back for loading component
const asyncDownload: typeof DownloadPDF = asyncComponent({
  ErrorComponent: withTranslation()(ErrorNotification),
  LoadingComponent: () => (<div>Please wait...</div>),
  name: 'AsyncDownloadPDF',
  resolve: () => import('./DownloadPDF')
})

export default asyncDownload

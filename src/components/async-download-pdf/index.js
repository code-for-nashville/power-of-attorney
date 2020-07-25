// @flow
import * as React from 'react'
import {asyncComponent} from 'react-async-component'
import DownloadPDF from './DownloadPDF'
import {withTranslation} from 'react-i18next'
import Loader from 'react-loader-spinner'
import { POA_CORAL_BLUE } from '../../styles/grommet/theme'

// TODO Toast for error
const ErrorNotification = ({t}) => (
  <alert>{t('unknownError')}</alert>
)

// TODO Add spinner back for loading component
const asyncDownload: typeof DownloadPDF = asyncComponent({
  ErrorComponent: withTranslation()(ErrorNotification),
  LoadingComponent: () =>
    <Loader
      type="Oval"
      color={POA_CORAL_BLUE}
      height={80}
      width={80}/>,
  name: 'AsyncDownloadPDF',
  resolve: () => import('./DownloadPDF')
})

export default asyncDownload

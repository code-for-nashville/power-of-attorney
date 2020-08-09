// @flow
import React, {useState} from 'react'
import {asyncComponent} from 'react-async-component'
import DownloadPDF from './DownloadPDF'
import {withTranslation} from 'react-i18next'
import Loader from 'react-loader-spinner'
import {Box, Layer, Paragraph, Button} from 'grommet'
import { POA_CORAL_BLUE } from '../../styles/grommet/theme'

const ErrorNotification = ({t}) => {
  const [open, setOpen] = useState(true)
  if (!open) {
    return null
  }
  return (
    <Layer className='Disclaimer' align="center" margin="medium">
      <Box overflow="auto" gap="small" width="large">
        <Box pad={{horizontal: 'medium', vertical: 'medium'}}>
          <Paragraph margin="small" fill={true}>{t('unknownError')}</Paragraph>
          <Box
            fill="horizontal"
            align="center"
            direction="row"
            justify="between"
            pad={{vertical: 'large', horizontal: 'medium'}}
          >
            <Button size="small" primary={true} onClick={() => setOpen(false)}
              label={t('OK')}/>
          </Box>
        </Box>
      </Box>
    </Layer>
  )
}

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

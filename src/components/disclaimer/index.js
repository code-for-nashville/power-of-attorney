// @flow
import React, {useState} from 'react'
import { useHistory } from "react-router-dom"

import {Anchor, Box, Layer, Paragraph, Button} from 'grommet'
import {withTranslation} from 'react-i18next'
import {FAQ_PATH} from '../../paths.js'

import './style.css'

/*
  The Disclaimer modal to display before the user is allowed to complete the form.

  We want to make sure the significance of filling out the form before it is
  filled out.
*/
function Disclaimer({t}) {
  const [open, setOpen] = useState(true)
  const history = useHistory();
  if (!open) {
    return null
  }
  return (
    <Layer className='Disclaimer' align="center" margin="medium">
      <Box overflow="auto" gap="small" width="large">
        <Box
          className="DisclaimerHeader"
          fill="horizontal"
          justify="center"
          pad={{horizontal: 'medium', vertical: 'small'}}
        >
          <div>{t('beforeStart')}</div>
        </Box>
        <Box pad={{horizontal: 'medium', vertical: 'none'}}>
          <Paragraph margin="small" fill={true}>{t('useOfThisForm')}</Paragraph>
          <Paragraph fill={true} margin="small">
            {t('lawCanBeFound')}{' '}
            <Anchor
              a11yTitle={t('lawCanBeFound')}
              href="https://law.justia.com/codes/tennessee/2017/title-34/chapter-6/part-3/"
              target="_blank"
            >
              {t('here')}
            </Anchor>.
          </Paragraph>
          <Paragraph margin="small" fill={true}>
            {t('thisFormIsToBeFilled')}
          </Paragraph>
          <Box
            fill="horizontal"
            align="center"
            direction="row"
            justify="between"
            pad={{vertical: 'large', horizontal: 'medium'}}
          >
            <Button size="small" className="DisclaimerMoreInformation" onClick={() => history.push(FAQ_PATH)} label={t('MORE_INFORMATION')}/>
            <Button size="small" primary={true} onClick={() => setOpen(false)} label={t('I_UNDERSTAND')}/>
          </Box>
        </Box>
      </Box>
    </Layer>
  )
}

export default withTranslation()(Disclaimer)

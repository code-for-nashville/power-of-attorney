// @flow
import React from 'react'

import {Anchor, Box, Layer, Paragraph} from 'grommet'
import {translate} from 'react-i18next'
import {FAQ_PATH} from '../../paths.js'

import './style.css'

/*
  The Disclaimer modal to display before the user is allowed to complet the form

  We want to make sure the significance of filling out the form before it is
  filled out.

  This component accesses the layerRef to use the _removeLayer property function and manage its own visiblity.
*/
class Disclaimer extends React.Component<*,*> {
  layerRef: Layer

  setLayerRef = (layerRef: Layer) => {
    this.layerRef = layerRef
  }

  onClick = () => {
    if (this.layerRef) {
      this.layerRef._removeLayer()
    }
  }

  render() {
    const {t} = this.props
    return (
      <Layer ref={this.setLayerRef} className={'Disclaimer'} align="center">
        <Box
          className="DisclaimerHeader"
          full="true"
          justify="center"
          pad={{horizontal: 'medium', vertical: 'small'}}
        >
          <div>{t('beforeStart')}</div>
        </Box>
        <Box pad={{horizontal: 'medium', vertical: 'none'}}>
          <Paragraph margin="small">{t('useOfThisForm')}</Paragraph>
          <Paragraph>
            {t('lawCanBeFound')}{' '}
            <Anchor
              a11yTitle={t('lawCanBeFound')}
              href="https://law.justia.com/codes/tennessee/2017/title-34/chapter-6/part-3/"
              target="_blank"
            >
              {t('here')}
            </Anchor>.
          </Paragraph>
          <Paragraph margin="small">{t('thisFormIsToBeFilled')}</Paragraph>
          <Box
            direction="row"
            justify="between"
            pad={{vertical: 'medium', horizontal: 'medium'}}
            size="large"
          >
            <Anchor className="DisclaimerMoreInformation" path={FAQ_PATH}>
              {t('MORE_INFORMATION')}
            </Anchor>
            <Anchor onClick={this.onClick}>{t('I_UNDERSTAND')}</Anchor>
          </Box>
        </Box>
      </Layer>
    )
  }
}

export default translate()(Disclaimer)

// @flow
import React from 'react'

import {Box, Button, Heading, Image, Paragraph} from 'grommet'
import {withTranslation} from 'react-i18next'
import {FORM_PATH} from '../../paths.js'

import './styles.css'
import {useHistory} from 'react-router-dom'

const Home = ({t}) => {
  const history = useHistory()
  return (
    <Box tag="section" basis="full" direction="row" justify="between">
      <Box
        className="HomeImageSection"
        pad={{horizontal: 'large'}}
        width={{max: '448px'}}
      >
        <div className="HomeImageShadowWrapper">
          <Image
            alt={t('cuteBabyBoy')}
            fill="horizontal"
            src={`${process.env.PUBLIC_URL}/images/cute-baby.jpg`}
          />
        </div>
      </Box>
      <Box
        tag="section"
        basis="auto"
        className="HomeCopy"
        pad={{vertical: 'medium'}}
        primary={true}
        width={{max: '610px'}}
      >
        <Heading
          tag="h1"
          margin="none"
          size="3rem"
          className="HomeTitleTopText"
        >
          {t('forTennessee')}
        </Heading>
        <Heading
          tag="h1"
          size="6rem"
          margin="none"
          className="HomeTitleMiddleText"
        >
          {t('immigrantParents')}
        </Heading>
        <Heading
          tag="h1"
          margin="none"
          size="2.25rem"
          className="HomeTitleBottomText"
        >
          {t('ensureCare')}
        </Heading>
        <Paragraph>{t('immigrant')}</Paragraph>
        <Paragraph>{t('gettingStarted')}</Paragraph>
        <Button
          label={t('startForm')}
          primary={true}
          onClick={() => history.push(FORM_PATH)}
        />
      </Box>
    </Box>
  )
}
export default withTranslation()(Home)

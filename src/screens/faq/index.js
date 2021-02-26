// @flow
import React from 'react'

import {Anchor, Heading, Image, Paragraph} from 'grommet'
import {withTranslation} from 'react-i18next'

const Faq = props => {
  const {t} = props
  return (
    <div>
      <Image
        alt="Dangling light bulb."
        fill="horizontal"
        src={`${process.env.PUBLIC_URL}/images/light-bulb.jpg`}
      />
      <Heading level={1}>{t('faq')}</Heading>
      <Heading level={2}>{t('whatIsPOA')}</Heading>
      <Paragraph>{t('poaIs')}</Paragraph>
      <Heading level={2}>{t('WhatIsThisFormUsedFor')}</Heading>
      <Paragraph>
        {t('formWasCreated')}
        <br />
        <br />
        {t('formWasCreatedNote')}
      </Paragraph>
      <Heading level={2}>{t('whoShouldIChoose')}</Heading>
      <Paragraph>{t('yourCaregiver')}</Paragraph>
      <Heading level={2}>{t('howCanITerminate')}</Heading>
      <Paragraph>{t('youCanTerminate')}</Paragraph>
      <Heading level={2}>{t('whatDocuments')}</Heading>
      <Paragraph>{t('whatDocumentsAnswer')}</Paragraph>
      <Heading level={2}>{t('howMuch')}</Heading>
      <Paragraph>{t('howMuchAnswer')}</Paragraph>
      <Heading level={2}>{t('whereSendDocuments')}</Heading>
      <Paragraph>{t('whereSendDocumentsAnswer')}</Paragraph>
      <Heading level={2}>{t('whereCanILearn')}</Heading>
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
      <Heading level={2}>{t('privacy')}</Heading>
      <Paragraph>{t('doesNotTrack')}</Paragraph>
    </div>
  )
}

export default withTranslation()(Faq)

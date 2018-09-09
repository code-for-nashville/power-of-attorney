// @flow
import React from 'react'

import {Anchor, Heading, Image, Paragraph, Section} from 'grommet'
import {translate} from 'react-i18next'

const Faq = props => {
  const {t} = props
  return (
    <Section pad={{vertical: 'none'}}>
      <Image
        alt="Dangling light bulb."
        full="horizontal"
        src={`${process.env.PUBLIC_URL}/images/light-bulb.jpg`}
      />
      <Heading tag="h1">{t('faq')}</Heading>
      <Heading tag="h2">{t('whatIsPOA')}</Heading>
      <Paragraph>{t('poaIs')}</Paragraph>
      <Heading tag="h2">{t('WhatIsThisFormUsedFor')}</Heading>
      <Paragraph>
        {t('formWasCreated')}
        <br />
        <br />
        {t('formWasCreatedNote')}
      </Paragraph>
      <Heading tag="h2">{t('whoShouldIChoose')}</Heading>
      <Paragraph>{t('yourCaregiver')}</Paragraph>
      <Heading tag="h2">{t('howCanITerminate')}</Heading>
      <Paragraph>{t('youCanTerminate')}</Paragraph>
      <Heading tag="h2">{t('whatDocuments')}</Heading>
      <Paragraph>{t('whatDocumentsAnswer')}</Paragraph>
      <Heading tag="h2">{t('howMuch')}</Heading>
      <Paragraph>{t('howMuchAnswer')}</Paragraph>
      <Heading tag="h2">{t('whereSendDocuments')}</Heading>
      <Paragraph>{t('whereSendDocumentsAnswer')}</Paragraph>
      <Heading tag="h2">{t('whereCanILearn')}</Heading>
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
      <Heading tag="h2">{t('privacy')}</Heading>
      <Paragraph>{t('doesNotTrack')}</Paragraph>
    </Section>
  )
}

export default translate()(Faq)

import React from 'react';

import {
  Anchor,
  Heading,
  Image,
  Paragraph,
  Section
} from 'grommet';
import { translate } from 'react-i18next';

const Faq = (props) => {
  const { t } = props;
  return (
    <Section
      pad={{vertical: 'none'}}
    >
      <Image
        alt='Dangling light bulb.'
        full='horizontal'
        src={`${process.env.PUBLIC_URL}/images/light-bulb.jpg`}
      />
      <Heading tag='h1'>
        {t('faq')}
      </Heading>
      <Heading tag='h2'>
        {t('whatIsPOA')}
      </Heading>
      <Paragraph>
        {t('poaIs')}
      </Paragraph>
      <Heading tag='h2'>
        {t('WhatIsThisFormUsedFor')}
      </Heading>
      <Paragraph>
        {t('formWasCreated')}
      </Paragraph>
      <Heading tag='h2'>
        {t('whoShouldIChoose')}
      </Heading>
      <Paragraph>
        {t('yourCaregiver')}
      </Paragraph>
      <Heading tag='h2'>
        {t('howCanITerminate')}
      </Heading>
      <Paragraph>
        {t('youCanTerminate')}
      </Paragraph>
      <Heading tag='h2'>
        {t('whereCanILearn')}
      </Heading>
      <Paragraph>
        {t('lawCanBeFound')} <Anchor
          a11yTitle='Tennessee power of attorney for a minor child law'
          href='https://law.justia.com/codes/tennessee/2010/title-34/chapter-6/part-3/'
          target='_blank'
        >{t('here')}</Anchor>.
      </Paragraph>
    </Section>
  );
};

export default translate('translations')(Faq)

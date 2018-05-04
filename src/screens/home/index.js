import React from 'react';

import {
  Box,
  Button,
  Heading,
  Headline,
  Image,
  Paragraph,
  Section
} from 'grommet';
import { translate } from 'react-i18next';
import { FORM_PATH } from '../../paths.js'

import './styles.css';


const Home = (props) => {
  const { t } = props;

  return (
    <Section
      basis='full'
      direction='row'
      justify='between'
    >
      <Box
        className='HomeImageSection'
        pad={{horizontal: 'large'}}
      >
        <div
          className='HomeImageShadowWrapper'
        >
          <Image
            alt={t('cuteBabyBoy')}
            size='large'
            src={`${process.env.PUBLIC_URL}/images/cute-baby.jpg`}
          />
        </div>
      </Box>
      <Section
        className='HomeCopy'
        pad={{vertical: 'none'}}
        primary={true}
      >
        <Heading tag='h1'>{t('forTennessee')}</Heading>
        <Headline size='large' className='HomeHeadline'>{t('immigrantParents')}</Headline>
        <Heading tag='h2'>
          {t('ensureCare')}
        </Heading>
        <Paragraph>
          {t('immigrant')}
        </Paragraph>
        <Paragraph>
          {t('gettingStarted')}
        </Paragraph>
        <Button
          label={t('startForm')}
          path={FORM_PATH}
          primary={true}
        />
      </Section>
    </Section>
  );
};
export default translate()(Home)

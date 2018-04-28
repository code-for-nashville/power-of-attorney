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

import { FORM_PATH } from '../../constants'

import './styles.css';


export default () => {
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
            alt='Cute baby boy looking up.'
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
        <Heading tag='h1'>For Tennessee</Heading>
        <Headline size='large'>Immigrant Parents:</Headline>
        <Heading tag='h2'>
          Ensure care of a minor in the case of deportation or detainment by granting power of attorney.
        </Heading>
        <Paragraph>
          Immigrant parents face detainment or deportation with little or no warning. In many cases, both parents are in the same location when detained or facing deportation. As a result, children of detained and/or deported parents are left with no legal guardian. Once detained or deported, parents are often inaccessible for days or weeks with little or no contact with their children or family. Parents facing detainment or deportation can prepare, in advance, for the care of their minor children by granting a Power of Attorney. A Power of Attorney allows immigrant parents to grant permission to a trusted adult to care for their minor child in the event of detainment or deportation.
        </Paragraph>
        <Paragraph>
          Getting started is quick and easy with this online Power of Attorney form!
        </Paragraph>
        <Button
          label="Start Form"
          path={FORM_PATH}
          primary={true}
        />
      </Section>
    </Section>
  );
};

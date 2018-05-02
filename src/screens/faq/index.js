import React from 'react';

import {
  Anchor,
  Heading,
  Image,
  Paragraph,
  Section
} from 'grommet';
import { translate } from 'react-i18next';

const Faq = () => {
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
        Frequently Asked Questions
      </Heading>
      <Heading tag='h2'>
        What is a Power of Attorney?
      </Heading>
      <Paragraph>
        A Power of Attorney is a legal document in which a parent authorizes another adult to care for their minor child. By signing a Power of Attorney, the parent does not give up any parental rights.
      </Paragraph>
      <Heading tag='h2'>
        What is this form used for?
      </Heading>
      <Paragraph>
        This form was created for immigrant parents in Tennessee who face the threat of being detained and/or deported. It allows parents to grant a caregiver temporary rights to make decisions for their minor child on their behalf. The Power of Attorney goes into effect only if the parents have been detained or deported. Completion of this form, along with the proper signatures, authorizes the caregiver to enroll the child in school, obtain medical treatment for the child, and provide for the child’s food, housing, and travel.
      </Paragraph>
      <Heading tag='h2'>
        Who should I choose as my caregiver?
      </Heading>
      <Paragraph>
        Your caregiver should be someone you trust. This document will allow the caregiver the right and responsibility to make decisions for your child on your behalf. The person you designate to care for your child should be a U.S. citizen or someone with immigration status who does not also face the threat of detainment or deportation.
      </Paragraph>
      <Heading tag='h2'>
        How can I terminate the Power of Attorney?
      </Heading>
      <Paragraph>
        You may terminate the Power of Attorney at any time by putting in writing your desire to do so.
      </Paragraph>
      <Heading tag='h2'>
        Where can I learn more about Power of Attorney for the care of a minor child?
      </Heading>
      <Paragraph>
        The law can be found <Anchor
          a11yTitle='Tennessee power of attorney for a minor child law'
          href='https://law.justia.com/codes/tennessee/2010/title-34/chapter-6/part-3/'
          target='_blank'
        >here</Anchor>.
      </Paragraph>
    </Section>
  );
};

export default translate()(Faq)

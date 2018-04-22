import React from 'react';

import {
  Anchor,
  Heading,
  Image,
  Paragraph,
  Section
} from 'grommet';


export default () => {
  return (
    <Section>
      <Image
        alt='Dangling light bulb.'
        full='horizontal'
        src={`${process.env.PUBLIC_URL}/images/light-bulb.jpg`}
      />
      <Heading tag='h1'>
        Frequently Asked Questions
      </Heading>
      <Heading tag='h2'>
        What is the Power of Attorney Form for?
      </Heading>
      <Paragraph>
        This document was created to help parents in Tennessee who may be in danger of being detained and/or deported. This form gives a caregiver temporary guardianship of your child. This power of attorney only goes into effect if you are detained or deported. This form is temporary only – permanent guardianship would need to be given by a court.
      </Paragraph>
      <Heading tag='h2'>
        Who should I choose as my caregiver?
      </Heading>
      <Paragraph>
        Your caregiver should be someone you trust. This document will give them the power to make decisions for your child as if they were you and in the best interests of the child. You can end this power of attorney at any time by putting in writing that you no longer want this person to have power of attorney over your child.
      </Paragraph>
      <Heading tag='h2'>
        Where can I learn more about Power of Attorney for a minor child?
      </Heading>
      <Paragraph>
        The law itself can be found <Anchor
          a11yTitle='Tennessee power of attorney for a minor child law'
          href='https://law.justia.com/codes/tennessee/2010/title-34/chapter-6/part-3/'
          target='_blank'
        >here</Anchor>.
      </Paragraph>
    </Section>
  );
};

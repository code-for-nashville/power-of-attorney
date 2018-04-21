import React from 'react';

import {
  Button,
  Heading,
  Headline,
  Paragraph,
  Section
} from 'grommet';

import { FORM_PATH } from '../../paths.js'


export default () => {
  return (
    <Section>
      <Heading tag='h1'>For Tennessee</Heading>
      <Headline size='large'>Immigrant Parents:</Headline>
      <Heading tag='h2'>
        Ensure care of a minor in the case of deportation or detainment by granting power of attorney.
      </Heading>
      <Paragraph>
        Immigrant parents may face detainment or deportation with little warning. Since parents may work in the same location or be in the same location when picked up by ICE/immigration, their children can be left without any legal guardian. When picked up by ICE/Immigration, parents are often unavailable or inaccessible for days or weeks (and can even be deported before ever having access to their children or family). Parents can sign a power of attorney for the minor children to give guardianship of their child to someone they trust, which takes effect only if they are detained or deported.
      </Paragraph>
      <Paragraph>
        Getting started is easy! You can fill out your Power of Attorney form online.
      </Paragraph>
      <div>
        <Button
          path={FORM_PATH}
          primary={true}
        >
          START FORM
        </Button>
      </div>
    </Section>
  );
};

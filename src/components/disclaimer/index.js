import React from 'react';

import {
  Anchor,
  Box,
  Layer,
  Menu,
  Paragraph
} from 'grommet';

import { FAQ_PATH } from '../../paths.js';

/*
  The Disclaimer modal to display before the user is allowed to complet the form

  We want to make sure the significance of filling out the form before it is
  filled out.

  It accepts an `onClose` function as a prop - this should be used to
  hide the modal when clicked.
*/
const Disclaimer = (props) => {
  return (
    <Layer align='center'>
      <Box
        full='false'
        justify='center'
      >
      <div>Before you start...</div>
      <div>
        <Paragraph>
          Use of this form is authorized by T.C.A. § 34-6-301 et seq. Completion of this form, along with the proper signatures, is sufficient to authorize enrollment of a minor in school and to authorize medical treatment. However, a school district may require additional documentation/information as permitted by this section of Tennessee law before enrolling a child in school or any extracurricular activities.
        </Paragraph>
        <Paragraph>
          This form is to be filled out and/or initialed by parent(s)/legal guardian(s).
        </Paragraph>
      </div>
      <Menu>
        <Anchor path={FAQ_PATH}>
          MORE INFORMATION
        </Anchor>
        <Anchor onClick={props.onClose}>
          I UNDERSTAND
        </Anchor>
      </Menu>
      </Box>
    </Layer>
  );
};

export default Disclaimer;

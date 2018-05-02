import React from 'react';

import {
  Anchor,
  Box,
  Layer,
  Menu,
  Paragraph
} from 'grommet';
import { translate } from 'react-i18next';
import { FAQ_PATH } from '../../paths.js';

import './style.css';

/*
  The Disclaimer modal to display before the user is allowed to complet the form

  We want to make sure the significance of filling out the form before it is
  filled out.

  It accepts an `onClose` function as a prop - this should be used to
  hide the modal when clicked.
*/
const Disclaimer = (props) => {
  const { t } = props;
  return (
    <Layer className='Disclaimer' align='center'>
      <Box
        className='DisclaimerHeader'
        full='true'
        justify='center'
        pad={{horizontal: 'medium', 'vertical': 'small'}}
      >
        <div>{t('beforeYouStart')}</div>
      </Box>
      <Box
        pad={{horizontal: 'medium', 'vertical': 'none'}}
      >
        <Paragraph
          margin='small'
        >
          {t('useOfThisForm')}
        </Paragraph>
        <Paragraph
          margin='small'
        >
          {t('thisFormIsToBeFilled')}
        </Paragraph>
        <Menu
          direction='row'
          justify='end'
          pad={{'vertical': 'medium'}}
          size='small'
        >
          <Anchor
            className='DisclaimerMoreInformation'
            path={FAQ_PATH}
          >
            {t('MORE_INFORMATION')}
          </Anchor>
          <Anchor onClick={props.onClose}>
            {t('I_UNDERSTAND')}
          </Anchor>
        </Menu>
      </Box>
    </Layer>
  );
};

export default translate('translations')(Disclaimer);

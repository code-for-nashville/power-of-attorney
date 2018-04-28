import React from 'react';
import { NavLink } from 'react-router-dom';

import {
  Box,
  Header,
  Menu
} from 'grommet';
import GrommetClassnames from 'grommet/utils/CSSClassnames.js';

import { FAQ_PATH, HOME_PATH } from '../../constants';

// Class added to Grommet anchor when `disabled=True`
// Below we use NavLink instead of <Anchor tag={NavLink}...> to work around
// a runtime error, "TypeError: location is undefined" I received when trying
const ANCHOR_DISABLED = `${GrommetClassnames.ANCHOR}--disabled`


export default () => {
  return (
    <Header>
      <Box flex={true}
        justify='end'
        direction='row'
        responsive={false}
      >
        <Menu
          direction='row'
        >
          <NavLink
            activeClassName={ANCHOR_DISABLED}
            className={GrommetClassnames.ANCHOR}
            exact
            to={HOME_PATH}
          >
            Home
          </NavLink>
          <NavLink
            activeClassName={ANCHOR_DISABLED}
            className={GrommetClassnames.ANCHOR}
            exact
            to={FAQ_PATH}
          >
            FAQ
          </NavLink>
        </Menu>
      </Box>
    </Header>
  );
};

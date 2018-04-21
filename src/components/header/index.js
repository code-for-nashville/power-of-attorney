import React from 'react';

import { FAQ_PATH, HOME_PATH } from '../../paths';

import './styles.css';

import {
  Anchor,
  Box,
  Header,
  Menu
} from 'grommet';


export default () => {
  return (
    <Header>
      <Box flex={true}
        justify='end'
        direction='row'
        responsive={false}
      >
        <Menu>
          <Anchor
            path={HOME_PATH}
          >
            Home
          </Anchor>
          <Anchor
            path={FAQ_PATH}
          >
            FAQ
          </Anchor>
        </Menu>
      </Box>
    </Header>
  );
};

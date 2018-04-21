import React from 'react';


import {
  Anchor,
  Box,
  Header,
  Menu
} from 'grommet';


import { FAQ_PATH, HOME_PATH } from '../../paths';

import './styles.css';


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

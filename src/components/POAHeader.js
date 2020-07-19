// @flow
import React from 'react'
import i18n from 'i18next'
import {Box, Button, Header, Nav, Anchor} from 'grommet'
//import GrommetClassnames from 'grommet/utils/CSSClassnames.js'
import {withTranslation} from 'react-i18next'
import {FAQ_PATH, HOME_PATH} from '../paths'
import {getCurrentLanguage} from '../helpers/i18n'
import { useLocation, useHistory } from 'react-router-dom'

// Class added to Grommet anchor when `disabled=True`
// Below we use NavLink instead of <Anchor tag={NavLink}...> to work around
// a runtime error, "TypeError: location is undefined" I received when trying
//const ANCHOR_DISABLED = `${GrommetClassnames.ANCHOR}--disabled`

const POAHeader = props => {
  const {t} = props

  const currentLanguage = getCurrentLanguage()
  const nextLanguage = currentLanguage === 'en' ? 'es' : 'en'
  const label = currentLanguage === 'en' ? 'Español' : 'English'
  const onClick = () => i18n.changeLanguage(nextLanguage)
  const { pathname } = useLocation()
  const history = useHistory()

  return (
    <Header>
      <Box flex={true} justify="between" direction="row" responsive={false}
        gap="medium" align="center" margin="medium">
        <Nav direction="row">
          <Anchor disabled={pathname === HOME_PATH}
            label={t('Home')} onClick={() => history.push(HOME_PATH)}/>
          <Anchor disabled={pathname === FAQ_PATH}
            label={t('FAQ')} onClick={() => history.push(FAQ_PATH)}/>
        </Nav>
        <Button
          className={'language-button'}
          label={label}
          onClick={onClick}
          secondary
          hoverIndicator={{background: 'neutral-2'}}
        />
      </Box>
    </Header>
  )
}

export default withTranslation()(POAHeader)

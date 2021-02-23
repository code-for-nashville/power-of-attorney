import React from 'react'
import {Header, Box} from 'grommet'
import {withTranslation} from 'react-i18next'
import AddressInput from '../AddressInput'

const GuardianInformation = ({fields, t}) => {
  return (
    <>
      <Box>
        <Header level={1}>{t('motherName')}</Header>
        <AddressInput
          nameFieldName="motherName"
          streetAddressFieldName="motherStreetAddress"
          cityFieldName="motherCity"
          stateFieldName="motherState"
          postalCodeFieldName="motherPostalCode"
        />
      </Box>
      <Box>
        <Header level={1}>{t('fatherName')}</Header>
        <AddressInput
          nameFieldName="fatherName"
          streetAddressFieldName="fatherStreetAddress"
          cityFieldName="fatherCity"
          stateFieldName="fatherState"
          postalCodeFieldName="fatherPostalCode"
        />
      </Box>
    </>
  )
}

const mapFormStateToFields = ({motherAddress, fatherAddress}) => {
  return {
    motherName: motherAddress.name,
    motherStreetAddress: motherAddress.street_address,
    motherCity: motherAddress.city,
    motherState: motherAddress.state,
    motherPostalCode: motherAddress.postal_code,
    fatherName: fatherAddress.name,
    fatherStreetAddress: fatherAddress.street_address,
    fatherCity: fatherAddress.city,
    fatherState: fatherAddress.state,
    fatherPostalCode: fatherAddress.postal_code
  }
}

const mapFieldsToFormState = fields => ({
  motherAddress: {
    name: fields.motherName,
    street_address: fields.motherStreetAddress,
    city: fields.motherCity,
    state: fields.motherState,
    postal_code: fields.motherPostalCode
  },
  fatherAddress: {
    name: fields.fatherName,
    street_address: fields.fatherStreetAddress,
    city: fields.fatherCity,
    state: fields.fatherState,
    postal_code: fields.fatherPostalCode
  }
})

export default {
  mapFormStateToFields,
  mapFieldsToFormState,
  component: withTranslation()(GuardianInformation)
}

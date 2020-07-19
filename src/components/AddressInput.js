import React from "react"
import { withTranslation } from "react-i18next"
import { FormField, TextInput, Select } from "grommet"
import { STATE_OPTIONS } from "../strings"

const AddressInput = ({
  nameFieldName,
  streetAddressFieldName,
  cityFieldName,
  stateFieldName,
  postalCodeFieldName,
  t
}) => (
  <>
    <FormField
      label={t('name')}
      name={nameFieldName}
      validate={value => !value && {
        message: t('pleaseAddName'),
        status: "error"
      }}>
      <TextInput name={nameFieldName} margin="small"/>
    </FormField>
    <FormField
      label={t('streetAddress')}
      name={streetAddressFieldName}
      validate={value => !value && {
        message: t('pleaseAddStreetAddress'),
        status: "error"
      }}>
      <TextInput name={streetAddressFieldName}/>
    </FormField>
    <FormField
      label={t('city')}
      name={cityFieldName}
      validate={value => !value && {
        message: t('pleaseAddCity'),
        status: "error"
      }}>
      <TextInput name={cityFieldName}/>
    </FormField>
    <FormField
      label={t('state')}
      name={stateFieldName}
      validate={value => !value && {
        message: t('pleaseAddState'),
        status: "error"
      }}>
      <Select
        name={stateFieldName}
        options={STATE_OPTIONS}
        labelKey="label"
        valueKey="value"
        />
    </FormField>
    <FormField
      label={t('zip')}
      name={postalCodeFieldName}
      validate={value => !/^[0-9]{5}$/.test(value) && {
        message: t('pleaseAddZip'),
        status: "error"
      }}>
      <TextInput name={postalCodeFieldName}/>
    </FormField>
  </>
)

export default withTranslation()(AddressInput)
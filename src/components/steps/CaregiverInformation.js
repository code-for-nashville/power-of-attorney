import React from "react"
import { Header, FormField, TextInput } from "grommet"
import { withTranslation } from "react-i18next"
import AddressInput from "../AddressInput"
import Regex from "../../constants"

const CaregiverInformation = ({fields, t}) => {
  return (
    <>
      <Header level={1}>{t('initialCaregiverName')}</Header>
      <AddressInput
        nameFieldName="initialCaregiverName"
        streetAddressFieldName="initialCaregiverStreetAddress"
        cityFieldName="initalCaregiverCity"
        stateFieldName="initialCaregiverState"
        postalCodeFieldName="initialCaregiverPostalCode"/>
      <FormField
        name="initialCaregiverRelationship"
        label={t('relationship')}
        validate={value => !value && {
          message: t('pleaseAddRelationship'),
          status: "error"
        }}>
        <TextInput name="initialCaregiverRelationship"/>
      </FormField>
      <FormField
        name="initialCaregiverPhoneNumber"
        label={t('phoneNumber')}
        validate={value => !Regex.phoneNumber.test(value) && {
          message: t('pleaseAddPhoneNumber'),
          status: "error"
        }}>
        <TextInput name="initialCaregiverPhoneNumber"/>
      </FormField>
      <Header level={1}>{t('successorCaregiverName')}</Header>
      <AddressInput
        nameFieldName="successorCaregiverName"
        streetAddressFieldName="successorCaregiverStreetAddress"
        cityFieldName="successorCaregiverCity"
        stateFieldName="successorCaregiverState"
        postalCodeFieldName="successorCaregiverPostalCode"/>
      <FormField
        name="successorCaregiverRelationship"
        label={t('relationship')}
        validate={value => !value && {
          message: t('pleaseAddRelationship'),
          status: "error"
        }}>
        <TextInput name="successorCaregiverRelationship"/>
      </FormField>
      <FormField
        name="successorCaregiverPhoneNumber"
        label={t('phoneNumber')}
        validate={value => !Regex.phoneNumber.test(value) && {
          message: t('pleaseAddPhoneNumber'),
          status: "error"
        }}>
        <TextInput name="successorCaregiverPhoneNumber"/>
      </FormField>
      <Header level={1}>{t('initials')}</Header>
      <FormField
        name="consentInitials"
        label={t('serveJointlyAndSeveraly')}
        validate={value => !/^[a-zA-Z]{2}$/.test(value) && {
          message: t('initials'),
          status: "error"
        }}>
          <TextInput name="consentInitials"/>
      </FormField>
    </>
  )
}

const mapFormStateToFields = ({
  initialCaregiverAddress,
  intialCaregiverRelationship,
  initialCaregiverPhoneNumber,
  successorCaregiverAddress,
  successorCaregiverRelationship,
  successorCaregiverPhoneNumber,
  consentInitials
}) => ({
  initialCaregiverName: initialCaregiverAddress.name,
  initialCaregiverStreetAddress: initialCaregiverAddress.street_address,
  initialCaregiverCity: initialCaregiverAddress.city,
  initialCaregiverState: initialCaregiverAddress.state,
  initialCaregiverPostalCode: initialCaregiverAddress.postal_code,
  intialCaregiverRelationship,
  initialCaregiverPhoneNumber,

  successorCaregiverName: successorCaregiverAddress.name,
  successorCaregiverStreetAddress: successorCaregiverAddress.street_address,
  successorCaregiverCity: successorCaregiverAddress.city,
  successorCaregiverState: successorCaregiverAddress.state,
  successorCaregiverPostalCode: successorCaregiverAddress.postal_code,
  successorCaregiverRelationship,
  successorCaregiverPhoneNumber,

  consentInitials,
})

const mapFieldsToFormState = ({
  initialCaregiverName,
  initialCaregiverStreetAddress,
  initialCaregiverCity,
  initialCaregiverState,
  initialCaregiverPostalCode,
  intialCaregiverRelationship,
  initialCaregiverPhoneNumber,

  successorCaregiverName,
  successorCaregiverStreetAddress,
  successorCaregiverCity,
  successorCaregiverState,
  successorCaregiverPostalCode,
  successorCaregiverRelationship,
  successorCaregiverPhoneNumber,

  consentInitials
}) => ({
  initialCaregiverAddress: {
    name: initialCaregiverName,
    street_address: initialCaregiverStreetAddress,
    city: initialCaregiverCity,
    state: initialCaregiverState,
    postal_code: initialCaregiverPostalCode
  },
  intialCaregiverRelationship,
  initialCaregiverPhoneNumber,
  successorCaregiverAddress: {
    name: successorCaregiverName,
    street_address: successorCaregiverStreetAddress,
    city: successorCaregiverCity,
    state: successorCaregiverState,
    postal_code: successorCaregiverPostalCode
  },
  successorCaregiverRelationship,
  successorCaregiverPhoneNumber,
  consentInitials
})

export default {
  mapFormStateToFields,
  mapFieldsToFormState,
  component: withTranslation()(CaregiverInformation)
}
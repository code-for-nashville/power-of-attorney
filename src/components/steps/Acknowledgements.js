import React from 'react'
import {Header, FormField, Paragraph, RadioButtonGroup} from 'grommet'
import {withTranslation} from 'react-i18next'

const createIOrWeUnderstandOptions = t => [
  {
    label: t('iOrWeUnderstand'),
    value: true
  },
  {
    label: t('iOrWeDoNotUnderstand'),
    value: false
  }
]

const Acknowledgements = ({fields, t}) => {
  return (
    <>
      <Header level={1}>{t('acknowledgements')}</Header>
      <Paragraph>{t('notProvidingLegalCustody')}</Paragraph>
      <FormField
        name="acknowledgedNotProvidingLegalCustody"
        validate={value =>
          !value && {
            message: t('acknowledgementsError'),
            status: 'error'
          }
        }
      >
        <RadioButtonGroup
          name="acknowledgedNotProvidingLegalCustody"
          options={createIOrWeUnderstandOptions(t)}
        />
      </FormField>
      <Paragraph>{t('documentMayBeTerminated')}</Paragraph>
      <FormField
        name="acknowledgedDocumentMayBeTerminated"
        validate={value =>
          !value && {
            message: t('acknowledgementsError'),
            status: 'error'
          }
        }
      >
        <RadioButtonGroup
          name="acknowledgedDocumentMayBeTerminated"
          options={createIOrWeUnderstandOptions(t)}
        />
      </FormField>
    </>
  )
}

const mapFormStateToFields = ({
  acknowledgedNotProvidingLegalCustody,
  acknowledgedDocumentMayBeTerminated
}) => ({
  acknowledgedNotProvidingLegalCustody,
  acknowledgedDocumentMayBeTerminated
})

const mapFieldsToFormState = ({
  acknowledgedNotProvidingLegalCustody,
  acknowledgedDocumentMayBeTerminated
}) => ({
  acknowledgedNotProvidingLegalCustody,
  acknowledgedDocumentMayBeTerminated
})

export default {
  mapFormStateToFields,
  mapFieldsToFormState,
  component: withTranslation()(Acknowledgements)
}

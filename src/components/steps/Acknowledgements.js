import React from 'react'
import {Header, FormField, Paragraph, RadioButtonGroup} from 'grommet'
import {withTranslation} from 'react-i18next'
import {UNDERSTAND} from '../../pdf/pdf-document.js'

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
          !(value === 'iOrWeUnderstand')&& {
            message: t('acknowledgementsError'),
            status: 'error'
          }
        }
      >
        <RadioButtonGroup
          name="acknowledgedNotProvidingLegalCustody"
          options={Object.values(UNDERSTAND).map(acknowledgedNotProvidingLegalCustody => ({
            label: t(acknowledgedNotProvidingLegalCustody),
            value: acknowledgedNotProvidingLegalCustody
          }))}
        />
      </FormField>
      <Paragraph>{t('documentMayBeTerminated')}</Paragraph>
      <FormField
        name="acknowledgedDocumentMayBeTerminated"
        validate={value =>
          !(value === 'iOrWeUnderstand') && {
            message: t('acknowledgementsError'),
            status: 'error'
          }
        }
      >
        <RadioButtonGroup
          name="acknowledgedDocumentMayBeTerminated"
          options={Object.values(UNDERSTAND).map(acknowledgedDocumentMayBeTerminated => ({
            label: t(acknowledgedDocumentMayBeTerminated),
            value: acknowledgedDocumentMayBeTerminated
          }))}
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

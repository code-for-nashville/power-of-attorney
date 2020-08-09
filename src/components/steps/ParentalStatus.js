import React from 'react'
import {withTranslation} from 'react-i18next'
import {Header, FormField, TextInput, RadioButtonGroup} from 'grommet'
import {PARENTAL_STATUSES} from '../../pdf/pdf-document.js'

const ParentalStatus = ({fields, t}) => {
  return (
    <>
      <Header level={1}>{t('parentalCustody')}</Header>
      <FormField
        name="parentalStatus"
        validate={value =>
          !value && {
            message: t('parentalStatus'),
            status: 'error'
          }
        }
      >
        <RadioButtonGroup
          name="parentalStatus"
          options={Object.values(PARENTAL_STATUSES).map(parentalStatus => ({
            label: t(parentalStatus),
            value: parentalStatus
          }))}
        />
      </FormField>
      {fields.parentalStatus === PARENTAL_STATUSES.legalCustodySent && (
        <FormField
          name="parentalStatusReason"
          label={t('reasonNotReached')}
          validate={value =>
            !value && {
              message: t('reasonNotReached'),
              status: 'error'
            }
          }
        >
          <TextInput name="parentalStatusReason" />
        </FormField>
      )}
      <a
        href="https://law.justia.com/codes/tennessee/2017/title-34/chapter-6/part-3/section-34-6-305/"
        target="_blank"
        rel="noopener noreferrer"
      >
        {' '}
        {t('legalCustodySentLink')}{' '}
      </a>
    </>
  )
}

const mapFormStateToFields = ({parentalStatus, parentalStatusReason}) => ({
  parentalStatus,
  parentalStatusReason
})

const mapFieldsToFormState = ({parentalStatus, parentalStatusReason}) => ({
  parentalStatus,
  parentalStatusReason
})

export default {
  mapFormStateToFields,
  mapFieldsToFormState,
  component: withTranslation()(ParentalStatus)
}

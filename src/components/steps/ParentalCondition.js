import * as React from 'react'
import {
  Header,
  FormField,
  TextArea,
  RadioButtonGroup,
  CheckBoxGroup
} from 'grommet'
import {withTranslation} from 'react-i18next'
import {AUTHORITY_GIVEN_CONDITIONS, HARDSHIPS} from '../../pdf/pdf-document'

// 4. Temporary caregiving authority regarding the minor child/children is being given to the caregiver

const ParentalCondition = ({fields, t}) => {
  return (
    <>
      <Header level={1}>{t('condition')}</Header>
      <FormField
        name="condition"
        validate={value =>
          !value && {
            message: t('conditionError'),
            status: 'error'
          }
        }
      >
        <RadioButtonGroup
          name="condition"
          options={Object.values(AUTHORITY_GIVEN_CONDITIONS).map(condition => ({
            label: t(condition),
            value: condition
          }))}
        />
      </FormField>
      {fields.condition === AUTHORITY_GIVEN_CONDITIONS.effectiveImmediately && (
        <>
          <Header level={1}>{t('hardships')}</Header>
          <FormField
            name="hardships"
            validate={value =>
              !value && {
                message: t('hardshipsError'),
                status: 'error'
              }
            }
          >
            <CheckBoxGroup
              name="hardships"
              options={Object.values(HARDSHIPS).map(hardship => ({
                label: t(hardship),
                value: hardship
              }))}
              labelKey="label"
              valueKey="value"
            />
          </FormField>
        </>
      )}
      {fields.condition === AUTHORITY_GIVEN_CONDITIONS.untilHardships && (
        <>
          <Header level={1}>{t('hardships')}</Header>
          <FormField
            name="hardships"
            validate={value =>
              !value && {
                message: t('hardshipsError'),
                status: 'error'
              }
            }
          >
            <CheckBoxGroup
              name="hardships"
              options={Object.values(HARDSHIPS).map(hardship => ({
                label: t(hardship),
                value: hardship
              }))}
              labelKey="label"
              valueKey="value"
            />
          </FormField>
        </>
      )}
      {fields.hardships.includes(HARDSHIPS.describe) && (
        <>
          <Header level={1}>{t('pleaseDescribe')}</Header>
          <FormField
            name="describeHardship"
            validate={value =>
              !value && {
                message: t('describeHardshipError'),
                status: 'error'
              }
            }
          >
            <TextArea name="describeHardship" />
          </FormField>
        </>
      )}
    </>
  )
}

const mapFormStateToFields = ({condition, hardships, describeHardship}) => ({
  condition,
  hardships,
  describeHardship
})

const mapFieldsToFormState = ({condition, hardships, describeHardship}) => ({
  condition,
  hardships,
  describeHardship
})

export default {
  mapFormStateToFields,
  mapFieldsToFormState,
  component: withTranslation()(ParentalCondition)
}

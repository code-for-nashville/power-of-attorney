import React from 'react'
import {withTranslation} from 'react-i18next'
import {FormField, TextInput, Header} from 'grommet'

export const TEST_IDS = {
  ChildNumber: 'child-number',
  ChildInput: 'child-input'
}

const DEFAULT_NUBMER_OF_CHILDREN = 1

const Subjects = ({fields, t}) => {
  const numberOfChildren = fields.numberOfChildren
    ? Number.parseInt(fields.numberOfChildren)
    : DEFAULT_NUBMER_OF_CHILDREN
  return (
    <>
      <FormField
        name="numberOfChildren"
        label={t('numberOfChildren')}
        validate={value =>
          value <= 0 && {
            message: t('mustBeGreaterThanZero'),
            status: 'error'
          }
        }
        data-testid={TEST_IDS.ChildNumber}
      >
        <TextInput name="numberOfChildren" type="number" />
      </FormField>
      {Array(numberOfChildren)
        .fill()
        .map((_, i) => (
          <FormField
            key={i}
            name={`child${i}`}
            label={t('childsFullName')}
            validate={value =>
              !value && {
                message: t('pleaseAddChildName'),
                status: 'error'
              }
            }
            data-testid={TEST_IDS.ChildInput}
          >
            <TextInput name={`child${i}`} />
          </FormField>
        ))}
    </>
  )
}

const mapFormStateToFields = ({childrenNames}) => {
  const childNameFields = {}
  for (const [index, childName] of childrenNames.entries()) {
    childNameFields[`child${index}`] = childName
  }
  return {
    numberOfChildren: childrenNames.length,
    ...childNameFields
  }
}

const mapFieldsToFormState = fields => {
  const childrenNames = []
  for (var i = 0; i < fields.numberOfChildren.length; i++) {
    childrenNames.push(fields[`child${i}`])
  }
  return {childrenNames}
}

export default {
  mapFormStateToFields,
  mapFieldsToFormState,
  component: withTranslation()(Subjects)
}

// @flow
import React from 'react'
import {withTranslation} from 'react-i18next'
import FormStepper, { FormStep } from "../../components/FormStepper"

import defaultState from './defaultState'
import './styles.css'
import subjects from '../../components/steps/Subjects'
import guardianInformation from '../../components/steps/GuardianInformation'
import caregiverInformation from "../../components/steps/CaregiverInformation"
import parentalStatus from "../../components/steps/ParentalStatus"
import parentalCondition from "../../components/steps/ParentalCondition"
import AsyncDownloadPDF from "../../components/async-download-pdf"

const PoAForm = ({initialState = defaultState, t}) => (
  <FormStepper
    initialFormState={initialState}
    onFormComplete={(formState) => console.info("Done!", formState)}>
    <FormStep
      stepPath="subjects"
      title={t('childInformation')}
      component={subjects.component}
      mapFormStateToFields={subjects.mapFormStateToFields}
      mapFieldsToFormState={subjects.mapFieldsToFormState}
    />
    <FormStep
      stepPath="guardian-information"
      title={t('guardianInformation')}
      component={guardianInformation.component}
      mapFormStateToFields={guardianInformation.mapFormStateToFields}
      mapFieldsToFormState={guardianInformation.mapFieldsToFormState}
    />
    <FormStep
      stepPath="caregiver-information"
      title={t('caregiverInformation')}
      component={caregiverInformation.component}
      mapFormStateToFields={caregiverInformation.mapFormStateToFields}
      mapFieldsToFormState={caregiverInformation.mapFieldsToFormState}
    />
    <FormStep
      stepPath="parental-status"
      title={t('parentalCustody')}
      component={parentalStatus.component}
      mapFormStateToFields={parentalStatus.mapFormStateToFields}
      mapFieldsToFormState={parentalStatus.mapFieldsToFormState}
    />
    <FormStep
      stepPath="parental-condition"
      title={t('condition')}
      component={parentalCondition.component}
      mapFormStateToFields={parentalCondition.mapFormStateToFields}
      mapFieldsToFormState={parentalCondition.mapFieldsToFormState}
    />
    <FormStep
      stepPath="download"
      title={t('download')}
      component={({fields}) => <AsyncDownloadPDF data={fields}/>}
      mapFormStateToFields={formState => formState}
      mapFieldsToFormState={() => {}}
    />
  </FormStepper>
)

export default withTranslation()(PoAForm)

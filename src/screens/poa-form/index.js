// @flow
import React, {Component} from 'react'
import {translate} from 'react-i18next'
import {Box, Button, Form, Heading, Paragraph, Section} from 'grommet'
import Stepper from 'react-stepper-horizontal'

import {
  Disclaimer,
  AsyncDownloadPDF,
  FormSubjects,
  FieldHeader,
  Address,
  ChoiceBox
} from '../../components'
import type {FormInputs} from '../../types'
import Regex from '../../constants'
import {PARENTAL_STATUSES} from '../../pdf/pdf-document.js'
import defaultState from './defaultState'
import './styles.css'

type AddressKeysType =
  | 'name'
  | 'street_address'
  | 'locality'
  | 'region'
  | 'postal_code'

type PoAFormProps = {|
  t: string => string
|}

type FormInputErrors = {|
  childrenNames: ?boolean,
  parentalStatus: ?boolean,
  parentalStatusReason: ?boolean,
  motherAddress: {[AddressKeysType]: ?boolean},
  fatherAddress: {[AddressKeysType]: ?boolean},
  caregiverAddress: {[AddressKeysType]: ?boolean}
|}

type PoAFormState = {|
  acceptedModal: boolean,
  step: {
    number: number,
    attempted: boolean
  },
  numberOfChildren: number,
  submitted: boolean,
  errors: FormInputErrors,
  ...FormInputs
|}

class PoAForm extends Component<PoAFormProps, PoAFormState> {
  constructor(props: PoAFormProps) {
    super(props)
    this.state = defaultState
  }

  state: PoAFormState

  componentDidUpdate(prevProps: PoAFormProps, prevState: PoAFormState) {
    // if finished form and if no new changes, submit to access form, else if new changes hide 'open/download form'
    if (
      this.state.submitted === true &&
      this.state.submitted === prevState.submitted &&
      this.state !== prevState
    ) {
      this.setState({submitted: false})
    }
  }

  validateAddress = (address: {[AddressKeysType]: string}) => {
    const isEmpty = value => (value && value.length === 0) || !value
    let areAllFieldsEmpty = true
    const validatedAddress: {[AddressKeysType]: string} = Object.keys(
      address
    ).reduce((result, field) => {
      const isFieldEmpty = isEmpty(address[field])
      if (areAllFieldsEmpty && !isFieldEmpty) areAllFieldsEmpty = false
      return {
        ...result,
        [field]: isFieldEmpty
      }
    }, {})
    // If all fields are empty, the address form is valid
    return areAllFieldsEmpty === true
      ? {}
      : Object.assign(validatedAddress, {
          // 5 digit postal codes only for now, though there is a valid 10 digit
          // format (e.g. 12345-4321).
          postal_code:
            validatedAddress.postal_code ||
            !Regex.postalCode.test(address.postal_code)
        })
  }

  acceptModal = () => {
    this.setState({acceptedModal: true})
  }

  submit = () => {
    this.setState({submitted: true})
  }

  _back = () => {
    if (this.state.step.number > 0) {
      this.setState(state => ({
        step: {
          number: state.step.number - 1,
          attempted: false
        }
      }))
    }
  }

  /*
    Recursively check if an error object has errors.

    Error objects are expected to have booleans(true/false) or a nested error
    object as values.
  */
  static hasError(errorEntry: boolean | Object): boolean {
    return PoAForm.errorCount(errorEntry) > 0
  }

  static errorCount(errorEntry: boolean | Object): number {
    if (typeof errorEntry === 'boolean') {
      return errorEntry ? 1 : 0
    } else if (typeof errorEntry === 'object') {
      return Object.values(errorEntry).reduce((sum, errorEntry) => sum + PoAForm.errorCount(errorEntry), 0)
    }
    return 0
  }

  _next = () => {
    const errors = this.stepErrors()
    this.setState(state => ({
      step: {...state.step, attempted: true}
    }))
    if (PoAForm.hasError(errors)) {
      this.setState({errors: errors})
    } else {
      if (this.isLastStep()) {
        this.submit()
      } else {
        this.setState(state => ({
          step: {
            number: state.step.number + 1,
            attempted: false
          }
        }))
        if (typeof window !== 'undefined') window.scrollTo(0, 0)
      }
    }
  }

  /*
    Returns an object containing validation errors for just the current step.
  */
  stepErrors(): Object {
    const validators = [
      {
        // Only non-empty child names are valid
        childrenNames: () =>
          this.state.childrenNames.filter(n => !!n).length !==
          this.state.numberOfChildren
      },
      {
        motherAddress: () => this.validateAddress(this.state.motherAddress),
        fatherAddress: () => this.validateAddress(this.state.fatherAddress)
      },
      {
        caregiverAddress: () =>
          this.validateAddress(this.state.caregiverAddress)
      },
      {
        parentalStatus: () => this.state.parentalStatus.length === 1,
        parentalStatusReason: () =>
          this.state.parentalStatus === '5'
            ? this.state.parentalStatusReason.length === 0
            : false
      }
    ][this.state.step.number]

    const errors = {}

    for (let [key, validator] of Object.entries(validators)) {
      if (typeof validator === 'function') errors[key] = validator()
    }

    return errors
  }

  isLastStep = () => {
    return this.state.step.number === 3
  }

  renderAddress = name => {
    const errors = this.state.errors[name] || {}

    return (
      <Address
        errors={errors}
        address={this.state[name]}
        onChange={(inputName, value) =>
          this.setState(prevState => ({
            [name]: {
              ...prevState[name],
              [inputName]: value
            }
          }))
        }
        name={name}
      />
    )
  }

  renderStepOne() {
    const {errors, numberOfChildren, childrenNames: subjectNames} = this.state
    return (
      <FormSubjects
        error={errors.childrenNames}
        subjectNumberValue={numberOfChildren}
        onChangeSubjectNumber={num =>
          this.setState(prevState => {
            const childrenNames = prevState.childrenNames.slice(0, num)
            return {
              numberOfChildren: num,
              childrenNames
            }
          })
        }
        subjectNames={subjectNames}
        onChangeSubjectName={names => this.setState({childrenNames: names})}
      />
    )
  }

  renderStepTwo() {
    const {t} = this.props
    return (
      <div>
        <FieldHeader>{t('motherName')}</FieldHeader>
        {this.renderAddress('motherAddress')}
        <FieldHeader>{t('fatherName')}</FieldHeader>
        {this.renderAddress('fatherAddress')}
      </div>
    )
  }

  renderStepThree() {
    const {t} = this.props
    return (
      <div>
        <FieldHeader>{t('caregiverName')}</FieldHeader>
        {this.renderAddress('caregiverAddress')}
      </div>
    )
  }

  renderStepFour() {
    const {t} = this.props

    let errorMessage = null
    if (this.state.errors.parentalStatus) {
      errorMessage = t('pleaseAddParentalStatus')
    } else if (this.state.errors.parentalStatusReason) {
      errorMessage = t('pleaseAddReason')
    }

    return (
      <ChoiceBox
        choice={this.state.parentalStatus}
        onChangeRadio={parentalStatus => this.setState({parentalStatus})}
        onChangeFreeAnswer={parentalStatusReason =>
          this.setState({parentalStatusReason})
        }
        error={errorMessage}
        options={PARENTAL_STATUSES}
        value={this.state.parentalStatus}
        freeText
        freeTextValue={this.state.parentalStatusReason}
      />
    )
  }

  renderForm() {
    switch (this.state.step.number) {
      case 0:
        return this.renderStepOne()
      case 1:
        return this.renderStepTwo()
      case 2:
        return this.renderStepThree()
      case 3:
        return this.renderStepFour()
      default:
        return this.renderStepOne()
    }
  }

  renderDownloadButtons() {
    if (this.state.submitted) {
      return <AsyncDownloadPDF data={this.state} />
    }
    return null
  }

  /*
    Checks if the step has been attempted. If so, checks to see if there are errors for the current step.
    If so, renders a box with an error message. Otherwise, returns null.
   */
  renderErrorMessage() {
    if (this.state.step && this.state.step.attempted) {
      const stepErrorKeys = Object.keys(this.stepErrors())
      const errors = this.state.errors
      const errorCount = stepErrorKeys.map(stepErrorKey => errors[stepErrorKey])
        .map(PoAForm.errorCount)
        .reduce((sum, errorCount) => sum + errorCount, 0)
      const {t} = this.props
      if (errorCount > 0) {
        return (
          <Box align="end" className="form-error-message">
            {t('formWithErrors', {errorCount: errorCount.toString()})}
            {/* The version of grommet being used doesn't support padding only on one side */}
            <Box pad={{vertical: "small"}}/>
          </Box>
        )
      }
    }
    return null
  }

  render() {
    // Hide the disclaimer if `acceptedModal` is true
    const disclaimer = !this.state.acceptedModal ? (
      <Disclaimer onClose={this.acceptModal} />
    ) : null
    const {t} = this.props
    return (
      <Section>
        {disclaimer}
        <Heading tag="h1">{t('powerOfAttorney')}</Heading>
        <div>
          <div className="stepper">
            <Stepper
              steps={[
                {
                  title: t('childInformation'),
                  onClick: () => {
                    this.setState(state => ({step: 0}))
                  }
                },
                {
                  title: t('guardianInformation'),
                  onClick: () => {
                    this.setState(state => ({step: 1}))
                  }
                },
                {
                  title: t('caregiversInformation'),
                  onClick: () => {
                    this.setState(state => ({step: 2}))
                  }
                },
                {
                  title: t('parentalstatus'),
                  onClick: () => {
                    this.setState(state => ({step: 3}))
                  }
                }
              ]}
              activeColor="#679ba1"
              completeColor="#679ba1"
              activeBorderColor="#679ba1"
              activeStep={this.state.step.number}
            />
          </div>
        </div>

        <Paragraph className="align-center">
          <strong>{t('partI')} </strong>
          {t('thisFormIsToBeFilled')}
        </Paragraph>
        <Box direction="row" justify="between">
          <Box basis="1/3" />
          <Box basis="1/3">
            <Form autoComplete="off" className="align-center">
              <Box pad={{vertical: 'medium'}}>{this.renderForm()}</Box>
              {this.renderErrorMessage()}
              <Box
                alignSelf="center"
                direction="row"
                justify="between"
                basis="medium"
                className="button-box"
              >
                <Button
                  label={t('back')}
                  onClick={this._back}
                  primary={true}
                  className="button hidden-large"
                  style={
                    this.state.step.number === 0
                      ? {backgroundColor: 'grey', borderColor: 'grey'}
                      : {}
                  }
                />
                <Button
                  label={this.isLastStep() ? t('submit') : t('next')}
                  onClick={this._next}
                  primary={true}
                  className="button"
                />
              </Box>
            </Form>
          </Box>
          <Box pad="small" basis="1/3" alignContent="center">
            {this.renderDownloadButtons()}
          </Box>
        </Box>
      </Section>
    )
  }
}

export default translate()(PoAForm)

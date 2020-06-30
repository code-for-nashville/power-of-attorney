// @flow
import React, {Component} from 'react'
import {
  Box,
  Button,
  Form,
  Heading,
  Paragraph,
  Section,
  FormField,
  TextInput
} from 'grommet'
import {translate} from 'react-i18next'
import Stepper from 'react-stepper-horizontal'

import {
  Disclaimer,
  AsyncDownloadPDF,
  FormSubjects,
  FieldHeader,
  Address,
  RadioBox,
  InitialsInput
} from '../../components'
import type {FormInputs} from '../../types'
import Regex from '../../constants'
import {
  PARENTAL_STATUSES,
  INITIAL_CAREGIVER,
  SUCCESSOR_CAREGIVER,
  HARDSHIPS
} from '../../pdf/pdf-document.js'
import StepFive from './step-five'
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
  initialCaregiverAddress: {[AddressKeysType]: ?boolean},
  successorCaregiverAddress: {[AddressKeysType]: ?boolean},
  initialCaregiverRelationship: string,
  initialCaregiverPhoneNumber: string,
  successorCaregiverRelationship: string,
  successorCaregiverPhoneNumber: string,
  consentInitials: [string, string]
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
    const {submitted} = this.state
    // if finished form and if no new changes, submit to access form, else if new changes hide 'open/download form'
    if (
      submitted === true &&
      submitted === prevState.submitted &&
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
          postal_code: !Regex.postalCode.test(address.postal_code)
        })
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
    } else if (typeof errorEntry === 'object' && errorEntry !== null) {
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
    const {
      childrenNames,
      motherAddress,
      numberOfChildren,
      fatherAddress,
      parentalStatus,
      parentalStatusReason,
      initialCaregiverPhoneNumber,
      initialCaregiverRelationship,
      initialCaregiverAddress,
      successorCaregiverAddress,
      successorCaregiverPhoneNumber,
      successorCaregiverRelationship,
      consentInitials,
      condition,
      hardships,
      describeHardship,
    } = this.state
    const validators = [
      {
        // Only non-empty child names are valid
        childrenNames: () =>
          childrenNames.filter(n => !!n).length !== numberOfChildren
      },
      {
        motherAddress: () => this.validateAddress(motherAddress),
        fatherAddress: () => this.validateAddress(fatherAddress)
      },
      {
        initialCaregiverAddress: () =>
          this.validateAddress(initialCaregiverAddress),
        initialCaregiverPhoneNumber: () =>
          !Regex.phoneNumber.test(initialCaregiverPhoneNumber),
        initialCaregiverRelationship: () => !!!initialCaregiverRelationship,
        successorCaregiverAddress: () =>
          this.validateAddress(successorCaregiverAddress),
        successorCaregiverPhoneNumber: () =>
          !Regex.phoneNumber.test(successorCaregiverPhoneNumber),
        successorCaregiverRelationship: () => !!!successorCaregiverRelationship,
        consentInitials: () => consentInitials.filter(i => i).length === 0
      },
      {
        parentalStatus: () => parentalStatus.length === 1,
        parentalStatusReason: () =>
          parentalStatus === '5' ? parentalStatusReason.length === 0 : false
      },
      {
        condition: () => !condition,
        hardships: () => hardships.length < 1,
        describeHardship: () =>
          hardships.indexOf(HARDSHIPS.describe) > -1 && !describeHardship
      },
      {},
      {}
    ][this.state.step.number]

    const errors = {}

    for (let [key, validator] of Object.entries(validators)) {
      if (typeof validator === 'function') {
        errors[key] = validator()
      }
    }

    return errors
  }

  isLastStep = () => {
    return this.state.step === 6
  }

  addressOnChange = (inputName, value, name) => {
    this.setState(prevState => ({
      [name]: {
        ...prevState[name],
        [inputName]: value
      }
    }))
  }

  steps = () => {
    const {t} = this.props
    return [
      {
        title: t('childInformation'),
        onClick: () => {
          this.setState(() => ({step: 0}))
        },
        component: this.renderStepOne()
      },
      {
        title: t('guardianInformation'),
        onClick: () => {
          this.setState(() => ({step: 1}))
        },
        component: this.renderStepTwo()
      },
      {
        title: t('caregiversInformation'),
        onClick: () => {
          this.setState(() => ({step: 2}))
        },
        component: this.renderCaregiverStep()
      },
      {
        title: t('parentalCustody'),
        onClick: () => {
          this.setState(() => ({step: 3}))
        },
        component: this.renderStepFour()
      },
      {
        title: t('temporaryAuthority'),
        onClick: () => {
          this.setState(() => ({step: 4}))
        },
        component: this.renderStepFive()
      },
      {
        title: t('notProvideCustody'),
        onClick: () => {
          this.setState(() => ({step: 5}))
        },
        component: this.renderStepSix()
      },
      {
        title: t('mayBeTerminated'),
        onClick: () => {
          this.setState(() => ({step: 6}))
        },
        component: this.renderStepSeven()
      }
    ]
  }

  onChangeInitialsInput = (initial: {[string]: [?string, ?string]}) => {
    this.setState(initial)
  }

  eventDefaultSetState = e => {
    const {value, name} = e.target
    this.setState({[name]: value})
  }

  renderAddress = name => {
    const {errors} = this.state
    const address = this.state[name]
    const addressErrors = errors[name] || {}
    return (
      <Address
        errors={addressErrors}
        address={address}
        onChange={this.addressOnChange}
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
        <Box margin={{vertical: 'medium'}}>
          {this.renderAddress('motherAddress')}
        </Box>
        <FieldHeader>{t('fatherName')}</FieldHeader>
        <Box margin={{vertical: 'medium'}}>
          {this.renderAddress('fatherAddress')}
        </Box>
      </div>
    )
  }

  renderCaregiverInfo = (
    key: string,
    state: {
      relationshipError: boolean,
      caregiverRelationship: string,
      phoneNumberError: boolean,
      caregiverPhoneNumber: string
    }
  ) => {
    const {t} = this.props
    const {
      relationshipError,
      caregiverRelationship,
      phoneNumberError,
      caregiverPhoneNumber
    } = state
    return (
      <React.Fragment>
        <FieldHeader>{t(`${key}Name`)}</FieldHeader>
        <Box margin={{vertical: 'medium'}}>
          {this.renderAddress(`${key}Address`)}
          <FormField
            label={t('relationship')}
            error={relationshipError ? t('pleaseAddRelationship') : null}
          >
            <TextInput
              onDOMChange={this.eventDefaultSetState}
              className="input-class"
              value={caregiverRelationship}
              name={`${key}Relationship`}
            />
          </FormField>
          <FormField
            label={t('phoneNumber')}
            error={phoneNumberError ? t('pleaseAddPhoneNumber') : null}
          >
            <TextInput
              onDOMChange={this.eventDefaultSetState}
              className="input-class"
              value={caregiverPhoneNumber}
              name={`${key}PhoneNumber`}
            />
          </FormField>
        </Box>
      </React.Fragment>
    )
  }

  renderCaregiverStep() {
    const {t} = this.props
    const {
      successorCaregiverRelationship,
      successorCaregiverPhoneNumber,
      errors: stateErrors,
      consentInitials,
      initialCaregiverRelationship,
      initialCaregiverPhoneNumber
    } = this.state
    const {
      initialCaregiverPhoneNumber: initialPhoneNumberError,
      initialCaregiverRelationship: initialRelationshipError,
      successorCaregiverPhoneNumber: successorPhoneNumberError,
      successorCaregiverRelationship: successorRelationshipError,
      consentInitials: initialsError
    } = stateErrors
    return (
      <div>
        {this.renderCaregiverInfo(INITIAL_CAREGIVER, {
          relationshipError: initialRelationshipError,
          caregiverRelationship: initialCaregiverRelationship,
          phoneNumberError: initialPhoneNumberError,
          caregiverPhoneNumber: initialCaregiverPhoneNumber
        })}
        {this.renderCaregiverInfo(SUCCESSOR_CAREGIVER, {
          relationshipError: successorRelationshipError,
          caregiverRelationship: successorCaregiverRelationship,
          phoneNumberError: successorPhoneNumberError,
          caregiverPhoneNumber: successorCaregiverPhoneNumber
        })}
        <InitialsInput
          error={initialsError ? t('pleaseAddInitials') : null}
          onChange={this.onChangeInitialsInput}
          name="consentInitials"
          text={'serveJointlyAndSeveraly'}
          initials={consentInitials}
        />
      </div>
    )
  }

  renderStepFour() {
    const {t} = this.props
    const {errors, parentalStatus, parentalStatusReason} = this.state
    let errorMessage = null
    if (errors.parentalStatus) {
      errorMessage = t('pleaseAddParentalStatus')
    } else if (errors.parentalStatusReason) {
      errorMessage = t('pleaseAddReason')
    }
    return (
      <div>
        <RadioBox
          header={t('parentalCustody')}
          choice={parentalStatus}
          onChange={parentalStatus => this.setState({parentalStatus})}
          onChangeFreeAnswer={parentalStatusReason =>
            this.setState({parentalStatusReason})
          }
          error={errorMessage}
          options={Object.values(PARENTAL_STATUSES)}
          value={parentalStatus}
          freeTextKey={PARENTAL_STATUSES.legalCustodySent}
          freeTextLabel={t('reasonNotReached')}
          freeTextValue={parentalStatusReason}
        />
        <a
          href="https://law.justia.com/codes/tennessee/2017/title-34/chapter-6/part-3/section-34-6-305/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {' '}
          {t('legalCustodySentLink')}{' '}
        </a>
      </div>
    )
  }

  renderStepFive = () => {
    const {t} = this.props
    const {condition, hardships, describeHardship, errors} = this.state
    const {
      describeHardship: describeHardshipError,
      hardships: hardshipsError,
      condition: conditionError
    } = errors
    let errorCondition = conditionError ? t('conditionError') : null
    let errorHardship = null
    if (hardshipsError) {
      errorHardship = t('hardshipsError')
    } else if (describeHardshipError) {
      errorHardship = t('describeHardshipError')
    }
    return (
      <StepFive
        errorCondition={errorCondition}
        valueCondition={condition}
        onChangeCondition={condition => this.setState({condition})}
        errorHardship={errorHardship}
        valueHardship={hardships}
        onChangeHardship={hardships => this.setState({hardships})}
        onChangeFreeAnswer={describeHardship =>
          this.setState({describeHardship})
        }
        describeHardship={describeHardship}
      />
    )
  }

  renderStepSix = () => {}

  renderStepSeven = () => {}

  renderForm() {
    const {step} = this.state
    const steps = this.steps()
    return steps[step.number].component
  }

  renderDownloadButtons() {
    const {submitted} = this.state
    if (submitted) {
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
    const {t} = this.props
    return (
      <Section>
        <Disclaimer />
        <Heading tag="h1">{t('powerOfAttorney')}</Heading>
        <div>
          <div className="stepper">
            <Stepper
              steps={this.steps()}
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

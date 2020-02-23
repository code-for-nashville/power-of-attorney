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

import {
  Disclaimer,
  AsyncDownloadPDF,
  FormSubjects,
  FieldHeader,
  Address,
  RadioBox,
  InitialsInput
} from '../../components'
import Stepper from 'react-stepper-horizontal'
import {translate} from 'react-i18next'
import type {FormInputs} from '../../types'
import Regex from '../../constants'
import {
  PARENTAL_STATUSES,
  INITIAL_CAREGIVER,
  SUCCESSOR_CAREGIVER
} from '../../pdf/pdf-document.js'
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
  consentInitials: Array<string, string>
|}

type PoAFormState = {|
  step: number,
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
    if (this.state.step > 0) {
      this.setState(state => ({step: --state.step}))
    }
  }

  /*
    Recursively check if an object has errors.

    Error objects are expected to have booleans(true/false) or a nested error
    object as values.
  */
  hasError(object) {
    return Object.values(object).reduce((result, value) => {
      if (typeof value === 'boolean') {
        return result || value
      }
      return result || this.hasError(value)
    }, false)
  }

  _next = () => {
    const errors = this.stepErrors()
    if (this.hasError(errors)) {
      this.setState({errors: errors})
    } else {
      if (this.isLastStep()) {
        this.submit()
      } else {
        this.setState(state => ({step: state.step + 1}))
        if (typeof window !== 'undefined') window.scrollTo(0, 0)
      }
    }
  }

  /*
    Returns an object containing validation errors for just the current step

    Returns: An Array of two elements. The first element is a key of field names
      to error objects.  The second element is a boolean that is True if any
      of the fields failed validation.
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
      step
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
        parentalStatus: () => this.state.parentalStatus.length === 1,
        parentalStatusReason: () =>
          parentalStatus === '5' ? parentalStatusReason.length === 0 : false
      },
      {},
      {},
      {}
    ][step]

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
        title: t('parentalstatus'),
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

    let errorMessage = null
    if (this.state.errors.parentalStatus) {
      errorMessage = t('pleaseAddParentalStatus')
    } else if (this.state.errors.parentalStatusReason) {
      errorMessage = t('pleaseAddReason')
    }

    return (
      <RadioBox
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

  renderStepFive = () => {}

  renderStepSix = () => {}

  renderStepSeven = () => {}

  renderForm() {
    const {step} = this.state
    const steps = this.steps()
    return steps[step].component
  }

  renderDownloadButtons() {
    const {submitted} = this.state
    if (submitted) {
      return <AsyncDownloadPDF data={this.state} />
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
              activeStep={this.state.step}
            />
          </div>
        </div>

        <Paragraph className="align-center">
          {t('thisFormIsToBeFilled')}
        </Paragraph>
        <Box direction="row" justify="between">
          <Box basis="1/3" />
          <Box basis="1/3">
            <Form autoComplete="off" className="align-center">
              <Box pad={{vertical: 'medium'}}>{this.renderForm()}</Box>
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
                    this.state.step === 0
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

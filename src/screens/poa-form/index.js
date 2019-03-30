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
import {PARENTAL_STATUSES} from '../../pdf/pdf-document.js'
import './styles.css'

type PoAFormProps = {
  t: string => string
}

type FormInputErrors = {
  childrenNames: ?boolean,
  parentalStatus: ?boolean,
  parentalStatusReason: ?boolean,
  motherAddress: {[AddressKeysType]: ?boolean},
  fatherAddress: {[AddressKeysType]: ?boolean},
  caregiverAddress: {[AddressKeysType]: ?boolean}
}
type PoAFormState = {
  acceptedModal: boolean,
  step: number,
  numberOfChildren: number,
  submitted: boolean,
  errors: FormInputErrors,
  ...FormInputs
}

class PoAForm extends Component<PoAFormProps, PoAFormState> {
  static navigationOptions = ({navigation}) => ({})

  constructor(props) {
    super(props)
    this.state = {
      acceptedModal: false,
      step: 2,
      numberOfChildren: 2,
      childrenNames: ['asdf', 'asdf'],
      submitted: false,
      motherAddress: {
        name: 'asdf',
        street_address: 'asdf',
        locality: 'asdf',
        region: 'TN',
        postal_code: '88888'
      },
      fatherAddress: {
        name: '',
        street_address: '',
        locality: '',
        region: 'TN',
        postal_code: ''
      },
      caregiverAddress: {
        name: '',
        street_address: '',
        locality: '',
        region: 'TN',
        postal_code: ''
      },
      caregiverPhoneNumber: '',
      caregiverRelationship: '',
      consentInitials: [],
      parentalStatus: '',
      parentalStatusReason: '',
      errors: {
        childrenNames: null,
        motherAddress: {
          name: null
        },
        fatherAddress: {
          name: null
        },
        caregiverAddress: {
          name: null
        },
        caregiverPhoneNumber: null,
        caregiverRelationship: null,
        consentInitials: null,
        parentalStatus: null,
        parentalStatusReason: null
      }
    }
  }

  componentDidUpdate(prevProps, prevState: PoAFormState) {
    // if finished form and if no new changes, submit to access form, else if new changes hide 'open/download form'
    if (
      this.state.submitted === true &&
      this.state.submitted === prevState.submitted &&
      this.state !== prevState
    ) {
      this.setState({submitted: false})
    }
  }

  validateAddress = address => {
    const isEmpty = value => (value && value.length === 0) || !value
    let areAllFieldsEmpty = true
    const validatedAddress = Object.keys(address).reduce((result, field) => {
      const isFieldEmpty = isEmpty(address[field])
      if (areAllFieldsEmpty && !isFieldEmpty) areAllFieldsEmpty = false
      return {
        ...result,
        postal_code: false,
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

  acceptModal = () => {
    this.setState({acceptedModal: true})
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
      caregiverPhoneNumber,
      caregiverRelationship,
      consentInitials
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
        caregiverAddress: () =>
          this.validateAddress(this.state.caregiverAddress),
        caregiverPhoneNumber: () =>
          !Regex.postalCode.test(caregiverPhoneNumber),
        caregiverRelationship: () => !!!caregiverRelationship,
        consentInitials: () => consentInitials.filter(i => i).length === 0
      },
      {
        parentalStatus: () => this.state.parentalStatus.length === 1,
        parentalStatusReason: () =>
          parentalStatus === '5' ? parentalStatusReason.length === 0 : false
      }
    ][this.state.step]

    const errors = {}

    for (let [key, validator] of Object.entries(validators)) {
      if (typeof validator === 'function') {
        errors[key] = validator()
      }
    }

    return errors
  }

  isLastStep = () => {
    return this.state.step === 3
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
      }
    ]
  }

  onChangeInitialsInput = (initial: {[string]: [?string, ?string]}) => {
    this.setState(initial)
  }

  renderAddress = name => {
    const errors = this.state.errors[name] || {}
    return (
      <Address
        errors={errors}
        address={this.state[name]}
        onChange={this.addressOnChange}
        name={name}
      />
    )
  }

  renderStepOne() {
    return (
      <FormSubjects
        error={this.state.errors.childrenNames}
        subjectNumberValue={this.state.numberOfChildren}
        onChangeSubjectNumber={num =>
          this.setState(prevState => {
            const childrenNames = prevState.childrenNames.slice(0, num)
            return {
              numberOfChildren: num,
              childrenNames
            }
          })
        }
        subjectNames={this.state.childrenNames}
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

  renderCaregiverStep() {
    const {t} = this.props
    const {
      consentInitials,
      errors: stateErrors,
      caregiverRelationship,
      caregiverPhoneNumber
    } = this.state
    const errors = stateErrors['caregiverAddress'] || {}
    const {
      caregiverPhoneNumber: phoneNumberError,
      caregiverRelationship: relationshipError,
      consentInitials: initialsError
    } = stateErrors
    const onChange = e => {
      const {name, value} = e.target
      this.addressOnChange(name, value, 'caregiverAddress')
    }
    return (
      <div>
        <FieldHeader>{t('caregiverName')}</FieldHeader>
        <Box margin={{vertical: 'medium'}}>
          {this.renderAddress('caregiverAddress')}
          <FormField
            label={t('relationship')}
            error={relationshipError ? t('pleaseAddRelationship') : null}
          >
            <TextInput
              onDOMChange={onChange}
              className="input-class"
              value={caregiverRelationship}
              name={'caregiverRelationship'}
            />
          </FormField>
          <FormField
            label={t('phoneNumber')}
            error={phoneNumberError ? t('pleaseAddPhoneNumber') : null}
          >
            <TextInput
              onDOMChange={onChange}
              className="input-class"
              value={caregiverPhoneNumber}
              name={caregiverPhoneNumber}
            />
          </FormField>
        </Box>
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

  renderForm() {
    const {step} = this.state
    const steps = this.steps()
    return steps[step].component
  }

  renderDownloadButtons() {
    if (this.state.submitted) {
      return <AsyncDownloadPDF data={this.state} />
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

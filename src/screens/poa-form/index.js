import * as React from 'react'

import {
  Box,
  Button,
  Form,
  FormField,
  Heading,
  NumberInput,
  Paragraph,
  RadioButton,
  Section,
  Select,
  TextInput
} from 'grommet'

import {Disclaimer, AsyncDownloadPDF} from '../../components'
import Stepper from 'react-stepper-horizontal'
import {translate} from 'react-i18next'
import {STATE_OPTIONS} from '../../strings'
import Regex from '../../constants'
import {
  PARENTAL_STATUSES,
  PARENTAL_STATUS_WITH_REASON
} from '../../pdf/pdf-document.js'
import './styles.css'

const FieldHeader = props => <span {...props} />

class PoAForm extends React.Component {
  static navigationOptions = ({navigation}) => ({})

  constructor(props) {
    super(props)
    this.state = {
      acceptedModal: false,
      step: 0,
      numberOfChildren: 1,
      childrenNames: [],
      submitted: false,
      motherAddress: {
        name: '',
        street_address: '',
        locality: '',
        region: '',
        postal_code: ''
      },
      fatherAddress: {
        name: '',
        street_address: '',
        locality: '',
        region: '',
        postal_code: ''
      },
      caregiverAddress: {
        name: '',
        street_address: '',
        locality: '',
        region: '',
        postal_code: ''
      },
      parentalStatus: '',
      parentalStatusReason: '',
      errors: {}
    }
  }

  componentDidUpdate(prevProps, prevState) {
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
    const isEmpty = value => value.length === 0

    return {
      name: isEmpty(address.name),
      street_address: isEmpty(address.street_address),
      locality: isEmpty(address.locality),
      region: isEmpty(address.region),
      // 5 digit postal codes only for now, though there is a valid 10 digit
      // format (e.g. 12345-4321).
      postal_code: !Regex.postalCode.test(address.postal_code)
    }
  }

  updateChildName = e => {
    const idx = e.target.dataset.number
    const names = [...this.state.childrenNames]
    names[idx] = e.target.value
    this.setState({childrenNames: names})
  }

  updateAddress = e => {
    const inputName = e.target.name
    const addressType = e.target.dataset.addressType
    let value = e.option ? e.option.value : e.target.value

    if (addressType === 'postal_code') {
      value = value.slice(0, 5)
    }
    this.setState({
      [inputName]: {
        ...this.state[inputName],
        [addressType]: value
      }
    })
  }

  updateParentalStatus = event => {
    this.setState({parentalStatus: event.target.value})
  }

  updateParentalStatusReason = e => {
    const parentalStatusReason = e.target.value
    this.setState({parentalStatusReason})
  }

  onNumberOfChildrenChange = event => {
    const num = parseInt(event.target.value, 10)
    this.setState(s => {
      return {
        numberOfChildren: num,
        childrenNames: s.childrenNames.slice(0, num)
      }
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
      to error objects.  The second element is a boolen that is True if any
      of the fields failed validation.
  */
  stepErrors() {
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
        reason: () =>
          this.state.parentalStatus === '5'
            ? this.state.reason.length === 0
            : false
      }
    ][this.state.step]

    const errors = {}

    for (let [key, validator] of Object.entries(validators)) {
      errors[key] = validator()
    }

    return errors
  }

  isLastStep = () => {
    return this.state.step === 3
  }

  renderChildrenInputs = () => {
    const {t} = this.props
    const inputs = [...Array(this.state.numberOfChildren)].map((_, i) => {
      return (
        <Box key={i} pad={{vertical: 'small'}}>
          <FormField label={t('childsFullName')}>
            <TextInput
              data-number={i}
              onDOMChange={this.updateChildName}
              value={this.state.childrenNames[i]}
            />
          </FormField>
        </Box>
      )
    })
    return inputs
  }

  renderAddress = name => {
    const {t} = this.props
    const errors = this.state.errors[name] || {}

    return (
      <Box margin={{vertical: 'medium'}}>
        <FormField
          label={t('name')}
          error={errors.name ? t('pleaseAddName') : null}
        >
          <TextInput
            onDOMChange={this.updateAddress}
            className="input-class-long"
            value={this.state[name].name}
            name={name}
            data-address-type={'name'}
            margin="small"
          />
        </FormField>
        <FormField
          label={t('streetAddress')}
          error={errors.street_address ? t('streetAddress') : null}
        >
          <TextInput
            onDOMChange={this.updateAddress}
            className="input-class-long"
            value={this.state[name].street_address}
            name={name}
            data-address-type={'street_address'}
          />
        </FormField>
        <FormField label={t('city')} error={errors.locality ? t('city') : null}>
          <TextInput
            onDOMChange={this.updateAddress}
            className="input-class"
            value={this.state[name].locality}
            name={name}
            data-address-type={'locality'}
          />
        </FormField>
        <FormField
          error={errors.region ? t('pleaseAddState') : null}
          label={t('state')}
        >
          <Select
            onChange={this.updateAddress}
            className="input-class"
            value={this.state[name].region}
            name={name}
            data-address-type={'region'}
            options={STATE_OPTIONS}
            placeHolder={t('chooseOne')}
          />
        </FormField>
        <FormField
          label={t('zip')}
          error={errors.postal_code ? t('pleaseAddZip') : null}
        >
          <TextInput
            onDOMChange={this.updateAddress}
            className="input-class"
            value={this.state[name].postal_code}
            name={name}
            data-address-type={'postal_code'}
          />
        </FormField>
      </Box>
    )
  }

  renderStepOne() {
    const {t} = this.props
    return (
      <Box>
        <FormField label={t('numberOfChildren')}>
          <NumberInput
            min={1}
            onChange={this.onNumberOfChildrenChange}
            value={this.state.numberOfChildren}
          />
        </FormField>

        <Paragraph>
          <FieldHeader>{t('minorName')}</FieldHeader>
          {this.state.errors.childrenNames ? (
            <span className="error">{t('pleaseAddChildName')}</span>
          ) : null}
        </Paragraph>
        {this.renderChildrenInputs()}
      </Box>
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
    const ParentRadioButton = props => (
      <RadioButton
        checked={props.value === this.state.parentalStatus}
        id={`parental-status-${props.value}`}
        name="parental_status"
        onChange={this.updateParentalStatus}
        {...props}
      />
    )

    let errorMessage = null
    if (this.state.errors.parental_status) {
      errorMessage = t('pleaseAddParentalStatus')
    } else if (this.state.errors.reason) {
      errorMessage = t('pleaseAddReason')
    }

    return (
      <div>
        <FieldHeader>{t('parentalStatus')}</FieldHeader>
        <FormField error={errorMessage}>
          {PARENTAL_STATUSES.map(value => (
            <ParentRadioButton label={t(value)} key={value} value={value} />
          ))}
        </FormField>
        {// Conditionally render a reason they could not be reached when 4
        // is selected.
        this.state.parentalStatus === PARENTAL_STATUS_WITH_REASON && (
          <FormField label={t('reasonNotReached')}>
            <TextInput
              name="parent-status-reason"
              onInput={this.updateParentalStatusReason}
              value={this.state.parentalStatusReason}
            />
          </FormField>
        )}
        {
        <a href='https://law.justia.com/codes/tennessee/2017/title-34/chapter-6/part-3/section-34-6-305/' target="_blank" rel="noopener noreferrer"> {' '}{t('legalCustodySentLink')}{' '}</a>
        }
      </div>
    )
  }

  renderForm() {
    switch (this.state.step) {
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
              activeStep={this.state.step}
            />
          </div>
        </div>

        <Paragraph className="align-center">
          <strong>{t('partI')}</strong>
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

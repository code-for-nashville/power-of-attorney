// @flow
import React, {Component} from 'react'
import {FormField, TextInput, RadioButton} from 'grommet'
import {translate} from 'react-i18next'
import FieldHeader from '../field-header'

type RadioBoxPropType = {
  onChangeRadio: (data: string) => void,
  onChangeFreeAnswer: (data: string) => void,
  options: Array<string>,
  freeText: boolean,
  freeTextValue: string,
  value: string,
  error: ?string,
  t: string => string
}

type RadioBoxStateType = {}

const ParentRadioButton = props => (
  <RadioButton
    checked={props.checked}
    id={`parental-status-${props.value}`}
    name="parental_status"
    label="Parental Status"
    {...props}
  />
)

class RadioBox extends Component<RadioBoxPropType, RadioBoxStateType> {
  constructor(props: RadioBoxPropType) {
    super(props)
    this.state = {}
  }

  updateRadio = event => {
    event.persist()
    this.props.onChangeRadio(event.target.value)
  }

  updateFreeText = e => {
    this.props.onChangeFreeAnswer(e.target.value)
  }

  renderFreeText = () => {
    const {options, freeText, t} = this.props
    const lastOption = options[options.length - 1]
    // Conditionally render a reason they could not be reached when 4
    // is selected.
    if (this.props.value === lastOption && freeText) {
      return (
        <FormField label={t('reasonNotReached')}>
          <TextInput
            name="parent-status-reason"
            onInput={this.updateFreeText}
            value={this.props.freeTextValue}
          />
        </FormField>
      )
    }
    return null
  }
  render() {
    const {t, error, options} = this.props

    return (
      <div>
        <FieldHeader>{t('parentalCustody')}</FieldHeader>
        <FormField error={error}>
          {options.map(value => (
            <ParentRadioButton
              label={t(value)}
              key={value}
              value={value}
              checked={value === this.props.value}
              onChange={this.updateRadio}
            />
          ))}
        </FormField>
        {this.renderFreeText()}
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
}

export default translate()(RadioBox)

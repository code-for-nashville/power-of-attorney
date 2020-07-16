// @flow
import React, {Component} from 'react'
import {FormField, TextInput, RadioButton, CheckBox} from 'grommet'
import {translate} from 'react-i18next'
import FieldHeader from '../field-header'

type SelectionBoxPropType = {|
  onChange: (data: string | Array<string>) => void,
  onChangeFreeAnswer: (data: string) => void,
  freeTextKey: ?string,
  freeTextLabel: ?string,
  options: Array<string>,
  freeTextValue: string,
  value: string | Array<string>,
  error: ?string,
  t: string => string,
  header: string,
  multiSelect: boolean
|}

type SelectionBoxStateType = {}

class SelectionBox extends Component<
  SelectionBoxPropType,
  SelectionBoxStateType
> {
  static defaultProps = {
    freeTextLabel: null,
    freeTextKey: null,
    multiSelect: false
  }

  constructor(props: SelectionBoxPropType) {
    super(props)
    this.state = {}
  }

  updateRadio = event => {
    event.persist()
    const {onChange, multiSelect, value} = this.props
    let {value: eventValue} = event.target
    if (multiSelect && Array.isArray(value)) {
      const valueIndex = value.indexOf(eventValue)
      if (valueIndex > -1) {
        value.splice(valueIndex, 1)
        eventValue = value
      } else {
        value.push(eventValue)
        eventValue = value
      }
    }
    onChange(eventValue)
  }

  updateFreeText = e => {
    const {onChangeFreeAnswer} = this.props
    onChangeFreeAnswer(e.target.value)
  }

  renderFreeText = () => {
    const {
      value,
      freeTextValue,
      freeTextKey,
      freeTextLabel,
      multiSelect
    } = this.props
    const showFreeText =
      multiSelect && Array.isArray(value)
        ? value.indexOf(freeTextKey) > -1
        : value === freeTextKey
    if (showFreeText) {
      return (
        <FormField label={freeTextLabel}>
          <TextInput
            name={freeTextValue}
            onInput={this.updateFreeText}
            value={freeTextValue}
          />
        </FormField>
      )
    }
    return null
  }
  renderInputs = () => {
    const {t, multiSelect, options, value: valueProp} = this.props
    const SelectComponent = multiSelect ? CheckBox : RadioButton
    return options.map(value => {
      const checked = multiSelect
        ? valueProp.indexOf(value) > -1
        : valueProp === value
      return (
        <SelectComponent
          label={t(value)}
          key={value}
          value={value}
          checked={checked}
          onChange={this.updateRadio}
          id={`id-${value}`}
          name={value}
        />
      )
    })
  }

  render() {
    const {error, header} = this.props

    return (
      <div>
        <FieldHeader>{header}</FieldHeader>
        <FormField error={error}>{this.renderInputs()}</FormField>
        {this.renderFreeText()}
      </div>
    )
  }
}
const TranslateSelectionBox = translate()(SelectionBox)

export const RadioBox = translate()(TranslateSelectionBox)

export const MultiSelectBox = (props: SelectionBoxPropType) => (
  <TranslateSelectionBox multiSelect {...props} />
)

export default TranslateSelectionBox

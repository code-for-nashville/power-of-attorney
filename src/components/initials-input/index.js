// @flow
import React, {Component} from 'react'
import {FormField, TextInput} from 'grommet'
import {translate} from 'react-i18next'
// import FieldHeader from '../field-header'

import './styles.css'

type InitialsInputPropType = {|
  onChange: (data: {[string]: [?string, ?string]}) => void,
  value: string,
  error: ?string,
  t: string => string,
  text: string,
  name: string,
  initials: [string, string]
|}

type InitialsInputStateType = {}

const sliceAndUpper = (value: string) => value.slice(0, 2).toUpperCase()

class InitialsInput extends Component<
  InitialsInputPropType,
  InitialsInputStateType
> {
  constructor(props: InitialsInputPropType) {
    super(props)
    this.state = {}
  }

  updateInitialOne = e => {
    const {name, onChange, initials} = this.props
    const {value} = e.target
    onChange({[name]: [sliceAndUpper(value), initials[1]]})
  }

  updateInitialTwo = e => {
    const {name, onChange, initials} = this.props
    const {value} = e.target
    onChange({[name]: [initials[0], sliceAndUpper(value)]})
  }

  render() {
    const {t, error, text, initials, name} = this.props

    return (
      <div>
        <FormField
          className="initial-input"
          label={t('initials')}
          error={error}
        >
          <div className="text-inputs">
            <TextInput
              onDOMChange={this.updateInitialOne}
              className="input-class-long"
              value={initials[0]}
              name={name}
              data-address-type={'name'}
              margin="small"
            />
            <TextInput
              onDOMChange={this.updateInitialTwo}
              className="input-class-long"
              value={initials[1]}
              name={name}
              data-address-type={'name'}
              margin="small"
            />
          </div>
          {t(text)}
        </FormField>
      </div>
    )
  }
}

export default translate()(InitialsInput)

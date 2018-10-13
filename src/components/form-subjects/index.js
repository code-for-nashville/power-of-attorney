// @flow
import React, {Component} from 'react'
import {Box, FormField, NumberInput, Paragraph, TextInput} from 'grommet'
import {translate} from 'react-i18next'
import FieldHeader from '../field-header'

type FormSubjectsPropType = {
  error: ?string,
  subjectNames: Array<string>,
  onChangeSubjectName: (data: Array<string>) => void,
  subjectNumberValue: number,
  onChangeSubjectNumber: (num: number) => void,
  t: string => string
}

type FormSubjectsStateType = {}

class FormSubjects extends Component<
  FormSubjectsPropType,
  FormSubjectsStateType
> {
  constructor(props: FormSubjectsPropType) {
    super(props)
    this.state = {}
  }

  updateSubjectName = e => {
    const idx = e.target.dataset.number
    const names = [...this.props.subjectNames]
    names[idx] = e.target.value
    this.props.onChangeSubjectName(names)
  }

  onNumberOfSubjectsChange = event => {
    const num = parseInt(event.target.value, 10)
    this.props.onChangeSubjectNumber(num)
  }

  renderSubjectInputs = () => {
    const {t} = this.props
    const inputs = [...Array(this.props.subjectNumberValue)].map((_, i) => {
      return (
        <Box key={i} pad={{vertical: 'small'}}>
          <FormField label={t('childsFullName')}>
            <TextInput
              data-number={i}
              onDOMChange={this.updateSubjectName}
              value={this.props.subjectNames[i]}
            />
          </FormField>
        </Box>
      )
    })
    return inputs
  }

  render() {
    const {t} = this.props
    return (
      <Box>
        <FormField label={t('numberOfChildren')}>
          <NumberInput
            min={1}
            onChange={this.onNumberOfSubjectsChange}
            value={this.props.subjectNumberValue}
          />
        </FormField>

        <Paragraph>
          <FieldHeader>{t('minorName')}</FieldHeader>
          <span className="error">{this.props.error}</span>
        </Paragraph>
        {this.renderSubjectInputs()}
      </Box>
    )
  }
}

export default translate()(FormSubjects)

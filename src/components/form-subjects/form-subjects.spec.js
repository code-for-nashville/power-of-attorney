// @flow
import React from 'react'
import ReactDOM from 'react-dom'
import {mount} from 'enzyme'
import FormSubjects from './'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <FormSubjects
      error={null}
      subjectNames={[]}
      onChangeSubjectName={jest.fn()}
      subjectNumberValue={1}
      onChangeSubjectNumber={jest.fn()}
      t={jest.fn()}
    />,
    div
  )
})

it('renders correct number of inputs', () => {
  const component = mount(
    <FormSubjects
      error={null}
      subjectNames={[]}
      onChangeSubjectName={jest.fn()}
      subjectNumberValue={3}
      onChangeSubjectNumber={jest.fn()}
      t={jest.fn()}
    />
  )
  const inputs = component.find('input[type="text"]')

  expect(inputs.length).toBe(3)
})

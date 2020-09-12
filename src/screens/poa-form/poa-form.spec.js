// @flow
import React from 'react'
import ReactDOM from 'react-dom'
import {mount, render} from 'enzyme'
import POAForm from './'
import {withRouter} from '../../utils/test'
import {TEST_IDS} from '../../components/FormStepper'
// import {TEST_IDS as SUBJECT_TEST_IDS} from '../../components/steps/Subjects'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(withRouter(<POAForm />), div)
})

it('displays an error message when form fields are missing', () => {
  const wrapper = mount(withRouter(<POAForm />))
  const textInput = wrapper.find(
    `div[data-testid='${TEST_IDS.FormStepperSubmit}']`
  )
  expect(textInput.find('span').length).toEqual(0)
  // const button = wrapper.find(`button[data-testid='${SUBJECT_TEST_IDS.ChildNumber}']`)
  // @TODO Investigate why `useFormField` from Grommet returns a different error type than in the application
  // In the tests submiting the form causes useFormField to return an object { message: string , status: 'error' }
  // rather than a string thus the object is getting rendered and throwing an error
  // button.simulate('submit')
  // expect(textInput.find('span').length).toEqual(1)
})

import React from 'react'
import ReactDOM from 'react-dom'
import {mount} from 'enzyme'
import RadioBox from '.'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <RadioBox
      error={null}
      onChangeRadio={jest.fn()}
      onChangeFreeAnswer={jest.fn()}
      options={['First', 'Second', 'Third']}
      freeText={false}
      freeTextValue={''}
      value="Third"
      t={jest.fn()}
    />,
    div
  )
})

it('does not render free input', () => {
  const component = mount(
    <RadioBox
      error={null}
      onChangeRadio={jest.fn()}
      onChangeFreeAnswer={jest.fn()}
      options={['First', 'Second', 'Third']}
      freeText={false}
      freeTextValue={''}
      value="Third"
      t={jest.fn()}
    />
  )
  const inputs = component.find('input[type="text"]')

  expect(inputs.length).toBe(0)
})

it('renders free input', () => {
  const component = mount(
    <RadioBox
      error={null}
      onChangeRadio={jest.fn()}
      onChangeFreeAnswer={jest.fn()}
      options={['First', 'Second', 'Third']}
      freeText
      freeTextValue={null}
      value="Third"
      t={jest.fn()}
    />
  )
  const inputs = component.find('input[type="text"]')

  expect(inputs.length).toBe(1)
})

import React from 'react'
import ReactDOM from 'react-dom'
import {mount} from 'enzyme'
import {RadioBox, MultiSelectBox} from '.'

it('renders RadioBox without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <RadioBox
      error={null}
      onChange={jest.fn()}
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

it('RadioBox does not render free input', () => {
  const component = mount(
    <RadioBox
      error={null}
      onChange={jest.fn()}
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

it('RadioBox renders free input', () => {
  const component = mount(
    <RadioBox
      error={null}
      onChange={jest.fn()}
      onChangeFreeAnswer={jest.fn()}
      options={['First', 'Second', 'Third']}
      freeTextKey={'Third'}
      freeTextValue={null}
      value="Third"
      t={jest.fn()}
    />
  )
  const inputs = component.find('input[type="text"]')

  expect(inputs.length).toBe(1)
})

it('RadioBox changes one value', () => {
  const fn = jest.fn()
  const component = mount(
    <RadioBox
      error={null}
      onChange={fn}
      onChangeFreeAnswer={jest.fn()}
      options={['First', 'Second', 'Third']}
      freeTextKey={'Third'}
      freeTextValue={null}
      value="Third"
      t={jest.fn()}
    />
  )
  const input = component.find('input[name="First"]')
  input.simulate('change', {target: {value: 'First'}})
  expect(fn.mock.calls[0][0]).toBe('First')
  input.simulate('change', {target: {value: 'Second'}})
  expect(fn.mock.calls[1][0]).toBe('Second')
})

it('MultiSelectBox renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <MultiSelectBox
      error={null}
      onChange={jest.fn()}
      onChangeFreeAnswer={jest.fn()}
      options={['First', 'Second', 'Third']}
      freeTextValue={''}
      value="Third"
      t={jest.fn()}
    />,
    div
  )
})

it('MultiSelectBox does not render free input', () => {
  const component = mount(
    <MultiSelectBox
      error={null}
      onChange={jest.fn()}
      onChangeFreeAnswer={jest.fn()}
      options={['First', 'Second', 'Third']}
      freeTextValue={''}
      value="Third"
      t={jest.fn()}
    />
  )
  const inputs = component.find('input[type="text"]')

  expect(inputs.length).toBe(0)
})

it('MultiSelectBox renders free input', () => {
  const component = mount(
    <MultiSelectBox
      error={null}
      onChange={jest.fn()}
      onChangeFreeAnswer={jest.fn()}
      options={['First', 'Second', 'Third']}
      freeTextKey={'Third'}
      freeTextValue={null}
      value="Third"
      t={jest.fn()}
    />
  )
  const inputs = component.find('input[type="text"]')

  expect(inputs.length).toBe(1)
})

it('MultiSelectBox modifies arrray value', () => {
  const fn = jest.fn()
  const component = mount(
    <MultiSelectBox
      error={null}
      onChange={fn}
      onChangeFreeAnswer={jest.fn()}
      options={['First', 'Second', 'Third']}
      freeTextKey={'Third'}
      freeTextValue={null}
      value={[]}
      t={jest.fn()}
    />
  )
  const input = component.find('input[name="First"]')
  input.simulate('change', {target: {value: 'First'}})
  expect(fn.mock.calls[0][0]).toEqual(['First'])
  input.simulate('change', {target: {value: 'Second'}})
  expect(fn.mock.calls[1][0]).toEqual(['First', 'Second'])
  input.simulate('change', {target: {value: 'Second'}})
  expect(fn.mock.calls[2][0]).toEqual(['First'])
})

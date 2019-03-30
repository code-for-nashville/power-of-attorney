import React from 'react'
import {mount} from 'enzyme'
import InitialsInput from '.'

it('renders without crashing', () => {
  const component = mount(
    <InitialsInput
      error={null}
      onChange={jest.fn()}
      name="name"
      text={'serveJointlyAndSeveraly'}
      initials={[]}
      t={jest.fn()}
    />
  )
  const inputs = component.find('input[type="text"]')
  expect(inputs.length).toBe(2)
})

it('type first initial', () => {
  const onChange = jest.fn()
  const component = mount(
    <InitialsInput
      error={null}
      onChange={onChange}
      name="name"
      text={'serveJointlyAndSeveraly'}
      initials={[]}
      t={jest.fn()}
    />
  )
  const inputs = component.find('input[type="text"]')
  inputs.first().simulate('change', {target: {value: 'ft'}})
  expect(onChange).toBeCalledWith({name: ['FT', undefined]})
})

it('type second initial', () => {
  const onChange = jest.fn()
  const component = mount(
    <InitialsInput
      error={null}
      onChange={onChange}
      name="name"
      text={'serveJointlyAndSeveraly'}
      initials={[]}
      t={jest.fn()}
    />
  )
  const inputs = component.find('input[type="text"]')
  inputs.at(1).simulate('change', {target: {value: 'sd'}})
  expect(onChange).toBeCalledWith({name: [undefined, 'SD']})
})

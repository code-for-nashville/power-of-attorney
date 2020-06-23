import React from 'react'
import ReactDOM from 'react-dom'
import POAForm from './'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<POAForm />, div)
})

it('displays an error message when form fields are missing', () => {
  const div = document.createElement('div')
  const ref = ReactDOM.render(<POAForm />, div)
  expect(div.getElementsByClassName("form-error-message").length).toEqual(0)

  ref._next()

  expect(div.getElementsByClassName("form-error-message").length).toEqual(1)
})

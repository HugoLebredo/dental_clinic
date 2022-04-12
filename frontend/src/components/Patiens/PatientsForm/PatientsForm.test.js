import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { prettyDOM } from '@testing-library/dom'
import { render } from '@testing-library/react'

import PatientsForm from './PatientsForm'

const defaultData = {
  indentifier: 'XXX1',
  active: true,
  familyName: 'Doe',
  name: 'John',
  gender: 'male',
  birthDate: '01/01/2001',
  deceased: false
}

test('Render content', () => {
  const component = render(<PatientsForm recordForEdit={defaultData} addOrEdit = {() => {}}/>)

  // component.getAllByText('Family Name')
  expect(component.container).toHaveTextContent('Family Nam')

  const label = component.container.querySelector('label')

  console.log(prettyDOM(label))
})

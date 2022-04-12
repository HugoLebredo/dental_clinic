import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'

import PatientsList from './PatientsList'

test('render component', () => {
  const component = render(<PatientsList/>)

  component.getByText('Lista Pacientes')

  const div = component.container.querySelector('div')

  console.log(prettyDOM(div))
})

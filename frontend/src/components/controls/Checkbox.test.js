import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'

import { ThemeProvider } from '@material-ui/core/styles'

import Checkbox from './Checkbox'
import theme from '../../helpers/theme'

// const { name, label, value, onChange } = props

const monkData = {
  name: 'checkbox-test-name',
  label: 'checkbox-test-label',
  value: false
}

test('render Checkbox', () => {
  // fireEvent.click(button)

  const component = render(
        <ThemeProvider theme = {theme}>
            <Checkbox name = {monkData.name} label = {monkData.label} value = {monkData.value}/>
        </ThemeProvider>)

  component.getByLabelText(monkData.label)
})

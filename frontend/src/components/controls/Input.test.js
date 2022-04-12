import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'

import { ThemeProvider } from '@material-ui/core/styles'

import Input from './Input'
import theme from '../../helpers/theme'

const monkData = {
  name: 'Input-name',
  label: 'Input-label',
  value: 'Input-value'
}

test('Textbox rendering', () => {
  const component = render(<ThemeProvider theme = {theme}>
                              <Input name = {monkData.name}
                                      label = {monkData.label}
                                      value = {monkData.value}/>
                          </ThemeProvider>)

  component.getByLabelText(monkData.label)
})

test('Textbox onChange event', () => {
  const mockHandler = jest.fn()

  const component = render(<ThemeProvider theme = {theme}>
                            <Input name = {monkData.name}
                                    label = {monkData.label}
                                    value = {monkData.value}
                                    onChange = {mockHandler}/>
                        </ThemeProvider>)

  const input = component.getByLabelText(monkData.label)

  fireEvent.change(input)

  expect(mockHandler).toHaveBeenCalledTimes(2)
})

import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'

import { ThemeProvider } from '@material-ui/core/styles'

import Button from './Button'
import theme from '../../helpers/theme'
// const { text, size, color, variant, onClick, ...other } = props

test('render Button', () => {
  const component = render(
        <ThemeProvider theme = {theme}>
            <Button text = 'button-text' color = 'primary' />
        </ThemeProvider>)

  component.getByText('button-text')
})

test('➡️ clicking button', () => {
  const mockHandler = jest.fn()

  const component = render(
    <ThemeProvider theme = {theme}>
      <Button text = 'button-text' onClick = {mockHandler} />
    </ThemeProvider>)

  const button = component.getByText('button-text')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler).toHaveBeenCalledTimes(2)
})

import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'

import { ThemeProvider } from '@material-ui/core/styles'

import ActionButton from './ActionButton'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import theme from '../../helpers/theme'

import { prettyDOM } from '@testing-library/dom'

// const { color, children, onClick } = props

test('render ActionButton', () => {
  const component = render(
        <ThemeProvider theme = {theme}>
            <ActionButton color = 'primary'>
              <EditOutlinedIcon />
            </ActionButton>
        </ThemeProvider>)

  component.getByRole('button')
})

test('Clicking ActionButton', () => {
  const mockHandler = jest.fn()

  const component = render(
    <ThemeProvider theme = {theme}>
      <ActionButton onClick = {mockHandler} >
        <EditOutlinedIcon />
      </ActionButton>
    </ThemeProvider>)

  const button = component.getByRole('button')

  console.log(prettyDOM(button))

  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler).toHaveBeenCalledTimes(2)
})

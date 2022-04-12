import { FormControl, FormLabel, MenuItem, Select as MuiSelect } from '@material-ui/core'
import React from 'react'

const Select = (props) => {
  const { name, label, value, onChange, options } = props

  return (
        <FormControl
            variant= "outlined">
            <FormLabel> {label} </FormLabel>
            <MuiSelect
                label = {label}
                name = {name}
                onChange = {onChange}
                value = {value}
            >

                <MenuItem value=""> None </MenuItem>
                {
                    options.map(
                      option => (<MenuItem key={option.id} value={option.id}> {option.title} </MenuItem>)
                    )
                }

            </MuiSelect>

        </FormControl>
  )
}

export default Select

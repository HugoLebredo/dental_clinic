import React from 'react'
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup as MuiRadioGroup
} from '@material-ui/core'

const RadioGroup = (props) => {
  const { name, label, value, onChange, items } = props

  return (
        <FormControl>
            <FormLabel>
                {label}
            </FormLabel>
               <MuiRadioGroup row
                    name = {name}
                    value = {value}
                    onChange = {onChange}
                >
                {
                    items.map(
                      (item) => (
                            <FormControlLabel
                                key = {item.id}
                                value = {item.id}
                                control = { <Radio/> }
                                label = {item.title}
                            />
                      )
                    )
                }
               </MuiRadioGroup>

        </FormControl>
  )
}

export default RadioGroup

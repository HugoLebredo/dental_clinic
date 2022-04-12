import React from 'react'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

const Datepicker = (props) => {
  const { name, label, onChange, value } = props

  const convertToDefEventPara = (name, value) => ({
    target: { name, value }
  })

  return (
        <MuiPickersUtilsProvider utils = {DateFnsUtils}>

            <KeyboardDatePicker disableToolbar variant = "inline" inputVariant = "outlined"
                label = {label}
                value = {value}
                name = {name}
                onChange = {date => onChange(convertToDefEventPara(name, date))}
                format = "MM/dd/yyyy"
            />

        </MuiPickersUtilsProvider>
  )
}

export default Datepicker

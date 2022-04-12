import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core'

const useStyle = makeStyles(theme => ({
  root: {
    '& .MuiFormControl-root': {
      width: '80%',
      margin: theme.spacing(1)
    }
  }
}))

export const useForm = (defaultData, validateOnChange = false, validate) => {
  const [values, setValues] = useState(defaultData)
  const [errors, setErrors] = useState({})

  const handleInputChange = e => {
    const { name, value } = e.target

    setValues({
      ...values,
      [name]: value
    })

    if (validateOnChange) { validate({ [name]: value }) }
  }

  const resetForm = () => {
    setValues(defaultData)
    setErrors({})
  }

  return {
    values,
    setValues,
    errors,
    setErrors,
    resetForm,
    handleInputChange
  }
}

export const Form = (props) => {
  const classes = useStyle()
  const { children, ...other } = props

  return (
        <form className = {classes.root} autoComplete = "off" {...other}>
            {children}
        </form>
  )
}

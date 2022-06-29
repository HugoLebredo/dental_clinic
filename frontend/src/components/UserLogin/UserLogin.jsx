import React from 'react'
import { Grid } from '@material-ui/core'
import Controls from '../controls'
import { Form, useForm } from '../../hooks/useForm'
import loginService from '../../services/loginService'
// import patientService from '../../services/patientService'
// import usePatientList from '../../hooks/usePatientList'

const defaultData = {
  name: '',
  password: ''
}

const UserLoginForm = (props) => {
  // const { addOrEdit } = props

  const validate = (fieldValues = values) => {
    const temp = { ...errors }
    if ('name' in fieldValues) { temp.name = fieldValues.name ? '' : 'This field is required' }
    if ('password' in fieldValues) { temp.password = fieldValues.password ? '' : 'This field is required' }

    setErrors({
      ...temp
    })

    if (fieldValues === values) { return Object.values(temp).every(x => x === '') }
  }

  const {
    values,
    errors,
    setErrors,
    resetForm,
    handleInputChange
  } = useForm(defaultData, true, validate)

  const handleSubmit = async e => {
    e.preventDefault()
    // if (validate()) { addOrEdit(values, resetForm) }
    const { users } = await loginService.login(values)
    resetForm()
    console.log(users)
  }

  return (
        <Form onSubmit = {handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <Controls.Input
                        name = "name"
                        label = "User Name"
                        value = {values.name}
                        error = {errors.name}
                        onChange = {handleInputChange}
                    />
                    <Controls.Input
                        type = "password"
                        name = "password"
                        label = "Password"
                        value = {values.password}
                        error = {errors.password}
                        onChange = {handleInputChange}
                    />
                    <div>
                        <Controls.Button
                            type = "submit"
                            text = "Submit"
                        />
                        <Controls.Button
                            color = "default"
                            text = "Reset"
                            onClick = {resetForm}
                        />
                    </div>
                </Grid>
            </Grid>
        </Form>
  )
}

export default UserLoginForm

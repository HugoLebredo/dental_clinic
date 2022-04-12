import { Grid } from '@material-ui/core'
import React, { useEffect } from 'react'
import Controls from '../../controls'
import { Form, useForm } from '../../../hooks/useForm'

const genderItems = [
  { id: 'male', title: 'Male' },
  { id: 'female', title: 'Female' },
  { id: 'other', title: 'Other' },
  { id: 'unknown', title: 'Unknown' }
]

const defaultData = {
  indentifier: 'XXX',
  active: true,
  familyName: '',
  name: '',
  gender: 'male',
  birthDate: new Date(),
  deceased: false
}

const PatientsForm = (props) => {
  const { recordForEdit, addOrEdit } = props

  const validate = (fieldValues = values) => {
    const temp = { ...errors }
    if ('familyName' in fieldValues) { temp.familyName = fieldValues.familyName ? '' : 'This field is required' }
    if ('name' in fieldValues) { temp.name = fieldValues.name ? '' : 'This field is required' }

    setErrors({
      ...temp
    })

    if (fieldValues === values) { return Object.values(temp).every(x => x === '') }
  }

  const {
    values,
    setValues,
    errors,
    setErrors,
    resetForm,
    handleInputChange
  } = useForm(defaultData, true, validate)

  const handleSubmit = e => {
    e.preventDefault()
    if (validate()) { addOrEdit(values, resetForm) }
  }

  useEffect(() => {
    if (recordForEdit != null) {
      setValues({
        ...recordForEdit
      })
    }
  }, [recordForEdit])

  return (
        <Form onSubmit = {handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <Controls.Input
                        name = "name"
                        label = "Name"
                        value = {values.name}
                        error = {errors.name}
                        onChange = {handleInputChange}
                    />
                    <Controls.Input
                        name = "familyName"
                        label = "Family Name"
                        value = {values.familyName}
                        error = {errors.familyName}
                        onChange = {handleInputChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controls.RadioGroup
                        name = "gender"
                        label = "Gender"
                        value = {values.gender}
                        onChange = {handleInputChange}
                        items = {genderItems}
                    />
                    <Controls.Select
                        name = "gender"
                        value = {values.gender}
                        onChange = {handleInputChange}
                        label = "Gender_Select"
                        options = {genderItems}
                    />
                    <Controls.Datepicker
                        name = "birthDate"
                        label = "Birth Date"
                        value = {values.birthDate}
                        onChange = {handleInputChange}
                    />
                    <Controls.Checkbox
                        name = "deceased"
                        label = "Deceased"
                        value = {values.deceased}
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

export default PatientsForm

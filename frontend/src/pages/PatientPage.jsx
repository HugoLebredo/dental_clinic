import React from 'react'
import { useParams } from 'react-router-dom'
// import SideMenu from '../components/SideMenu'
import CssBaseline from '@material-ui/core/CssBaseline'
import PatientForm from '../components/Patiens/PatientForm'

const PatientPage = () => {
  const { idPatient } = useParams()
  console.log({ idPatient })
  return (
        <>

        <h1>{idPatient}</h1>
        <PatientForm/>
        <CssBaseline/>
        </>
  )
}

export default PatientPage

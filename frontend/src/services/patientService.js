import { useState, useEffect } from 'react'
import axios from 'axios'

import parsePatientsList from '../utils/transform/parsePatientsList'

const url = 'http://localhost:8080/api/patients'

const patientService = {

  getAllPatients: () => {
    const [records, setRecords] = useState([])

    useEffect(() => {
      const getPatients = async () => {
        try {
          const { data } = await axios.get(url)
          const patients = parsePatientsList(data)
          setRecords(patients) // esto hay que cambiarlo
        } catch (error) {
          console.log(error)
          throw (error)
        }
      }
      getPatients()
    }, [])
    return { records }
  },
  insertPatient: (patient) => { console.log('insertPatient') },
  updatePatient: (patient) => { console.log('updatePatient') }
}

export default patientService

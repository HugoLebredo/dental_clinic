import { useEffect, useState } from 'react'
import parsePatientsList from '../utils/transform/parsePatientsList'
import axios from 'axios'

const url = 'http://localhost:8080/api/patients'

function usePatientList () {
  const [patient, setPatient] = useState(null)

  useEffect(() => {
    const getPatient = async () => {
      try {
        const { data } = await axios.get(url)
        const patient = parsePatientsList(data)
        setPatient(patient) // esto hay que cambiarlo
      } catch (error) {
        console.log(error)
        throw (error)
      }
    }
    getPatient()
  }, [])
  console.log({ patient })
  return (patient)
}

export default usePatientList

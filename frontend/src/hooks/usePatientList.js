import { useEffect, useState } from 'react'

import parsePatientsList from '../utils/transform/parsePatientsList'
import axios from 'axios'

const url = 'http://localhost:8080/api/patients'

function usePatientList () {
  const [patients, setPatients] = useState(null)

  useEffect(() => {
    const getPatients = async () => {
      try {
        const { data } = await axios.get(url)
        console.log({ data })
        const patients = parsePatientsList(data)
        setPatients(patients) // esto hay que cambiarlo
      } catch (error) {
        console.log(error)
        throw (error)
      }
    }
    getPatients()
  }, [])
  console.log({ patients })
  return (patients)
}

export default usePatientList

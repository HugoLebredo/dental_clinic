import { useEffect, useState } from 'react'
import getAllPatients from '../utils/transform/getAllPatients'
import axios from 'axios'

const url = 'http://localhost:8080/api/patients'

function usePatientList () {
  const [patients, setPatients] = useState(null)

  useEffect(() => {
    const getPatients = async () => {
      try {
        const { data } = await axios.get(url)
        const patients = getAllPatients(data)
        setPatients(patients) // esto hay que cambiarlo
      } catch (error) {
        console.log(error)
        throw (error)
      }
    }
    getPatients()
  }, [patients])
  console.log({ patients })
  return (patients)
}

export default usePatientList

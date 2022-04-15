import { useState, useEffect } from 'react'
import axios from 'axios'

const defaultData = [{
  indentifier: 'XXX1',
  active: true,
  familyName: 'Doe',
  name: 'John',
  gender: 'male',
  birthDate: '01/01/2001',
  deceased: false
}, {
  indentifier: 'XXX2',
  active: true,
  familyName: 'Doe',
  name: 'Jane',
  gender: 'female',
  birthDate: '01/01/2001',
  deceased: false
}
]
const url = 'http://localhost:8080/api/patients'

const patientService = {

  getAllPatients2: () => {
    const [data, setData] = useState(null)

    useEffect(() => {
      const getPatients = async () => {
        try {
          const { data } = await axios.get(url)
          console.log({ data })
          setData(defaultData) // esto hay que cambiarlo
        } catch (error) {
          console.log(error)
          throw (error)
        }
      }
      getPatients()
    }, [data])
    console.log(data)
    return (data)
  },
  insertPatient: (patient) => { console.log('insertPatient') },
  updatePatient: (patient) => { console.log('updatePatient') },
  getAllPatients: () => defaultData
}

export default patientService

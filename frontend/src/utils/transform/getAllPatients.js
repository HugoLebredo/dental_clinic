import { parseAddress, parseName, parseTelecom } from '../utils'

const getAllPatients = (data) => {
  const { patients } = data
  const parsedPatients = patients.map(patient => {
    const key = patient.iid
    const address = parseAddress(patient.contactPoint)
    const { phone, email } = parseTelecom(patient.telemcom)
    const { familyName, name } = parseName(patient.name)
    const { birthDate, gender } = patient
    const propValue = { key, name, familyName, address, birthDate, gender, phone, email }

    return ({ ...propValue })
  })
  return parsedPatients
}

export default getAllPatients

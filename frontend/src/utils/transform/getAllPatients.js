import { parseAddress, parseName, parseTelecom, parseDate } from '../utils'

const getAllPatients = (data) => {
  const { patients } = data
  const parsedPatients = patients.map(patient => {
    console.log(patient.name.length)
    const key = patient.iid
    const address = parseAddress(patient.contactPoint)
    const { phone, email } = parseTelecom(patient.telecom)
    const { familyName, name } = parseName(patient.name)
    const birthDate = parseDate(patient.birthDate)
    const { gender } = patient
    const propValue = { key, name, familyName, address, birthDate, gender, phone, email }

    return ({ ...propValue })
  })
  return parsedPatients
}

export default getAllPatients

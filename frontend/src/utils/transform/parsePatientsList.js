import { parseAddress, parseName, parseTelecom, parseDate, parseIdentifier } from '../utils'

const parsePatientsList = (data) => {
  const { patients } = data
  const parsedPatients = patients.map(patient => {
    const key = patient.iid
    const address = parseAddress(patient.contactPoint)
    const { phone, email } = parseTelecom(patient.telecom)
    const { familyName, name } = parseName(patient.name)
    const birthDate = parseDate(patient.birthDate)
    const dni = parseIdentifier(patient.identifier)
    const { gender } = patient
    const propValue = { key, name, familyName, address, birthDate, gender, phone, email, dni }

    return ({ ...propValue })
  })
  return parsedPatients
}

export default parsePatientsList

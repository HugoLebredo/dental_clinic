export const parseAddress = (addressFHIR) => {
  return ({ postalCode: '33402', country: 'ES', dir: 'C/ las camelias N15' })
}

export const parseName = (nameFHIR) => {
  const namePerson = nameFHIR.find(name => name.system === 'official') || nameFHIR[0]
  const familyName = namePerson.family
  const name = namePerson.given.toString().replace(/,/g, ' ')
  return ({ name, familyName })
}

export const parseTelecom = (telecomFHIR) => {
  const phones = telecomFHIR.filter(telecom => telecom.system === 'phone')
  const emails = telecomFHIR.filter(telecom => telecom.system === 'email')

  const phone = phones[0].value
  const email = emails[0].value

  return { phone, email }
}

export const parseDate = (date) => {
  const d = new Date(date)
  const formatedDate = d.getDate() + '-' + d.getMonth() + '-' + d.getFullYear()
  return formatedDate
}

export const parseIdentifier = (identifiers) => {
  const indentifier = identifiers.find(ident => ident.system === 'official') || identifiers[0]
  return indentifier.value
}

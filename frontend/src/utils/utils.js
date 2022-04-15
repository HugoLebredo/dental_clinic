export const parseAddress = (addressFHIR) => {
  return ({ postalCode: '33402', country: 'ES', dir: 'C/ las camelias N15' })
}

export const parseName = (nameFHIR) => {
  const familyName = 'Lebredo'
  const name = 'Hugo'
  return ({ name, familyName })
}

export const parseTelecom = (telecomFHIR) => ({ phone: '123455677', email: 'hola@prueba.com' })

/*
const api = require('../tests/helpers/db-validators')
const Patient = require('../models/patient')

const existsPatientById = async (id) => {
  const patientExists = await Patient.findById(id)

  if (!patientExists) {
    throw new Error(`Patient Id ${id} doesnt exist`)
  }
}

const getAllContentFromPatients = async () => {
  const response = await api.get('/api/patients')

  const { patients } = response.body

  return {
    ids: response.body.patients.map(patient => patient.iid),
    patients
  }
}

module.exports = {
  existsPatientById,
  getAllContentFromPatients
}
*/

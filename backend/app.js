require('dotenv').config()

const express = require('express')
const cors = require('cors')
const { dbConnection } = require('./database/config')

const paths = {
  patient: '/api/patients',
  users: '/api/users'
}

const app = express()

app.use(cors())

app.use(express.json())

dbConnection()

app.use(paths.patient, require('./routes/patient'))
app.use(paths.users, require('./routes/user'))

app.listen(process.env.PORT, () =>
  console.log(`App listening at http://localhost:${process.env.PORT}`))

module.exports = app

require('dotenv').config()

const express = require('express')
const cors = require('cors')
const { dbConnection } = require('./database/config')

const paths = {
  condition: '/api/conditions',
  patient: '/api/patients',
  practitioners: '/api/practitioners',
  users: '/api/users'
}

const port = process.env.PORT || 3000
const app = express()

app.use(cors())

app.use(express.json())

dbConnection()

app.use(paths.condition, require('./routes/condition'))
app.use(paths.patient, require('./routes/patient'))
app.use(paths.users, require('./routes/user'))
app.use(paths.practitioners, require('./routes/practitioner'))

const server = app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`))

module.exports = { app, server }

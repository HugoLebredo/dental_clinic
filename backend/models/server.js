const express = require('express')
const cors = require('cors')

const { dbConnection } = require('../database/config')

class Server {
  constructor () {
    this.app = express()
    this.port = process.env.PORT
    this.paths = {
      patients: '/api/patients',
      users: '/api/users',
      projects: '/api/project'
    }

    this.connectDB()

    this.middlewares()

    this.routes()
  }

  async connectDB () {
    await dbConnection()
  }

  middlewares () {
    // CORS
    this.app.use(cors())

    // read and parse body
    this.app.use(express.json())

    // Public directory
    this.app.use(express.static('public'))
  }

  routes () {
    this.app.use(this.paths.patients, require('../routes/patient'))
    this.app.use(this.paths.users, require('../routes/user'))
    // this.app.use(this.paths.publications, require('../routes/publication'))
    // this.app.use(this.paths.projects, require('../routes/project'))
  }

  listen () {
    this.app.listen(this.port, () => {
      console.log(`Example app listening at http://localhost:${this.port}`)
    })
  }
}

module.exports = Server

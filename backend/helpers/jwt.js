const jwt = require('jsonwebtoken')

const generateJWT = (uid = '') => {
  const { SECRETORPRIVATEKEY } = process.env

  return new Promise((resolve, reject) => {
    const payload = { uid }

    jwt.sign(payload, SECRETORPRIVATEKEY, {
      expiresIn: '24h'
    }, (err, token) => {
      if (err) {
        console.log(err)
        reject(err)
      } else {
        resolve(token)
      }
    })
  })
}

module.exports = { generateJWT }

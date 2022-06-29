import axios from 'axios'

const url = 'http://localhost:8080/api/login'

const loginService = {

  login: async (values) => {
    try {
      console.log(values)
      const { data } = await axios.get(url)
      const { total } = data
      console.log(total)
      return data
    } catch (error) {
      console.log(error)
      throw (error)
    }
  }
}

export default loginService

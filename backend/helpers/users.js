const getAllContentFromUsers = async () => {
  const response = await api.get('/api/users')

  const { users } = response.body

  return {
    users
  }
}

import axios from 'axios'
const baseUrl = '/api/users'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getUser = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const createUser = async (user) => {
  const response = await axios.post(`${baseUrl}`, user)
  return response.data
}

export default { getAll, getUser, createUser }

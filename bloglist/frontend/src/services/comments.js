import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async (blogId) => {
  const response = await axios.get(`${baseUrl}/${blogId}/comments`)
  return response.data
}

const create = async (blogId, newObject) => {
  const response = await axios.post(`${baseUrl}/${blogId}/comments`, newObject)
  return response.data
}

const remove = async (commentId) => {
  const response = axios.delete(`${baseUrl}/comments/${commentId}`)
  return response.data
}

export default { getAll, create, remove }

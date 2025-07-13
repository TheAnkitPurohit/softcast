import axios from 'axios'

const configuration = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': [
      'Origin',
      'Accept',
      'X-Requested-With',
      'Content-Type',
      'Authorization',
    ],
  },
}
const apiClient = axios.create({ headers: configuration.headers })

export default apiClient

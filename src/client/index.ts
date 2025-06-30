import axios from 'axios'

const baseURL = process.env.NEXT_PUBLIC_API_URL

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
const client = axios.create({ headers: configuration.headers, baseURL })

export default client

import axios from 'axios'
import { getToken } from 'helpers/auth'

export const __API__ = 'http://ec2-52-86-237-71.compute-1.amazonaws.com:3001/'

const defaultOptions = {
  baseURL: __API__,
}

let instance = axios.create(defaultOptions)

instance.interceptors.request.use(config => {
  const token = getToken()

  return {
    ...config,
    headers: {
      ...config.headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  }
})

instance.interceptors.response.use(
  function(response) {
    return response
  },
  error => {
    if (error && error.response && error.response.status === 401 && window.location.pathname !== '/login') {
      window.location.href = '/login'
    } else {
      return Promise.reject(error)
    }
  },
)
export default instance

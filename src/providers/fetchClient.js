import axios from 'axios'
import { getToken } from 'helpers'

export const __API__ = process.env.REACT_APP_API_URL

const defaultOptions = {
  baseURL: __API__
}

const instance = axios.create(defaultOptions)

instance.interceptors.request.use(config => {
  const token = getToken()

  return {
    ...config,
    headers: {
      ...config.headers,
      Authorization: token ? `Bearer ${token}` : ''
    }
  }
})

instance.interceptors.response.use(
  response => response.data,
  error => {
    if ((error && error.response && error.response.status !== 401) || ['/login'].includes(window.location.pathname)) {
      return Promise.reject(error)
    }
    window.location.href = '/login'
  }
)

export default instance

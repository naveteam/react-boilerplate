import axios from 'axios'

export const __API__ = ''

const defaultOptions = {
  baseURL: __API__,
}

let instance = axios.create(defaultOptions)

instance.interceptors.request.use(config => {
  /* global localStorage */
  config.headers.Authorization = localStorage.getItem('token')
  return config
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

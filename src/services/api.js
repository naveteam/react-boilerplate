import axios from 'axios'
const __API__ = ''

const fetchClient = () => {
  const defaultOptions = {
    baseURL: __API__,
    headers: {
      'Content-Type': 'application/json'
    }
  }

  let instance = axios.create(defaultOptions)

  instance.interceptors.request.use(function (config) {
    /* global localStorage */
    const token = localStorage.getItem('token')
    config.headers.Authorization = token ? `Bearer ${token}` : ''
    return config
  })

  return instance
}

export default fetchClient()

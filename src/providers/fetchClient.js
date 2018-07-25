import axios from 'axios'

export const __API__ = ''

const fetchClient = () => {
  const defaultOptions = {
    baseURL: __API__
  }

  let instance = axios.create(defaultOptions)

  instance.interceptors.request.use(config => {
    /* global localStorage */
    config.headers.Authorization = localStorage.getItem('token')
    return config
  })

  instance.interceptors.response.use(function (response) {
    return response
  }, error => {
    if (error.response.status === 401) {
      // logica de redirect aqui
      window.location('/login')
    } else {
      return Promise.reject(error)
    }
  })

  return instance
}

export default fetchClient()

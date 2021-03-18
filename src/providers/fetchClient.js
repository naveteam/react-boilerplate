import { OAuth0 } from '@naveteam/pandora-frontend'

import { ACCESS_TOKEN } from 'helpers'

const options = {
  api_url: process.env.REACT_APP_API_URL,
  token_name: ACCESS_TOKEN
}

const instance = OAuth0.createInstance(options)

instance.interceptors.request.use(config => {
  const requestParams = !!config?.params ? {} : null
  !!requestParams &&
    Object.entries(config.params).forEach(([key, value]) => {
      if (value === undefined || value === null || value === '') {
        return
      }
      requestParams[key] = value
    })

  return {
    ...config,
    ...(!!requestParams && { params: requestParams })
  }
})

export default instance

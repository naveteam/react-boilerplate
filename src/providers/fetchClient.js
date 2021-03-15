import { OAuth2 } from '@naveteam/pandora-frontend'

import { ACCESS_TOKEN, REFRESH_TOKEN } from 'helpers'

const options = {
  api_url: process.env.REACT_APP_API_URL,
  refreshTokenUrl: '/v1/users/refresh-token',
  access_token_name: ACCESS_TOKEN,
  refresh_token_name: REFRESH_TOKEN
}

const instance = OAuth2.createInstance(options)

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

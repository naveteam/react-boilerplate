import { OAuth2, OAuth0 } from '@naveteam/pandora-frontend'

import { ACCESS_TOKEN, REFRESH_TOKEN, TOKEN } from 'helpers'

const options = {
  api_url: process.env.REACT_APP_API_URL,
  refreshTokenUrl: '/v1/users/refresh-token',
  access_token_name: ACCESS_TOKEN,
  refresh_token_name: REFRESH_TOKEN
}

const instance = OAuth2.createInstance(options)

/*
trocar para a instancia abaixo caso a autenticação seja feita com OAuth0

const options = {
  api_url: process.env.REACT_APP_API_URL,
  token_name: TOKEN
}

const instance = OAuth0.createInstance(options)
*/
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

import { OAuth0 } from '@naveteam/pandora-frontend'

import { ACCESS_TOKEN, removeEmptyKeysFromObject } from 'helpers'

const options = {
  api_url: process.env.REACT_APP_API_URL,
  token_name: ACCESS_TOKEN
}

const instance = OAuth0.createInstance(options)

instance.interceptors.request.use(config => {
  const requestParams = Boolean(config?.params) ? removeEmptyKeysFromObject(config.params) : null
  return {
    ...config,
    ...(Boolean(requestParams) && { params: requestParams })
  }
})

export default instance

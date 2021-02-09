import { ACCESS_TOKEN, REFRESH_TOKEN, TOKEN } from 'helpers'

export const getToken = () => localStorage.getItem(ACCESS_TOKEN)

// trocar função de "getToken()" caso a autenticação seja feita com OAuth0
// export const getToken = () => localStorage.getItem(TOKEN)

export const clearToken = () => {
  localStorage.removeItem(ACCESS_TOKEN)
  localStorage.removeItem(REFRESH_TOKEN)
  localStorage.removeItem(TOKEN)
}

export const setAccessToken = token => localStorage.setItem(ACCESS_TOKEN, token)

export const setRefreshToken = token => localStorage.setItem(REFRESH_TOKEN, token)

export const setToken = token => localStorage.setItem(TOKEN, token)

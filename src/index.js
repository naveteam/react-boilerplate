import './wdyr'

import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'

import React from 'react'
import ReactDOM from 'react-dom'
import * as Sentry from '@sentry/browser'
import { ReactQueryCacheProvider, QueryCache } from 'react-query'

import App from './App'

import AppProviders from 'context'

import { version, name } from '../package.json'

if (process.env.REACT_APP_NODE_ENV === 'production') {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_URL,
    environment: process.env.REACT_APP_NODE_ENV,
    debug: process.env.REACT_APP_NODE_ENV !== 'production',
    release: `${name}@${version}`
  })
}

const queryCache = new QueryCache({
  defaultConfig: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

ReactDOM.render(
  <ReactQueryCacheProvider queryCache={queryCache}>
    <AppProviders>
      <App />
    </AppProviders>
  </ReactQueryCacheProvider>,
  document.getElementById('root')
)

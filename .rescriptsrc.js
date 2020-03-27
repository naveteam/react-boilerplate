const commonPlugins = ['@babel/plugin-proposal-optional-chaining']
const productionPlugins = [['transform-remove-console', { exclude: ['error', 'warn'] }]]
const plugins =
  process.env.REACT_APP_NODE_ENV === 'production' ? [...commonPlugins, ...productionPlugins] : [...commonPlugins]

module.exports = [
  [
    'use-babel-config',
    {
      presets: ['react-app'],
      plugins: [...plugins]
    }
  ],
  ['use-eslint-config', '.eslintrc.json']
]

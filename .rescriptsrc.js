const productionPlugins = [['transform-remove-console', { exclude: ['error', 'warn'] }]]
const plugins = process.env.NODE_ENV === 'production' ? productionPlugins : []

module.exports = [
  ['use-babel-config',
  {
      presets: ['react-app'],
      plugins: [...plugins],
    },
  ],
  ['use-eslint-config', '.eslintrc.json'],
]

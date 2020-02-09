module.exports = api => {
  api.cache(true)

  const presets = [['@babel/preset-env']]
  const plugins = [
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-runtime',
  ]

  return {
    presets,
    plugins,
  }
}

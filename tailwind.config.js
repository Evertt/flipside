const production = process.env.NODE_ENV !== 'development'

module.exports = {
  purge: {
    enabled: production,
    content: ['./src/**/*.svelte']
  }
}

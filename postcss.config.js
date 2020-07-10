const production = process.env.NODE_ENV !== 'development'

module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss'),
    require('postcss-nested'),
    require('autoprefixer'),
    production && require('cssnano'),
  ]
}

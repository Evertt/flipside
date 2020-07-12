const _ = require('lodash')
const plugin = require('tailwindcss/plugin')
const production = process.env.NODE_ENV !== 'development'

module.exports = {
  purge: {
    enabled: production,
    content: ['./src/**/*.svelte']
  },
  plugins: [
    plugin(function({ addUtilities, variants, e, theme }) {
      const generators = [
        (size, modifier) => {
          let [, n, u] = size.match(/([\d.]+)(\w*)/)

          return {
            [`.${e(`pp-${modifier}`)}`]: {
              padding: `${n}${u} ${n*2}${u}`
            }
          }
        }
      ]

      const utilities = _.flatMap(generators, generator => {
        return _.flatMap(theme('padding'), generator);
      });

      addUtilities(utilities, variants('padding'));
    }),
  ]
}

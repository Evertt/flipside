const _ = require('lodash')
const plugin = require('tailwindcss/plugin')
const production = process.env.NODE_ENV !== 'development'

module.exports = {
  purge: {
    enabled: production,
    content: ['./src/**/*.svelte'],
    options: {
      defaultExtractor: content => {
        // Capture as liberally as possible, including things like `h-(screen-1.5)`
        const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || []

        // Capture classes within other delimiters like .block(class="w-1/2") in Pug
        const innerMatches = content.match(/[^<>"'`\s.(){}\[\]#=%]*[^<>"'`\s.(){}\[\]#=%:]/g) || []

        // Capture classes using Svelte's class:something={condition} syntax
        const svelteMatches = content.match(/(?<=class:)[^<>"'`\s.(){}\[\]#=%]*[^<>"'`\s.(){}\[\]#=%:]/g) || []

        return broadMatches.concat(innerMatches).concat(svelteMatches)
      }
    }
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

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        'mono': ['Azeret Mono Variable', 'ui-monospace']
      }
    },
  },
  plugins: [require('@catppuccin/tailwindcss')({
    prefix: false,
    defaultFlavour: 'mocha'
  })],
}


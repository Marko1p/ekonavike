// postcss.config.cjs
module.exports = {
  plugins: {
    // swap out `tailwindcss` for the new scoped package:
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
}

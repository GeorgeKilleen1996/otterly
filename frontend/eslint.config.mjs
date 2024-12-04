// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt().override(
  'nuxt/typescript', // specify the name of the target config, or index
  {
    rules: {
      // ...override the rules
      'vue/html-self-closing': 0
    }
  }
)
// Your custom configs here

# Dev tools

Tools for easier Gridmix development

## ESLint plugin

An official ESLint plugin is available: https://www.npmjs.com/package/eslint-plugin-gridmix

To configure this, first install the necessary plugins:

```sh
# NPM
npm i -D eslint eslint-plugin-gridmix vue-eslint-parser

# Yarn
yarn add -D eslint eslint-plugin-gridmix vue-eslint-parser
```

Then add this code to `.eslintrc.js`:

```js
module.exports = {
  env: {
    node: true,
    es6: true
  },
  plugins: ["gridmix"],
  rules: {
    "gridmix/format-query-block": "error"
  },
  parser: "vue-eslint-parser"
}
```

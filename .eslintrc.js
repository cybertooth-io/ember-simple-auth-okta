module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['ember', 'ember-suave'],
  extends: ['eslint:recommended', 'plugin:ember/recommended', 'plugin:ember-suave/recommended'],
  env: {
    browser: true
  },
  rules: {
    'arrow-parens': 'off',
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'ember/no-jquery': 'error',
    'ember/no-new-mixins': 'warn',
    'ember-suave/lines-between-object-properties': 'off'
  },
  overrides: [
    // node files
    {
      files: [
        '.eslintrc.js',
        '.template-lintrc.js',
        'ember-cli-build.js',
        'index.js',
        'testem.js',
        'blueprints/*/index.js',
        'config/**/*.js',
        'tests/dummy/config/**/*.js'
      ],
      excludedFiles: ['addon/**', 'addon-test-support/**', 'app/**', 'tests/dummy/app/**'],
      parserOptions: {
        sourceType: 'script'
      },
      env: {
        browser: false,
        node: true
      },
      plugins: ['node'],
      rules: Object.assign({}, require('eslint-plugin-node').configs.recommended.rules, {
        // add your custom rules and overrides for node files here
      })
    }
  ]
};

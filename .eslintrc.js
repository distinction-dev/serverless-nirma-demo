module.exports = {
  root: true,
  env: {
    node: true,
    mocha: true
  },
  extends: [
    'eslint:recommended',
    'standard'
  ],
  globals: {
    msCrypto: true
  },
  rules: {
    'no-var': ['error'],
    indent: [
      'error',
      2,
      {
        SwitchCase: 1
      }
    ],
    'no-tabs': 0,
    semi: [
      2,
      'always'
    ],
    quotes: [
      2,
      'single'
    ],
    'space-before-function-paren': [
      2
    ],
    'no-trailing-spaces': [
      'error'
    ],
    'no-multi-spaces': [
      'error'
    ],
    'no-multiple-empty-lines': ['error', { max: 2 }],
    'brace-style': [
      'error',
      'stroustrup'
    ],
    'object-shorthand': 'error',
    'block-scoped-var': ['error'],
    'guard-for-in': ['error'],
    'require-await': ['warn']
  }
};

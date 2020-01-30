module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: [
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
    'alloy',
    'alloy/react',
    'alloy/typescript'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  settings: {
    react: {
      pragma: 'React',
      version: 'detect'
    }
  },
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/self-closing-comp': 'off',
    '@typescript-eslint/prefer-optional-chain': 'off',
    'linebreak-style': ['error', 'unix'],
    'require-atomic-updates': 0,
    'no-console': 0,
    'no-var': 'error',
    'max-params': 'off',
    'spaced-comment': [
      'error',
      'always',
      {
        line: {
          markers: ['/']
        }
      }
    ],
    'no-param-reassign': 'off'
  }
}

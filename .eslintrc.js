module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'airbnb-typescript',
  ],
  plugins: ['@typescript-eslint', 'react-hooks'],
  parserOptions: {
    project: './tsconfig.json'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/camelcase': 'off',
    'import/no-unresolved': [2, { "ignore": ["^@"] }],
    'react/destructuring-assignment': 'off',
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  }
}

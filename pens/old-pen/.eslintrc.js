module.exports = {
  extends: 'airbnb',
  plugins: ['prettier'],
  rules: {
    indent: [2, 2],
    semi: [2, 'always'],
    'no-console': [0],
    'prettier/prettier': 'error',
  },
  globals: {
    window: true,
    document: true,
  },
};

// ESLint flat config för ESLint v9+
import prettier from 'eslint-config-prettier';
import pluginPrettier from 'eslint-plugin-prettier';

export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        window: 'readonly',
        document: 'readonly',
        module: 'writable',
        require: 'readonly',
        process: 'readonly',
        jest: 'readonly'
      }
    },
    ignores: [
      'node_modules',
      'build',
      'dist',
      'public',
      'mongodb-binaries'
    ],
    plugins: {
      prettier: pluginPrettier
    },
    rules: {
      ...prettier.rules,
      'prettier/prettier': 'error'
    }
  }
];

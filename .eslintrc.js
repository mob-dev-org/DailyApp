// eslint-disable-next-line no-undef
module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:react-hooks/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
    ],
    overrides: [],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react', 'react-hooks', '@typescript-eslint', 'prettier', 'import'],
    rules: {
        indent: ['error', 4, { SwitchCase: 1 }],
        quotes: ['error', 'single', { avoidEscape: true }],
        'linebreak-style': ['error', 'unix'],
        semi: ['error', 'always'],
        'prettier/prettier': 'error',
        'import/order': [
            'error',
            {
                groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
                'newlines-between': 'always',
            },
        ],

        // React
        'react/react-in-jsx-scope': 'off',
        'react/jsx-key': 'error', // Validate JSX has key prop when in array or iterator
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
};

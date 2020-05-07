module.exports = {
  parser: "@typescript-eslint/parser", // Specifies the ESLint parser
  // "parser": "babel-eslint",
  extends: [
    "eslint:recommended",
  ],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: "module" // Allows for the use of imports
  },
  "env": {
      "browser": true,
      "node": true
  },
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
    // 'no-undef': 0,
    'no-var': 0,
    'prefer-arrow-callback': 0,
    'no-restricted-syntax': 0,
    'no-useless-escape': 0,
    'prefer-template': 0,
    'no-multi-spaces': 0,
    'global-require': 0,
    'no-param-reassign': 0,
    'no-continue': 0,
    'no-else-return': 0,
    'no-plusplus': 0,
    'vars-on-top': 0,
    'quote-props': 0,
    'object-shorthand': 0,
    'func-names': 0,
    'no-underscore-dangle': 0,
    'import/extensions': 0,
    'import/newline-after-import': 0,
    'import/first': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-unresolved': 0,

    'no-unused-vars': [0, { 'argsIgnorePattern': '^_' }],
    "comma-dangle": 0,
    "brace-style": [2, "stroustrup"],
    "no-console": 0,
    "no-nested-ternary": 0,
    "operator-linebreak": 0,
    "space-before-function-paren": 0,
    "prefer-destructuring": 0,
    "function-paren-newline": 0,
    "no-extend-native": 0,
    "no-multi-assign": 0,
    "no-inner-declarations": 0,
    "no-prototype-builtins": 0,
    "padded-blocks": 0,
    "indent": [2, 2, {"SwitchCase": 1}],
    "spaced-comment": 1,
    "max-len": 0,
    "quotes": ["error", "single", { "allowTemplateLiterals": true }],
    "import/prefer-default-export": "off",
    "arrow-parens": ["error", "as-needed"],
    // "complexity": ["warn", { "max": 20 }],
  },
  overrides: [
    // typescript
    {
      files: ["*.ts", "*.tsx"],
      plugins: ['@typescript-eslint'],
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
      ],
      rules: {
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/member-delimiter-style': 0,
        '@typescript-eslint/interface-name-prefix': 0,
        '@typescript-eslint/no-use-before-define': 0,
      },
    },
  ]
};

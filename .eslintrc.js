module.exports = {
  root: true,

  parser: "@typescript-eslint/parser",

  plugins: ["@typescript-eslint", "react-hooks"],

  extends: [
    "react-app",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "prettier/@typescript-eslint",
  ],

  env: {
    es6: true,
    node: true,
  },

  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2018,
    projects: ["packages/web"],
  },

  rules: {
    "jsx-a11y/anchor-is-valid": "off",
    "@typescript-eslint/explicit-member-accessibility": "off",
    "@typescript-eslint/explicit-function-return-type": [
      "error",
      {
        allowExpressions: true,
      },
    ],
  },

  globals: {},
};

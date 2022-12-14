module.exports = {
  "root": true,
  "env": {
    "es2021": true,
    "node": true
  },
  "plugins": [
    "eslint-plugin",
    "@typescript-eslint"
  ],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "overrides": [
    {
      "files": [
        "*.ts",
        "*.tsx"
      ],
      "parserOptions": {
        "project": "tsconfig.json",
        "tsconfigRootDir": __dirname
      }
    }
  ],
  "parser": "@typescript-eslint/parser",
  "rules": {
    "semi": 1,
    "@typescript-eslint/prefer-readonly": [
      1,
      {
        "onlyInlineLambdas": true
      }
    ]
  }
}

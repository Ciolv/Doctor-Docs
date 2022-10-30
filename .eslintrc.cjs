module.exports = {
  "ignorePatterns": [
    "src/img/**/*",
    "src/css/**/*",
    "src/test/**/*",
    "src/frontend/generated/*"
  ],
  "extends": [
    "react-app",
    "react-app/jest",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:security/recommended",
    "prettier"
  ],
  "parser": "@typescript-eslint/parser",
  "plugins": [
    "@typescript-eslint"
  ],
  "rules": {
    "@typescript-eslint/ban-types": "warn",
    "quotes": ["error", "double"]
  }
};
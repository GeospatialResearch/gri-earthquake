module.exports = {
  jest: {
    moduleFileExtensions: [
      "js",
      "json",
      // tell Jest to handle `*.vue` files
      "vue",
    ],
    transform: {
      // process `*.vue` files with `vue-jest`
      ".*\\.(vue)$": "vue-jest",
      // process `*.js` files with `babel-jest`
      ".*\\.(js)$": "babel-jest",
    },
    moduleNameMapper: {
      // support the same @ -> src alias mapping in source code
      "^@/(.*)$": "<rootDir>/src/$1"
    },
    collectCoverage: true,
    collectCoverageFrom: ["**/*.{js,vue}", "!**/node_modules/**"]
  }
}

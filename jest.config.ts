import {} from "./src/types";

module.exports = {
  transform: {

    "^.+\\.tsx?$": "ts-jest"

  },

  setupFilesAfterEnv: [

    "@testing-library/jest-dom/extend-expect"

  ],

  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",

  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"]

};

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testPathIgnorePatterns: [
    "/node_modules/",
    "/__utils",
    "/setup",
    "/generated/",
    "/.git/",
    "/.history/",
  ],
  globals: {
    "ts-jest": {
      isolatedModules: true,
    },
  },
  globalSetup: "./src/__tests__/setup.js",
};

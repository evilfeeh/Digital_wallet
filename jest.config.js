/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    clearMocks: true,
    maxWorkers: 1,
    testMatch: ["**/*.spec.ts"],
    collectCoverage: true,
    collectCoverageFrom: ["src/**/*.ts"],
    coverageReporters: ["lcov"],
};

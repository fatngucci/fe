/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    collectCoverage: true,
    // wird vom WE2 Blatt 6 übernommen
    collectCoverageFrom: ['<rootDir>/src/**/*.{ts,js,jsm,tsx,jsx,tsm}'],
    coverageReporters: ["text", "clover", "cobertura"], // "cobertura" for gitlab merge requests, "clover" for grading, "text" for console
    //
    reporters: [
      "default",
      ["jest-junit", { suiteNameTemplate: "{filename}" }],
    ],
    testPathIgnorePatterns: ["<rootDir>/dist/", "<rootDir>/node_modules/"],
    collectCoverageFrom: ['<rootDir>/src/**/*.{ts,js,jsm,tsx,jsx,tsm}'],
    coveragePathIgnorePatterns: ["<rootDir>/dist/", "<rootDir>/node_modules/", "<rootDir>/tests/"],
  };
  
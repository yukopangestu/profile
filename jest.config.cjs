const { createCjsPreset } = require('jest-preset-angular/presets');

const preset = createCjsPreset();

module.exports = {
  ...preset,
  snapshotSerializers: [],
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testMatch: ['<rootDir>/src/**/*.spec.ts'],
};

module.exports = {
    clearMocks: true,
    coverageDirectory: '<rootDir>/coverage',
    coverageReporters: ['lcov'],
    preset: 'ts-jest/presets/js-with-ts',
    globals: {
        'ts-jest': {
            tsConfig: 'tsconfig.json',
            diagnostics: true,
        },
    },
}

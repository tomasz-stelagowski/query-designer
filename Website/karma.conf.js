module.exports = function (config) {
    config.set({
        basePath: '.',
        frameworks: ['jasmine'],
        files: [
            './wwwroot/dist/vendor.js',
            './ClientApp/karma-tests.ts'
        ],
        preprocessors: {
            './ClientApp/karma-tests.ts': ['webpack']
        },
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        mime: { 'application/javascript': ['ts', 'tsx'] },
        singleRun: false,
        webpack: require('./webpack.config.test.js'),
        webpackMiddleware: { stats: 'errors-only' }
    });
};
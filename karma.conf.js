module.exports = function(config) {
    config.set({

        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine', 'browserify'],


        browserify: {
            watch: true,
            debug: true,
            configure: function(bundle) {
                bundle.on('prebundle', function() {
                    bundle.ignore('style');
                });
            },
            transform: []
        },
        preprocessors: {
            'src/**/*.js': ['browserify'],
            'test/**/*.js': ['browserify']
        },

        // list of files / patterns to load in the browser
        files: [
            'test/**/*Spec.js'
        ],
        reporters: ['progress'],

        port: 9876,

        colors: true,

        logLevel: config.LOG_INFO,

        autoWatch: false,

        browsers: ['PhantomJS'],

        plugins: [
            'karma-phantomjs-launcher',
            'karma-jasmine', 'karma-browserify'],

        singleRun: true
    });
};
module.exports = function(config) {
    config.set({
         frameworks: ['jasmine'],
         plugins: [
             'karma-phantomjs-launcher',
             'karma-jasmine',
             'karma-coverage'
         ],
         files: [
             '../../node_modules/jquery/dist/jquery.js',
            '../../node_modules/bootstrap/dist/js/bootstrap.js',
            '../../node_modules/jstree/dist/jstree.min.js',
             '../../node_modules/angular/angular.js',
             '../../node_modules/angular-route/angular-route.js',
            '../../node_modules/angular-mocks/angular-mocks.js',
            '../../src/js/app.js',
            '../../src/js/appconfig.js',
            // '../../src/js/**/*.js',
            '../../src/js/controller/testCtrl.js',
            '../../src/js/service/hostService.js',
            '../../test/unit/*.js',
            '../../src/index.html'
         ],
         // start these browsers
         browsers: ['PhantomJS'],
         reporters: ['progress', 'coverage'],
         preprocessors: {
             'src/js/**/*.js': ['coverage']
         },
         
         coverageReporter: {
             type: 'html',
             dir: '../reports/coverage'
         },
         logLevel: config.LOG_INFO,
         singleRun: false
     });
};
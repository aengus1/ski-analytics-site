'use strict';
var app = require('angular').module('SkiAnalytics');


app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('login', {
            url: "/login",
            views: {
                'navContent': {
                    templateUrl: 'public/public_nav.html'
                },
                'mainContent': {
                    templateUrl: 'auth/login.html',
                    controller: 'LoginController'
                }
            }
        })
        .state('forgot', {
            url: "/forgot",
            views: {
                'navContent': {
                    templateUrl: 'public/public_nav.html'
                },
                'mainContent': {
                    templateUrl: 'auth/forgot.html',
                    controller: 'ForgotController'
                }
            }
        })
        .state('pwreset', {
            url: "/pwreset?token&email",
            views: {
                'navContent': {
                    templateUrl: 'public/public_nav.html'
                },
                'mainContent': {
                    templateUrl: 'auth/pwreset.html',
                    controller: 'ForgotController'
                }
            }
        })
        .state('register', {
            url: "/register",
            views: {
                'navContent': {
                    templateUrl: 'public/public_nav.html'
                },
                'mainContent': {
                    templateUrl: 'auth/register.html',
                    controller: 'RegisterController'
                }
            }
        })
        .state('completereg', {
            url: "/completereg?token&email",
            views: {
                'navContent': {
                    templateUrl: 'public/public_nav.html'
                },
                'mainContent': {
                    templateUrl: 'auth/completereg.html',
                    controller: 'RegisterController'
                }
            }
        })

});

app.run(function (defaultErrorMessageResolver) {
        defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
            errorMessages['badPassword'] = 'Password must be at least 8 characters';
            errorMessages['match'] = 'Passwords do not match';
            errorMessages['alpha'] = 'Special characters and numbers not allowed';
        });
    }
);

app.controller('LoginController', require('./loginController'));

app.controller('ForgotController', require('./forgotController'));
app.factory('ForgotService',require('./forgotService'));

app.controller('RegisterController', require('./registerController'));
app.factory('RegisterService',require('./registerService'));

require('./authServices');

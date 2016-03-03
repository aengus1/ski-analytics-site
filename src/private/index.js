
'use strict';
var app = require('angular').module('SkiAnalytics');


app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('session-home', {
            url: "/session/main",
            views: {
                'navContent': {
                    templateUrl: 'private/private_nav.html',
                    controller: 'HomeController'
                },
                'mainContent': {
                    templateUrl: 'private/main.html'
                }
            }
        })
});


app.controller('HomeController', require('./homeController'));
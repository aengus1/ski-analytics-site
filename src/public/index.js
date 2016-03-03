/**
 * Created by aengusmccullough on 2016-02-28.
 */
'use strict';
var app = require('angular').module('SkiAnalytics');

app.run(['$state','$rootScope','AuthService', function ($state,$rootScope,AuthService) {
    $state.transitionTo('home');  //set initial state
    $rootScope.$state = $state;   //set state variable in root scope

    // redirect to auth if not authenticated
    $rootScope.$on('$stateChangeSuccess',
        function(event, toState, toParams, fromState, fromParams, options){
            event.preventDefault();
        if(!AuthService.isAuthenticated() && (toState.name.indexOf('session-')===0)){
            $state.go('login');
        }
    })

}]);

app.filter('capitalize', function () {
    return function (input, all) {
        return (!!input) ? input.replace(/([^\W_]+[^\s-]*) */g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }) : '';
    };
});

app.config(function ($httpProvider,$stateProvider, $urlRouterProvider) {
    $httpProvider.interceptors.push('authInterceptor');   //auth interceptor
    $httpProvider.defaults.useXDomain = true;  //allow cross origin requests
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.defaults.headers.common["Accept"] = "application/json";
    $httpProvider.defaults.headers.common["Content-Type"] = "application/json";

    $stateProvider
        .state('home', {
            url: "/",
            views: {
                'navContent': {
                    templateUrl: 'public/public_nav.html'
                },
                'mainContent':{
                    templateUrl: 'public/main.html'
                }
            }
        })
        .state('about', {
            url: "/about",
            views: {
                'navContent': {
                    templateUrl: 'public/public_nav.html'
                },
                'mainContent':{
                    templateUrl: 'public/about.html'
                }
            }
        })
        .state('contact', {
            url: "/contact",
            views: {
                'navContent': {
                    templateUrl: 'public/public_nav.html'
                },
                'mainContent':{
                    templateUrl: 'public/contact.html'
                }
            }
        })
    $urlRouterProvider.otherwise('/');

});

//require('./authService');
app.controller('ApplicationController', require('./applicationController'));




/**
 * Created by aengusmccullough on 2016-02-28.
 */
'use strict';
var app = require('angular').module('SkiAnalytics');

app.constant('ACCOUNT_TYPE', {
    free: 'free',
    paid: 'paid'
});
app.constant('API', {
    login: 'http://52.24.85.58/SkiAnalyticsWs/v1/login/post',
    forgot: 'http://52.24.85.58/SkiAnalyticsWs/v1/forgot/post',
    reset: 'http://52.24.85.58/SkiAnalyticsWs/v1/reset/post',
    register: 'http://52.24.85.58/SkiAnalyticsWs/v1/register/post',
    completereg: 'http://52.24.85.58/SkiAnalyticsWs/v1/completereg/post'
})

app.constant('AUTH_EVENTS', {
    loginSuccess: 'auth-auth-success',
    loginFailed: 'auth-auth-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
});

app.factory('AuthService', function ($window, $http, Session, API) {
    var authService = {};
    var response = {
        status: null,
        session: null
    };

    authService.login = function (credentials) {
        return $http
            .post(API.login, credentials)
            .then(function (res) {
                    switch (res.status) {
                        case 200:
                            $window.sessionStorage.token = res.data.token;
                            Session.create(res.data.token,
                                res.data.id,
                                res.data.firstName,
                                res.data.lastName,
                                res.data.userRole
                            );
                            response.status = 'auth';
                            response.session = Session.get();
                            break;
                        default:
                            response.status = 'unknown';
                            break;
                    }
                return response;
                }
                , function errorCallback(res) {
                    switch(res.status){
                        case 401:
                        response.status = 'notauth';
                        break;
                        case 404:
                            response.status = 'servererror';
                            break;
                        case 403:
                            response.status = 'forbidden';
                            break;
                        default:
                            response.status = 'unknown';
                            console.log(JSON.stringify(res));
                            break;
                    }

                    return response;
                });
    };

    authService.isAuthenticated = function () {
        return !!Session.id;
    };

    authService.isAuthorized = function (authorizedRoles) {
        if (!angular.isArray(authorizedRoles)) {
            authorizedRoles = [authorizedRoles];
        }
        return (authService.isAuthenticated() &&
        authorizedRoles.indexOf(Session.userRole) !== -1);
    };

    return authService;
});

app.service('Session', function () {

    this.create = function (token, id, firstName, lastName, userRole) {
        this.token = token;
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.userRole = userRole;
    };

    this.get = function () {
        return this;
    };

    this.destroy = function () {
        this.token = null;
        this.id = null;
        this.firstName = null;
        this.lastName = null;
        this.userRole = null;
    };
});

/**
 * Authentication interceptor.  Puts auth token into header
 * @param {type} rootscope
 * @param {type} q
 * @param {type} window
 */
app.factory('authInterceptor', function ($rootScope, $q, $window) {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            if ($window.sessionStorage.token) {
                config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
            }
            return config;
        },
        response: function (response) {
            if (response.status === 401) {
                console.log('not authenticated');
                // handle the case where the user is not authenticated
            }
            return response || $q.when(response);
        }
    };
});
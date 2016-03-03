/**
 * Created by aengusmccullough on 2016-02-23.
 */

'use strict';



module.exports = function($scope,$http,$rootScope,$state, AUTH_EVENTS, AuthService) {
    $scope.submitting = false;
    $scope.submitted = false;
    $scope.has_error = false;
    $scope.loginCredentials = {};

    $scope.doLogin = function(){
        $scope.submitting = true;
        $scope.submitted = true;
        $scope.has_error = false;
        AuthService.login($scope.loginCredentials).then(function(response){
            switch(response.status) {
                case 'auth':
                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                    $scope.submitting = false;
                    $scope.submitted = true;
                    $scope.has_error = false;
                    $scope.setSession(response.session);
                    $state.go('session-home');
                    break;
                case 'notauth':
                    $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
                    $scope.submitting = false;
                    $scope.submitted = false;
                    $scope.has_error = true;
                    break;
                default:
                    $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
                    $scope.submitting = false;
                    $scope.submitted = false;
                    $scope.has_error = true;
            }

        }, function () {
            $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
            $scope.submitting = false;
            $scope.submitted = false;
            $scope.has_error = true;
        });
    };
};
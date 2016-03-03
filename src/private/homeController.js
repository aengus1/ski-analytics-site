/**
 * Created by aengusmccullough on 2016-03-01.
 */

'use strict';



module.exports = function($scope,$rootScope,$state,$window,Session,AUTH_EVENTS) {

    $scope.signout = function(){
        delete $window.sessionStorage.token;
        Session.destroy();
        $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
        $state.go('home');
    };
}
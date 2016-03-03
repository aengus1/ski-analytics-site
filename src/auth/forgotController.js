/**
 * Created by aengusmccullough on 2016-02-23.
 */

'use strict';


/**
 * Controller for the forgot password and reset password forms
 * @param $scope
 * @param $http
 * @param $rootScope
 * @param $state
 * @param ForgotService
 */
module.exports = function($scope,$http,$rootScope,$state,ForgotService) {
    $scope.submitting = false;
    $scope.submitted = false;
    $scope.forgotConfirm = false;
    $scope.forgotDeny = false;

    $scope.resettoken ='';
    $scope.resetpw='';
    $scope.resetemail='';
    $scope.resetpwconfirm='';

    $scope.forgotPw = function(){
        $scope.submitting = true;
        $scope.submitted = true;
        $scope.has_error = false;
        ForgotService.requestPw($scope.forgotemail).then(function(res){
            if(res){
                $scope.submitting = false;
                $scope.submitted = true;
                $scope.forgotConfirm = true;

            }else{
                $scope.submitting = false;
                $scope.submitted = false;
                $scope.forgotDeny = true;
            }
            $scope.submitting = false;
            $scope.submitted = false;
        });
    };

    $scope.initForm = function(){
        $scope.resettoken = $state.params.token;
        $scope.resetemail = $state.params.email;
    };

    $scope.resetPw = function(){
        $scope.resetsuccess=false;
        $scope.resetfail=false;
        $scope.submitting = true;
        $scope.submitted = true;
        $scope.has_error = false;

        ForgotService.resetPw($scope.resetemail,$scope.resettoken,$scope.resetpw).then(function(res){
            if(res){
                $scope.resetsuccess=true;
            }else{
                $scope.resetfail=true;
            }
            $scope.submitting = false;
            $scope.submitted = true;
        });
    };
};
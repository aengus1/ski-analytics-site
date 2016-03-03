/**
 * Created by aengusmccullough on 2016-02-28.
 */

module.exports = function($scope,$http,RegisterService,$state) {
    $scope.submitting = false;
    $scope.submitted = false;
    $scope.duplicateEmail = false;
    $scope.success = false;
    $scope.error = false;
    $scope.user = {};
    $scope.registrationSuccess=false;
    $scope.firstName='';
    $scope.lastName='';

    $scope.regsuccess=false;
    $scope.regfail=false;

    $scope.register = function () {
        console.log('hit register');
        $scope.submitting = true;
        $scope.submitted = true;
        $scope.duplicateEmail = false;
        $scope.error = false;
        $scope.firstName='';
        $scope.lastName='';


    RegisterService.register($scope.user).then(function(res){
        $scope.submitting = false;
        $scope.submitted = true;

        if(res.success){
            $scope.success = true;
            $scope.firstName=res.user.firstName;
            $scope.lastName=res.user.lastName;
            $scope.registrationSuccess=true;
        }else if(res.error==='duplicate_email'){
            $scope.duplicateEmail = true;
        }else{
            $scope.error=true;
        }

    }, function () {
        $scope.submitting = false;
        $scope.submitted = true;
        $scope.error = true;
    });
    }

    $scope.initForm = function(){
        $scope.actoken = $state.params.token;
        $scope.acemail = $state.params.email;
    };
    $scope.completeRegistration = function(){
        $scope.regsuccess=false;
        $scope.regfail=false;
        RegisterService.completeReg($scope.acemail,$scope.actoken).then(function(res){
            if(res){
                $scope.regsuccess=true;
            }else{
                $scope.regfail=true;
            }
        });
    };
};
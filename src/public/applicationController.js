/**
 * Created by aengusmccullough on 2016-02-28.
 */

module.exports = function ($scope,ACCOUNT_TYPE,AuthService) {
    $scope.session = null;
    $scope.accountType = ACCOUNT_TYPE;
    $scope.isAuthorized = AuthService.isAuthorized;

    $scope.setSession = function (session) {
        $scope.session = session;
    };
};
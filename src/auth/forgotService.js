module.exports =  function ($window,$http,API) {
    var forgotService = {};

    forgotService.requestPw = function (email) {
        var response = {};
        return $http
            .post(API.forgot, email)
            .then(function (res) {
                    console.log('result = ' + JSON.stringify(res));
                    if (res.status = 200 && res.data.success === 'success') {
                        return true;
                    } else {
                        return false;
                    }
                }
                , function errorCallback(res) {
                    console.log('result = ' + JSON.stringify(res));
                    return false;
                });
    };


    forgotService.resetPw = function (email,token,pw) {
        var response = {};
        var payload = {};
        payload.email=email;
        payload.newpassword=pw;
        payload.token=token;
        return $http
            .post(API.reset, payload)
            .then(function (res) {
                    console.log('result = ' + JSON.stringify(res));
                    if (res.status = 200 && res.data.success === 'success') {
                        return true;
                    } else {
                        return false;
                    }
                }
                , function errorCallback(res) {
                    console.log('result = ' + JSON.stringify(res));
                    return false;
                });
    };


    return forgotService;
};
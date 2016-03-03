module.exports =  function ($window,$http,API) {
    var registerService = {};

    registerService.register = function (user) {
        var response = {
            'success':false,
            'user': {}
        };
        return $http
            .post(API.register, user)
            .then(function (res) {
                    console.log('result = ' + JSON.stringify(res));
                switch(res.status){
                    case 200:
                        if(typeof res.data.success!=='undefined'){
                            response.success=true;
                            response.user.firstName=res.data.success.firstName;
                            response.user.lastName=res.data.success.lastName;
                        }else if(typeof res.data.error!='undefined'
                        && res.data.error=='duplicate_email'){
                            response.success=false;
                            response.error='duplicate_email';
                        }
                        break;
                    default:
                        response.success=false;
                        response.error = 'status ' + res.status;
                    }
                    return response;
                }
                , function errorCallback(res) {
                    response.success=false;
                    response.error = 'unknown ' + res.status;
                });
    };

    registerService.completeReg = function(email,token){
        var response = {};
        var payload = {};
        payload.token = token;
        payload.email=email;
        console.log('payload = ' + JSON.stringify(payload));
        return $http
            .post(API.completereg, payload)
            .then(function (res) {
                console.log('result = ' + JSON.stringify(res));
                if(res.status===200 && res.data.success==='success'){
                    return true;
                }else{
                    return false;
                }
    });
    };


    return registerService;
};
/**
 * Created by aengusmccullough on 2016-03-02.
 */


require('../testSetup.js');

describe('AuthService', function() {
    var $httpBackend, AuthService,API,Session,$window;np

    var loginCredentials = {
        'email': 'validemail@test.com',
        'password': 'Testing12'
    };

    var unAuthLoginCredentials = {
        'email': 'invalidemail@test.com',
        'password': 'Testing12'
    };


    var loginValidResponse = {
        token: 'validtoken',
        firstName: 'Aengus',
        lastName: 'McCullough',
        id: 123,
        userRole: 'free',
        strava: false
    };


    // Set up the module
    beforeEach(angular.mock.module('SkiAnalytics'));


    //inject dependencies
    beforeEach(angular.mock.inject(function($injector,_$window_,_AuthService_) {

        //just checking properties of window so normal object here is OK
        $window = _$window_;
        $window.sessionStorage = {};


        // Set up the mock http service
        $httpBackend = $injector.get('$httpBackend');
        API = $injector.get('API');
        Session = $injector.get('Session');
        $window = $injector.get("$window");
        AuthService = _AuthService_;
    }));


    beforeEach(function(){
        $httpBackend.whenPOST(API.login,loginCredentials).respond(200,loginValidResponse);
        $httpBackend.whenPOST(API.login,unAuthLoginCredentials).respond(function() {
            return [401, '', {}];
        });
    })

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });


    it('should send login request to the server', function() {

        $httpBackend.expectPOST(API.login,loginCredentials).respond(200, '');
        $httpBackend.expectGET('public/public_nav.html').respond(200);
        $httpBackend.expectGET('public/main.html').respond(200);
        AuthService.login(loginCredentials);
        $httpBackend.flush();
    });

    it('should save jwt token into session storage',function(){

        AuthService.login(loginCredentials);
        $httpBackend.expectPOST(API.login,loginCredentials);
        $httpBackend.expectGET('public/public_nav.html').respond(200);
        $httpBackend.expectGET('public/main.html').respond(200);
        $httpBackend.flush();
        expect($window.sessionStorage.token).toEqual(loginValidResponse.token);

    });

    it('should set the session',function(){

        AuthService.login(loginCredentials);
        $httpBackend.expectPOST(API.login,loginCredentials);
        $httpBackend.expectGET('public/public_nav.html').respond(200);
        $httpBackend.expectGET('public/main.html').respond(200);
        $httpBackend.flush();
        expect(Session.get().token).toEqual(loginValidResponse.token);

    });

    it('should return auth status',function(){

        var result = AuthService.login(loginCredentials);
        $httpBackend.expectPOST(API.login,loginCredentials);
        $httpBackend.expectGET('public/public_nav.html').respond(200);
        $httpBackend.expectGET('public/main.html').respond(200);
        $httpBackend.flush();
        result.then(function(resp) {
            expect(resp.status).toEqual('auth');
        });
    });

    it('should fail authentication',function(){

        var result = AuthService.login(unAuthLoginCredentials);
        $httpBackend.expectPOST(API.login,unAuthLoginCredentials);
        $httpBackend.expectGET('public/public_nav.html').respond(200);
        $httpBackend.expectGET('public/main.html').respond(200);
        $httpBackend.flush();
        result.then(function(resp) {
            expect(resp.status).toEqual('notauth');
        });
    });

});
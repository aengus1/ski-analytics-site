
var angular = require('angular');

var app = angular.module('SkiAnalytics', [
    require('ui-router/release/angular-ui-router'),
    require('angular-auto-validate'),
    require('angular-validation-match')

]);
require('../src/public');
require('../src/auth');
require('../src/private');

require('angular-mocks');

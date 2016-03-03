'use strict';

var angular = require('angular');

var app = angular.module('SkiAnalytics', [
    require('ui-router/release/angular-ui-router'),
    require('angular-auto-validate'),
    require('angular-validation-match')

]);
require('./style.css');
require('./public');
require('./auth');
require('./private');
(function (angular) {
  'use strict';

  // Declare app level module which depends on views, and components
  angular.module('CleverChaos', [
    'ui.router',
    'CleverChaos.seatingPlan'
  ]).

  config(['$urlRouterProvider', function($urlRouterProvider) {
    $urlRouterProvider.otherwise("/");
  }]);

})(angular);

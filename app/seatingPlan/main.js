(function (angular) {
  'use strict';

  var module = angular.module('CleverChaos.seatingPlan', [
    'ui.router'
  ]);

  module.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('state1', {
      url: '/',
      templateUrl: 'seatingPlan/view1.html',
      controller: 'View1Ctrl'
    });
  }]);

  module.controller('View1Ctrl', ['$scope', function($scope) {
    $scope.yo = false;
  }]);

})(angular);
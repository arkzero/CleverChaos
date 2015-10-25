'use strict';

describe('myApp.view1 module', function() {

  var mockServices = {
    $scope: {}
  }

  beforeEach(module('myApp.view1'));

  describe('view1 controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var view1Ctrl = $controller('View1Ctrl', mockServices);
      expect(view1Ctrl).toBeDefined();
    }));

  });
});
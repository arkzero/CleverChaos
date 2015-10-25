/**
 * Created by bryannissen on 10/25/15.
 */

var CVCS = CVCS || {};

(function (describe, CVCS, expect, beforeEach, inject) {
  'use strict';

  var service;

  describe('CleverChaos.modelHelper Module', function () {

    beforeEach(module('CleverChaos.modelHelpers'));

    beforeEach(inject(function (_Players_) {
      service = _Players_;
    }))

    describe('Players Service', function () {

      it('should exist', function () {
        expect(service).toBeDefined();
      });

    });

  });

})(describe, CVCS, expect, beforeEach, inject);
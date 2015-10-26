/**
 * Created by bryannissen on 10/25/15.
 */

var CVCS = CVCS || {};

(function (describe, CVCS, expect, beforeEach, inject) {
  'use strict';

  var service;

  describe('CleverChaos.modelHelper Module', function () {

    beforeEach(module('CleverChaos.modelHelpers'));
    beforeEach(module('CleverChaos.localStorage'));

    /**
     * Removes The ids from objects and compares them
     * @param obj1
     * @param obj2
     * @returns {*}
     */
    function testObjectEqual (obj1, obj2) {
      delete obj1._id;
      delete obj2._id;

      return angular.equals(obj1, obj2);
    }


    describe('Players Service', function () {

      var defaultPlayer,
          localStorageID,
          $timeout;

      beforeEach(inject(function (_Players_, _StorageService_, _$timeout_) {
        service = _Players_;

        defaultPlayer = new CVCS.Player();
        localStorageID = _StorageService_.getUid();
        $timeout = _$timeout_;

        localStorage.removeItem(localStorageID)
      }));


      it('should exist', function () {
        expect(service).toBeDefined();
      });

      describe ('CRUD Functions', function () {

        it('should be able to create a new default player object', function () {
          var player = service.createNew();
          expect(testObjectEqual(player, defaultPlayer)).toBeTruthy();
          expect(player instanceof CVCS.Player).toBeTruthy();
        });

        it('should be able to save a player record', function () {
          var player = service.createNew();
          player.name = "Bryan";
          service.save(player).then(function (result) {
            expect(testObjectEqual(result, player)).toBeTruthy();
          });
          var json = JSON.parse(localStorage.getItem(localStorageID));
          expect(testObjectEqual(json.players[0], player)).toBeTruthy();
          $timeout.flush();
        });

        it('should be able to get user from storage by id', function () {
          var player = service.createNew();
          player.name = 'Marty';
          service.save(player);
          service.get(player._id).then(function (result) {
            expect(testObjectEqual(player, result)).toBeTruthy();
            expect(result instanceof CVCS.Player).toBeTruthy();
          });
          $timeout.flush();
        });

        it('should be able to update an existing record', function () {
          var player = service.createNew();
          player.name = 'Marty';
          service.save(player).then(function () {
            player.name = 'Bryan';
            service.save(player).then(function (result) {
              expect(testObjectEqual(player, result)).toBeTruthy();
              expect(result instanceof CVCS.Player).toBeTruthy();
            });
          });
          $timeout.flush();
        });

        it('should be able to delete and exiting record', function () {

        });

        it('should be able to get a collection of records', function () {

        })
      });

      describe('Games Array', function () {
        // TODO: Test the Population, updating etc of the games array in the player object
      });

      describe('Computers Array', function () {
        // TODO: Test Population, updating, etc. of the computers array on the player object.
      })

    });

  });

})(describe, CVCS, expect, beforeEach, inject);
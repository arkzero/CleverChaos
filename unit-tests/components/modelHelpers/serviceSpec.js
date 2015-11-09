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

    describe('ModelHelper Service', function () {
      var defaultModel,
          localStorageID,
          $timeout,
          Model = function (model) {
            model = model || {};

            this.name = model.name || "Model Name";
          };

      beforeEach(inject(function (_ModelHelper_, _StorageService_, _$timeout_) {
        service = _ModelHelper_.generateCRUDFunctions(Model, 'collection');

        defaultModel = new Model();
        localStorageID = _StorageService_.getUid();
        $timeout = _$timeout_;

        localStorage.removeItem(localStorageID)
      }));

      it('should exist', function () {
        expect(service).toBeDefined();
      });

      describe ('CRUD Functions', function () {

        it('should be able to create a new default Model', function () {
          var model = service.createNew();
          expect(testObjectEqual(model, defaultModel)).toBeTruthy();
          expect(model instanceof Model).toBeTruthy();
        });

        it('should be able to save a Model record', function () {
          var model = service.createNew();
          model.name = "Bryan";
          service.save(model).then(function (result) {
            expect(testObjectEqual(result, model)).toBeTruthy();
          });
          var json = JSON.parse(localStorage.getItem(localStorageID));
          expect(testObjectEqual(json.collection[0], model)).toBeTruthy();
          $timeout.flush();
        });

        it('should be able to get Model from storage by id', function () {
          var model = service.createNew();
          model.name = 'Marty';
          service.save(model);
          service.get(model._id).then(function (result) {
            expect(testObjectEqual(model, result)).toBeTruthy();
            expect(result instanceof Model).toBeTruthy();
          });

          service.get('324234').then(function (result) {
            expect(result).toBeNull();
          });

          $timeout.flush();
        });

        it('should be able to update an existing Model', function () {
          var model = service.createNew();
          model.name = 'Marty';
          service.save(model).then(function () {
            model.name = 'Bryan';
            service.save(model).then(function (result) {
              expect(testObjectEqual(model, result)).toBeTruthy();
              expect(result instanceof Model).toBeTruthy();
            });
          });
          $timeout.flush();
        });

        it('should be able to delete an exiting Model', function () {
          var model = service.createNew(), id = model._id,
              model2 = service.createNew(), id2 = model2._id;

          model.name = 'Bryan';
          service.save(model).then(function () {
            service.delete(model).then(function (result) {
              expect(result).toBe('OK');
              service.get(id).then(function (result) {
                expect(result).toBeNull();
              });
            });
          });

          model.name = 'Oliver';
          service.save(model).then(function () {
            service.delete(model._id).then(function (result) {
              expect(result).toBe('OK');
              service.get(id).then(function (result) {
                expect(result).toBeNull();
              });
            });
          });

          $timeout.flush();
        });

        it('should be able to get a collection of Model', function () {
          var model = service.createNew(), model2 = service.createNew();
          model.name = 'Bryan';
          model2.name = 'Felicity';

          service.save(model);
          service.save(model2);
          service.getCollection().then(function (result) {
            expect(result.length).toBe(2);
            expect(testObjectEqual(model, result[0])).toBeTruthy();
            expect(testObjectEqual(model2, result[1])).toBeTruthy();
          });
        });
      });
    });

    describe('Players Service', function () {

      var defaultPlayer,
          localStorageID,
          $timeout;

      beforeEach(inject(function (_Players_, _StorageService_, _$timeout_) {
        service = _Players_;

        defaultPlayer = new CVCS.Player();
        localStorageID = _StorageService_.getUid();
        $timeout = _$timeout_;

        localStorage.removeItem(localStorageID);
      }));

      it('should exist', function () {
        expect(service).toBeDefined();
      });

      describe('Games Array', function () {
        // TODO: Test the Population, updating etc of the games array in the player object
      });

      describe('Computers Array', function () {
        // TODO: Test Population, updating, etc. of the computers array on the player object.
      })

    });

    describe('PlayerGames Service', function () {

      var defaultObject,
          localStorageID,
          $timeout;

      beforeEach(inject(function (_PlayerGames_, _StorageService_, _$timeout_) {
        service = _PlayerGames_;

        defaultObject = new CVCS.PlayerGame();
        localStorageID = _StorageService_.getUid();
        $timeout = _$timeout_;

        localStorage.removeItem(localStorageID)
      }));

      it('should exist', function () {
        expect(service).toBeDefined();
      });

    });

    describe('Games Service', function () {

      var defaultObject,
          localStorageID,
          $timeout;

      beforeEach(inject(function (_Games_, _StorageService_, _$timeout_) {
        service = _Games_;

        defaultObject = new CVCS.Game();
        localStorageID = _StorageService_.getUid();
        $timeout = _$timeout_;

        localStorage.removeItem(localStorageID)
      }));

      it('should exist', function () {
        expect(service).toBeDefined();
      });

    });

    describe('OrganizationGames Service', function () {
      var defaultObject,
          localStorageID,
          $timeout;

      beforeEach(inject(function (_OrganizationGames_, _StorageService_, _$timeout_) {
        service = _OrganizationGames_;

        defaultObject = new CVCS.OrganizationGame();
        localStorageID = _StorageService_.getUid();
        $timeout = _$timeout_;

        localStorage.removeItem(localStorageID)
      }));

      it('should exist', function () {
        expect(service).toBeDefined();
      });

      it ('should Create Objects successfully', function () {

      });
    });

    describe('Computers Service', function () {
      var defaultObject,
          localStorageID,
          $timeout;

      beforeEach(inject(function (_Computers_, _StorageService_, _$timeout_) {
        service = _Computers_;

        defaultObject = new CVCS.Computer();
        localStorageID = _StorageService_.getUid();
        $timeout = _$timeout_;

        localStorage.removeItem(localStorageID)
      }));

      it('should exist', function () {
        expect(service).toBeDefined();
      });
    });

    describe('Teams Service', function () {
      var defaultObject,
          localStorageID,
          $timeout;

      beforeEach(inject(function (_Teams_, _StorageService_, _$timeout_) {
        service = _Teams_;

        defaultObject = new CVCS.Team();
        localStorageID = _StorageService_.getUid();
        $timeout = _$timeout_;

        localStorage.removeItem(localStorageID)
      }));

      it('should exist', function () {
        expect(service).toBeDefined();
      });

      describe('Populate Team with Players', function () {
        // TODO: Implemet Unit Tests
      });
    });

  });

})(describe, CVCS, expect, beforeEach, inject);
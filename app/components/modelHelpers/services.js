/**
 * Created by bryannissen on 10/25/15.
 */

var CVCS = CVCS || {};

(function (angular, CVCS) {
  'use strict';

  var module = angular.module('CleverChaos.modelHelpers', ['CleverChaos.localStorage']);

  // TODO: Break out into another generic plugic model with Storage Service
  module.factory('ModelHelper', ['StorageService', '$q', function (StorageService, $q) {

    return {

      /**
       * Generates a set of a CRUD based funcitons for a collection type.
       * CRUD is currently done with LocalStorage
       *
       * @param Model - Model of collection
       * @param collection [String] - Key for collection in localStorage
       * @returns {{}}
       */
      generateCRUDFunctions: function (Model, collection) {
        var crudObject = {};

        /**
         * Creates a new Model Provided to helper
         * @returns {*}
         */
        crudObject.createNew = function () {
          return new Model();
        };

        /**
         * Gets a provided Model by id from stored collection.
         * @param id
         * @returns {Promis} -> {Model}
         */
        crudObject.get = function (id) {
          var deferred = $q.defer(),
              item;

          // Gets provided Model from localStorage and makes it a provided Model
          item = StorageService.getDataItem(id, collection);
          if (item) {
            item = new Model(item);
          } else {
            item = null;
          }

          // Resolve and return promise.  Future proofing for when API is in place.
          deferred.resolve(item);
          return deferred.promise;
        };

        /**
         * Saves a Provided Model, currently to localStorage, eventually to a backend
         * @param player - Model to save
         * @returns {Promise} -> {Model}
         */
        crudObject.save = function (item) {
          var deferred = $q.defer();

          // Save Player to LocalStorage
          StorageService.setDataItem(item, collection);

          // Resolve and return promise.  Future proofing for when API is in place.
          deferred.resolve(item);
          return deferred.promise;
        };

        /**
         * Deletes a player object from Database
         * @param item - Model Object or ID to delete
         * @returns {Promise} -> {String}
         */
        crudObject.delete = function (item) {
          var deferred = $q.defer(), itemId;

          // Grab ID from player object, or just use passed in ID
          if (angular.isObject(item) && item._id) {
            itemId = item._id;
          } else if (typeof player === 'string') {
            itemId = item;
          } else {
            itemId = null;
          }

          if (itemId) {
            // Remove record from localStorage
            StorageService.removeDataItem(item._id, collection);
            deferred.resolve('OK');
          } else { // Return error if nothing was passed in.
            deferred.reject('No Object Given');
          }

          // Resolve and return promise
          return deferred.promise;
        },

        /**
         * Gets a collection of models
         */
        crudObject.getCollection = function () {
          var deferred = $q.defer(), collectionArr;

          collectionArr  = StorageService.getDataCollection(collection);

          _.each(collectionArr, function (item) {
            item = new Model(item);
          });

          deferred.resolve(collectionArr);

          // Resolve and return promise
          return deferred.promise;
        };

        return crudObject;
      }
    };
  }]);

  module.factory('Players', ['StorageService', '$q', 'ModelHelper', function (StorageService, $q, ModelHelper) {
    var crud = ModelHelper.generateCRUDFunctions(CVCS.Player, 'players'),
        service;

    service = angular.extend({}, crud, {});
    return service;
  }]);

  module.factory('PlayerGames', ['StorageService', '$q', 'ModelHelper', function (StorageService, $q, ModelHelper) {
    var crud = ModelHelper.generateCRUDFunctions(CVCS.PlayerGame, 'playerGames'),
        service;

    service = angular.extend({}, crud, {});
    return service;
  }]);

  module.factory('Games', ['StorageService', '$q', 'ModelHelper', function (StorageService, $q, ModelHelper) {
    var crud = ModelHelper.generateCRUDFunctions(CVCS.Game, 'games'),
        service;

    service = angular.extend({}, crud, {});
    return service;
  }]);

  module.factory('OrganizationGames', ['StorageService', '$q', 'ModelHelper', function (StorageService, $q, ModelHelper) {
    var crud = ModelHelper.generateCRUDFunctions(CVCS.OrganizationGame, 'organizationGames'),
        service;

    service = angular.extend({}, crud, {});
    return service;
  }]);

  module.factory('Computers', ['StorageService', '$q', 'ModelHelper', function (StorageService, $q, ModelHelper) {
    var crud = ModelHelper.generateCRUDFunctions(CVCS.Computer, 'computers'),
        service;

    service = angular.extend({}, crud, {});
    return service;
  }]);

  module.factory('Teams', ['StorageService', '$q', 'ModelHelper', function (StorageService, $q, ModelHelper) {
    var crud = ModelHelper.generateCRUDFunctions(CVCS.Team, 'teams'),
        service;

    service = angular.extend({}, crud, {});
    return service;
  }]);

})(angular, CVCS);
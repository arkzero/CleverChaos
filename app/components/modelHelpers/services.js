/**
 * Created by bryannissen on 10/25/15.
 */

var CVCS = CVCS || {};

(function (angular, CVCS) {
  'use strict';

  var module = angular.module('CleverChaos.modelHelpers', ['CleverChaos.localStorage']);

  module.factory('Players', ['StorageService', '$q', function (StorageService, $q) {

    return {

      /**
       * Creates a new Player object
       * @returns {CVCS.Player}
       */
      createNew: function () {
        return new CVCS.Player();
      },

      /**
       * Gets a player object by ID. Currently from Local Storage, eventually from backend
       * @param id
       * @returns {Promise} -> {CVCS.Player
       */
      get: function (id) {
        var deferred = $q.defer(),
            player;

        // Gets Player object from localStorage and makes it a Player Object
        player = StorageService.getDataItem(id, 'players');
        player = new CVCS.Player(player);

        // Resolve and return promise.  Future proofing for when API is in place.
        deferred.resolve(player);
        return deferred.promise;
      },

      /**
       * Saves a Player Object, currently to localStorage, eventually to a backend
       * @param player - Player to save
       * @returns {Promise} -> {CVCS.Player}
       */
      save: function (player) {
        var deferred = $q.defer();

        // Save Player to LocalStorage
        StorageService.setDataItem(player, 'players');

        // Resolve and return promise.  Future proofing for when API is in place.
        deferred.resolve(player);
        return deferred.promise;
      },

      delete: function (player) {
        var deferred = $q.defer();

        
      }

    }
  }]);

})(angular, CVCS);
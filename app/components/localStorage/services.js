/**
 * Created by bryannissen on 10/25/15.
 */
var CVCS = CVCS || {};

(function (angular, CVCS, localStorage) {
  'use strict';

  var module = angular.module('CleverChaos.localStorage', []);

  module.factory('StorageService', [function () {
    var uid = '01234',         // TODO: Implement Unique UID's for users and/or configurations
        hasLocalStorage = false;

    /**
     * Generates a container for the data for this User/Configuration
     */
    function generateDataContainer () {
      return {
        players: [],
        playerGames: [],
        games: [],
        computers: [],
        teams: []
      };
    }

    /**
     * Helper Function to Determine if the User's Browser contains LocalStorage
     *
     * @returns {boolean}
     */
    function testLocalStorage () {
      var test = 'test';

      // Tests if an item can be added and removed to localStorage successfully.
      try {
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
      } catch(e) {
        return false;
      }
    }

    hasLocalStorage = testLocalStorage();

    return {

      /**
       * Returns the UID of Users/Configuration that the Service will save under
       *
       * @returns {string}
       */
      getUid: function () {
        return uid;
      },

      /**
       * Sets the UID for the User/Configuration for saving
       *
       * @param _uid
       */
      setUid: function (_uid) {
        uid = _uid;
      },

      /**
       * Gets a Collection storred in localStrage based on provided type
       *
       * @param dataType - Type of collection to return
       *
       * @returns {*} - Collection of Object Types returned or null if they're not found
       */
      getDataCollection: function (dataType) {
        var userData;

        if (hasLocalStorage) {
          try { // Gets Data for a user, for only returns the specified collection.
            userData = localStorage.getItem(uid);
            userData = userData ? JSON.parse(userData)[dataType] : [];
            return userData;
          } catch (e) { // If anything is not found, return null
            console.error(e);
            return null;
          }
        }
      },

      /**
       * Saved a predefined Data Collection to LocalStorage
       *
       * @param dataType - Key of collection array
       * @param collection - Array to save.
       */
      setDataCollection: function (dataType, collection) {
        var userData;

        if (hasLocalStorage) {
          // Tries to retireve the User's data from localStorage
          userData = localStorage.getItem(uid);

          if (!userData)  { // Creates Saved Data container if one isn't already made
            userData = generateDataContainer();
          } else {
            userData = JSON.parse(userData);
          }

          // Updates the collections and saved it to local Storage
          userData[dataType] = collection;
          userData = JSON.stringify(userData);
          localStorage.setItem(uid, userData);
        }
      },

      /**
       * Gets an item by Id from LocalStorage
       *
       * @param id - Id of the Item to retrieve
       * @param dataType - Type of collection to retrieve
       *
       * @returns {*}
       */
      getDataItem: function (id, dataType) {
        var collection;

        if (hasLocalStorage) {

          // Get the collection from localStorage
          collection = this.getDataCollection(dataType);

          // Return the item from the collection if it's available
          if (collection) {
            return _.find(collection, {_id: id});
          } else {
            return null;
          }
        }
      },

      /**
       * Saves a specific item to it's proper collection in localStorage
       * @param item
       * @param dataType
       */
      setDataItem: function (item, dataType) {
        var collection, index;
        item._id = item._id || CVCS.generateGUID();

        if (hasLocalStorage) {

          // get the Collection from Local Storage
          collection = this.getDataCollection(dataType);

          // Update the existing record, or add a new one to the collection, then save it local storage
          if (collection) {
            // Get Index for existing objcet, or push new object to end.
            index = _.findIndex(collection, {_id: item._id});
            index = (index >= 0) ? index : collection.length;

            // Save Changes to Local Storage
            collection[index] = item;
            this.setDataCollection(dataType, collection);
          }
        }
      }
    }
  }]);

})(angular, CVCS, localStorage);
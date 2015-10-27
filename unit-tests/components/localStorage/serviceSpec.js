/**
 * Created by bryannissen on 10/25/15.
 */
var CVCS = CVCS || {};

(function (describe, CVCS, expect, beforeEach, inject) {
  'use strict';

  var service;

  describe('CleverChaos.localStorage Module', function () {

    beforeEach(module('CleverChaos.localStorage'));

    beforeEach(inject(function (_StorageService_) {
      service = _StorageService_;

      service.setUid('karmatests');
      localStorage.removeItem('karmatests');
    }))

    describe('StorageService', function () {

      it('should exist', function () {
        expect(service).toBeDefined();
      });

      it('should have a UserId for saving at Initialization', function () {
        expect(service.getUid()).toBe('karmatests');
      });

      it('should be able to set a UserId', function () {
        service.setUid('9876');
        expect(service.getUid()).toBe('9876');
      });

      it ('should be able to save and retrieve a collection of data to localStorage', function () {
        var player = {name: 'Player 1'};
        expect(service.getDataCollection('players').length).toBe(0);
        service.setDataCollection('players', [player]);
        var playerCollection = service.getDataCollection('players');
        expect(playerCollection.length).toBe(1);
        expect(angular.equals(playerCollection[0], player)).toBeTruthy();
      });

      it ('should be able to reset a collection of data in localStorage', function () {
        var player = {name: 'Player 1'};
        service.setDataCollection('players', [player]);
        var playerCollection = service.getDataCollection('players');
        expect(playerCollection.length).toBe(1);
        service.resetDataCollection('players');
        playerCollection = service.getDataCollection('players');
        expect(playerCollection.length).toBe(0);
      });

      it('should be able to remove all of a user\'s data from localStorage', function () {
        var player = {name: 'Player 1'};
        service.setDataCollection('players', [player]);
        service.removeAllData();
        expect(JSON.parse(localStorage.getItem('karmatests'))).toBeNull();
      });

      it ('should be able to save and retrieve single items from localStorage', function () {
        var player = {_id: '012', name: 'Bryan'};
        service.setDataItem(player, 'players');
        var savedPlayer = service.getDataItem('012', 'players');
        expect(angular.equals(savedPlayer, player)).toBeTruthy();
        player.name = 'Player 1';
        service.setDataItem(player, 'players');
        expect(service.getDataCollection('players').length).toBe(1);
        savedPlayer = service.getDataItem('012', 'players');
        expect(angular.equals(savedPlayer, player)).toBeTruthy();
      });

      it('should be able to remove an item from localStorage', function () {
        var player = {_id: '012', name: 'Jimmy'};
        service.setDataItem(player, 'players');
        expect(JSON.parse(localStorage.getItem('karmatests')).players.length).toBe(1);
        expect(JSON.parse(localStorage.getItem('karmatests')).players[0].name).toBe('Jimmy');
        service.removeDataItem(player._id, 'players');
        expect(JSON.parse(localStorage.getItem('karmatests')).players.length).toBe(0);
      })

    });

  });

})(describe, CVCS, expect, beforeEach, inject);
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

    });

  });

})(describe, CVCS, expect, beforeEach, inject);
(function () {
  'use strict';

  angular
    .module('poker')
    .factory('PokerService', PokerService);

  /* @ngInject */
  PokerService.$inject = ['$q', 'ApiFactory', 'ENDPOINTS'];

  function PokerService($q, ApiFactory, ENDPOINTS) {

    var poker = {
      action: action,
      getHand: getHand,
      join: join,
      status: status
    };
    return poker;

    function action(action, amount) {

      var deferred = $q.defer();

      var success = function(response) {
        deferred.resolve(response);
      };

      var error = function(response) {
        deferred.reject(response.data);
      };

      var Action = new ApiFactory(ENDPOINTS.action);
      Action.save({
        action: action,
        amount: amount
      }, success, error);

      return deferred.promise;
    }

    function getHand(hand) {

      var deferred = $q.defer();

      var success = function(response) {
        deferred.resolve(response);
      };

      var error = function(response) {
        deferred.reject(response.data);
      };

      var fullHand = hand.card1 +  '|' +
        hand.card2 +  '|' +
        hand.card3 +  '|' +
        hand.card4 +  '|' +
        hand.card5;

      var PokerHand = new ApiFactory(ENDPOINTS.hand, {
        h: fullHand
      });
      PokerHand.get(success, error);

      return deferred.promise;
    }

    function join(name, table) {

      var deferred = $q.defer();

      var success = function(response) {
        deferred.resolve(response);
      };

      var error = function(response) {
        deferred.reject(response.data);
      };

      var PokerJoin = new ApiFactory(ENDPOINTS.join);
      PokerJoin.save({
        name: name,
        game_guid: table
      }, success, error);

      return deferred.promise;
    }

    function status() {

      var deferred = $q.defer();

      var success = function(response) {

        if (response.community.length < 5) {
          for (var i = 0; i < (5 - response.community.length); i++) {
            response.community.push('back');
          }
        }

        deferred.resolve(response);
      };

      var error = function(response) {
        deferred.reject(response.data);
      };

      var Status = new ApiFactory(ENDPOINTS.status);
      Status.get(success, error);

      return deferred.promise;
    }

  }

})();

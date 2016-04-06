(function () {
  'use strict';

  angular
    .module('poker')
    .factory('PokerService', PokerService);

  /* @ngInject */
  PokerService.$inject = ['$q', 'ApiFactory', 'ENDPOINTS'];

  function PokerService($q, ApiFactory, ENDPOINTS) {

    var poker = {
      getHand: getHand
    };
    return poker;

    function getHand(hand) {

      var deferred = $q.defer();

      var success = function(response) {
        deferred.resolve(response);
      };

      var error = function(response) {
        deferred.reject(response.data);
      };

      var PokerHand = new ApiFactory(ENDPOINTS.hand, {
        h: hand
      });
      PokerHand.get(success, error);

      return deferred.promise;
    }

  }

})();

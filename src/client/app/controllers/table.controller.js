(function () {
  'use strict';

  angular
    .module('poker')
    .controller('TableController', TableController);

  /* @ngInject */
  TableController.$inject = ['toastr', '$window', 'PokerService'];

  function TableController(toastr, $window, PokerService) {
    var vm = this;
    vm.getStatus = getStatus;
    vm.user = {guid: $window.localStorage.user_guid, name: $window.localStorage.name}

    function getStatus() {

      var success = function(response) {
        vm.pocket = response.pocket;
        vm.status = response.status;
        vm.activePlayer = response.active_player;
        vm.actions = response.available_actions;
        vm.community = response.community;
        vm.players = response.players;
        vm.prevAction = response.prev_action;
        vm.potValue = response.pot_value;
        vm.playerStake = response.player_stake;
      };

      var failure = function(response) {
        toastr.error(response, 'Error');
      };

      PokerService.getStatus().then(success, failure);
    };

  function makeBet(amount) {
    var success = function(response) {
      vm.betStatus = response;
    };

    var failure = function(response) {
      toastr.error(response, 'Error');
    };

    PokerService.action('bet', amount).then(success, failure);
  };

  }

})();

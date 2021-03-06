(function () {
  'use strict';

  angular
    .module('poker')
    .controller('TableController', TableController);

  /* @ngInject */
  TableController.$inject = ['toastr', '$window', 'PokerService'];

  function TableController(toastr, $window, PokerService) {
    var vm = this;
    vm.status = status;
    vm.fold = fold;
    vm.call = call;

    vm.user = {guid: $window.localStorage.user_guid, name: $window.localStorage.name};

    vm.status();

    function status() {

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
        vm.name = $window.localStorage.name;
      };

      var failure = function(response) {
        toastr.error(response, 'Error');
      };

      PokerService.status().then(success, failure);
    }

    function fold(amount) {
      var success = function(response) {
        vm.betStatus = response;
      };

      var failure = function(response) {
        toastr.error(response, 'Error');
      };

      PokerService.action('fold', amount).then(success, failure);
    }

    function call(amount) {
      var success = function(response) {
        vm.betStatus = response;
      };

      var failure = function(response) {
        toastr.error(response, 'Error');
      };

      PokerService.action('call', amount).then(success, failure);
    }

  }

})();

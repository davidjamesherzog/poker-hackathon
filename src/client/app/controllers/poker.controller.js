(function () {
  'use strict';

  angular
    .module('poker')
    .controller('PokerController', PokerController);

  /* @ngInject */
  PokerController.$inject = ['toastr', 'PokerService'];

  function PokerController(toastr, PokerService) {
    var vm = this;
    vm.getHand = getHand;

    vm.hand = '';

    function getHand(hand) {

      var success = function(response) {
        console.log(response.Name);
        vm.name = response.Name;
      };

      var failure = function(response) {
        toastr.error(response, 'Error');
      };

      PokerService.getHand(hand).then(success, failure);
    }
  }

})();

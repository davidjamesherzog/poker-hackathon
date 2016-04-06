(function () {
  'use strict';

  angular
    .module('poker')
    .controller('JoinController', JoinController);

  /* @ngInject */
  JoinController.$inject = ['toastr', 'PokerService'];

  function JoinController(toastr, PokerService) {
    var vm = this;
    vm.getJoinInfo = getJoinInfo;

    function getJoinInfo(joinInfo) {

      var success = function(response) {
        console.log([response.user_guid, reponse.game_guid]);
        vm.user = response.player;
        vm.game = response.game_guid;
      };

      var failure = function(response) {
        toastr.error(response, 'Error');
      };

      PokerService.join(joinInfo.name, joinInfo.table).then(success, failure);
    }

  }

})();

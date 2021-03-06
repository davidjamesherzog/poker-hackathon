(function () {
  'use strict';

  angular
    .module('poker')
    .controller('JoinController', JoinController);

  /* @ngInject */
  JoinController.$inject = ['toastr', '$location', '$window', 'PokerService'];

  function JoinController(toastr, $location, $window, PokerService) {
    var vm = this;
    vm.getJoinInfo = getJoinInfo;

    function getJoinInfo(joinInfo) {

      var success = function(response) {
        console.log([response.player_guid, response.game_guid]);
        vm.user = response.player_guid;
        vm.game = response.game_guid;
        vm.name = joinInfo.name;
        $window.localStorage.player_guid = response.player_guid;
        $window.localStorage.game_guid = response.game_guid;
        $window.localStorage.name = joinInfo.name;

        $location.url('/table');
      };

      var failure = function(response) {
        toastr.error(response, 'Error');
      };

      PokerService.join(joinInfo.name, joinInfo.table).then(success, failure);
    }

  }

})();

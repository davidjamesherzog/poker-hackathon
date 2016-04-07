(function () {

  angular
    .module('poker')
    .constant('ENDPOINTS', {

      action: {
        endpoint: '/user/action/'
      },

      hand: {
        endpoint: '/hand/score'
      },

      join: {
        endpoint: '/join/'
      },

      status: {
        endpoint: '/game/status/'
      }

    });

})();

(function () {

  angular
    .module('poker')
    .constant('ENDPOINTS', {

      action: {
        endpoint: '/action'
      },

      hand: {
        endpoint: '/hand/score'
      },

      join: {
        endpoint: '/join'
      },

      status: {
        endpoint: '/status'
      }

    });

})();

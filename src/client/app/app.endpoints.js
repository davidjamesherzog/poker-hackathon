(function () {

  angular
    .module('poker')
    .constant('ENDPOINTS', {

      episode: {
        endpoint: '/api/5/series/:id/episodes/:episode/'
      },

      hand: {
        endpoint: '/hand/score'
      },

      join: {
        endpoint: '/join'
      }


    });

})();

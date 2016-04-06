(function () {

  angular
    .module('contactsApp')
    .constant('ENDPOINTS', {

      videoAssetEpisode: {
        endpoint: '/api/5/series/:id/episodes/:episode/'
      }

    });

})();

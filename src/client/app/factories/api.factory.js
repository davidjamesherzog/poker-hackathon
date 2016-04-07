(function () {
  'use strict';

  angular
    .module('poker')
    .factory('ApiFactory', ApiFactory);

  ApiFactory.$inject = ['$resource', '$window'];

  /* @ngInject */
  function ApiFactory($resource, $window) {

    var Api = function (api, config) {

      var applicationUrl = 'http://www.pokerbrain.net:8000';

      // make sure we have a config object to work with for all requests
      config = config || {};
      config.game_guid = $window.localStorage.game_guid;
      config.player_guid = $window.localStorage.player_guid;

      if (api.actions) {
        return $resource(applicationUrl + api.endpoint, config, api.actions);
      } else {
        return $resource(applicationUrl + api.endpoint, config);
      }

    };

    return Api;

  }

})();

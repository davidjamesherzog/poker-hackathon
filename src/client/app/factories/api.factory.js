(function () {
  'use strict';

  angular
    .module('poker')
    .factory('ApiFactory', ApiFactory);

  ApiFactory.$inject = ['$resource'];

  /* @ngInject */
  function ApiFactory($resource) {

    var Api = function (api, config) {

      var applicationUrl = 'http://www.pokerbrain.net:88';

      // make sure we have a config object to work with for all requests
      config = config || {};
      config.cs = 'gvgSW3Ga3HMambud';
      config.dfs = '';

      if (api.actions) {
        return $resource(applicationUrl + api.endpoint, config, api.actions);
      } else {
        return $resource(applicationUrl + api.endpoint, config);
      }

    };

    return Api;

  }

})();

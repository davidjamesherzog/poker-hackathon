(function () {
  'use strict';

  angular
    .module('contactsApp')
    .factory('ApiFactory', ApiFactory);

  ApiFactory.$inject = ['$resource', 'video'];

  /* @ngInject */
  function ApiFactory($resource, video) {

    var Api = function (api, config) {

      var applicationUrl = video.appSettings.applicationUrl;

      // make sure we have a config object to work with for all requests
      config = config || {};

      if (api.actions) {
        return $resource(applicationUrl + api.endpoint, config, api.actions);
      } else {
        return $resource(applicationUrl + api.endpoint, config);
      }

    };

    return Api;

  }

})();

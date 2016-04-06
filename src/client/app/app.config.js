(function () {
  'use strict';

  angular
    .module('contactsApp')
    .config(config);

  config.$inject = ['$stateProvider', '$urlRouterProvider'];
  function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('contacts', {
        url: '/',
        templateUrl: 'app/layout/contacts.html',
        controller: 'ContactsController',
        controllerAs: 'vm'
      })

      .state('details', {
        url: '/details/:name',
        templateUrl: 'app/layout/contact.details.html',
        controller: 'ContactsDetailController',
        controllerAs: 'vm'
      });
  }

})();

(function () {
  'use strict';

  angular
    .module('poker')
    .config(config);

  config.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];
  function config($locationProvider, $stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      /*.state('contacts', {
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
      })*/

      .state('hands', {
        url: '/hands',
        templateUrl: 'app/layout/poker.html',
        controller: 'PokerController',
        controllerAs: 'vm'
      })

      .state('join', {
        url: '/',
        templateUrl: 'app/layout/join.html',
        controller: 'JoinController',
        controllerAs: 'vm'
      })

      .state('table', {
        url: '/table',
        templateUrl: 'app/layout/table.html',
        controller: 'TableController',
        controllerAs: 'vm'
      });

    $locationProvider.html5Mode(true);
  }

})();

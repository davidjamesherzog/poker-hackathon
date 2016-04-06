(function () {
  'use strict';

  angular
    .module('poker')
    .controller('ContactsDetailController', ContactsDetailController);

  /* @ngInject */
  ContactsDetailController.$inject = ['$stateParams', 'contactsService'];

  function ContactsDetailController($stateParams, contactsService) {
    var vm = this;
    vm.find = find;

    vm.find($stateParams.name);
    //console.log("Params:" + $stateParams.name);

    function find(name) {
      vm.contact = contactsService.find(name);
    }

  }

})();

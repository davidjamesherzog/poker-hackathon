(function () {
    'use strict';

    angular
        .module('contactsApp')
        .controller('ContactsController', ContactsController);

    /* @ngInject */
    ContactsController.$inject = ['toastr', 'contactsService'];

    function ContactsController(toastr, contactsService) {
        var vm = this;
        vm.list = list;
        vm.create = create;

        vm.contacts = [];

        vm.list();

        function list() {
            vm.contacts = contactsService.list();
        }

        function create(contact) {
            contactsService.create(contact);
            list();
            toastr.success('Created Contact - ' + contact.name, 'Success');
        }

    }

})();

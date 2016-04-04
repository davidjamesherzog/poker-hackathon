(function () {
    'use strict';

    angular
        .module('contactsApp')
        .factory('contactsService', contactsService);

    /* @ngInject */

    function contactsService() {

        var contacts = {
            list: list,
            find: find,
            create: create
        };
        return contacts;

        function list() {

            var contacts = [];

            for (var i = 0; i < localStorage.length; i++) {
                var contact = {};
                contact.name = localStorage.key(i);
                contact.phone = localStorage[contact.name];
                contacts.push(contact);
            }

            return contacts;

        }

        function find(name) {

            var contact = {};

            contact.name = name;
            contact.phone = localStorage[name];

            return contact;

        }

        function create(contact) {

            console.log('Name: ' + contact.name);
            console.log('Phone: ' + contact.phone);

            localStorage[contact.name] = contact.phone;

        }

    }

})();

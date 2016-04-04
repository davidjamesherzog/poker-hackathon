/* jshint -W079 */
var mockData = (function() {
    return {
        getMockContacts: getMockContacts,
        getMockContactsAfterCreate: getMockContactsAfterCreate
    };

    function getMockContacts() {
        return [
            {name: 'Dave', phone: '555-555-5555'},
            {name: 'Mandy', phone: '555-555-5555'}
        ];
    }

    function getMockContactsAfterCreate() {
        return [
            {name: 'Dave', phone: '555-555-5555'},
            {name: 'Mandy', phone: '555-555-5555'},
            {name: 'Landon', phone: '555-555-5555'}
        ];
    }
})();

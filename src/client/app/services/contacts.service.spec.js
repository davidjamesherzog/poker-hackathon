/* jshint -W117, -W030 */
describe('Contacts Service', function() {

    beforeEach(function() {
        bard.appModule('contactsApp');
        bard.inject('contactsService');
        localStorage.clear();
        localStorage['Dave'] = '555-555-5555';
        localStorage['Bob'] = '555-555-5555';
    });

    it('exists', function() {
        expect(contactsService).to.exist;
    });

    it('list returns a value', function() {
        testContactList();
    });

    it('find returns a value', function() {
        testFindContact('Dave');
    });

    it('create adds to the list', function() {
        var contact = {name: 'Jim', phone: '555-555-5555'};
        contactsService.create(contact);
        testContactList();
        console.log('Length after create: ' + localStorage.length);
        testFindContact(contact.name);
    });

    function testContactList() {
        var contacts = contactsService.list();
        expect(contacts).to.have.length(localStorage.length);
    }

    function testFindContact(name) {
        var contact = contactsService.find(name);
        expect(contact.name).to.be.equal(name);
        expect(contact.phone).to.be.equal(localStorage[name]);
    }

});

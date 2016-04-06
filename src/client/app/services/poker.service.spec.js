/* jshint -W117, -W030 */
describe('Poker Service', function () {

  beforeEach(function () {
    bard.appModule('poker');
    bard.inject('PokerService');
  });

  it('exists', function () {
    expect(PokerService).to.exist;
  });

});

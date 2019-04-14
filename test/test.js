const l = require('../src/tiglav.js');

describe('TESTS', () => {
  test('Instance test', (done) => {
      
      var test = new l.Tiglav();
      expect(test).toBeInstanceOf(typeof(Tiglav));
      done();
  });
});

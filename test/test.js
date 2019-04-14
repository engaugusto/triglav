const lib = require('../src/tiglav');

describe('TESTS', () => {
  test('Basic test', (done) => {
    lib.hello().then((message) => {
      expect(message).toBe('It works!');
      done();
    });
  });
});

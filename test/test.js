const { Raphael } = require('Raphael');
const Tiglav = require('../src/Tiglav.js');

describe('TESTS', () => {
  test('Instance test', (done) => {
    let test = new Tiglav('', 0, 0, null, null, null);
    expect(test).not.toBeNull();
    done();
  });
  test('UUID test', (done) => {
    let test = Tiglav.generateUUID();
    expect(test).not.toBeNull();
    done();
  });
});

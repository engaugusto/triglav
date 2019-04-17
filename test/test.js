const { Raphael } = require('raphael');
const Tiglav = require('../src/Tiglav.js');

describe('TESTS', () => {
  test('Instance test', (done) => {
    let test = new Triglav('', 0, 0, null, null, null);
    expect(test).not.toBeNull();
    done();
  });
  test('UUID test', (done) => {
    let test = Triglav.generateUUID();
    expect(test).not.toBeNull();
    done();
  });
});

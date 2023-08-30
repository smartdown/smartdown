import smartdown from '../../src';

const assert = require('assert');

const postConfigureTimeout = 3000;

/* global describe */
/* global it */
/* global afterEach */

// console.log('b.configure window.smartdown', window.smartdown);
// console.log('b.configure global.smartdown', global.smartdown);
// console.log('b.configure smartdown', smartdown);

describe('b.configure', function() {
  this.slow(1500);
  this.timeout(5000); // Default is 2000ms. Must be larger than postConfigureTimeout

  describe('smartdown.version()', function() {
    it('should return "1.0.66"', function(done) {
      assert.equal(smartdown.version, '1.0.66');
      done();
    });
  });

  describe('smartdown.axios', function() {
    it('should have smartdown.axios as an function"', function(done) {
      assert(typeof smartdown.axios === 'function');
      done();
    });
  });

  describe('smartdown.configure', function() {
    // This afterEach() delay appears to necessary when:
    //  - Running smartdown.configure() in a mocha (nodejs) environment
    // There appears to be some bug where if a subsequent smartdown.configure()
    // is called without waiting for the timeout (postConfigureTimeout), that
    // subsequent .configure() will fail.
    // This is definitely a bug, and perhaps a smartdown.cleanup() function
    // should be added to enforce a proper shutdown, in which case the below hack
    // would not be necessary.
    // This bug may occur in a browser environment, but typically .configure() is
    // only called once per page.
    //
    afterEach(function(done) {
      setTimeout(function() {
        done();
      }, postConfigureTimeout);
    });

    it('should call completion callback', function(done) {
      const options = {
        // baseURL: 'https://localhost:4000/'
      };
      smartdown.configure(options, function() {
        assert.equal(1, 1);
        done();
      });
    });

    it('should be callable more than once', function(done) {
      const options = {
        // baseURL: 'https://localhost:4000/'
      };
      smartdown.configure(options, function() {
        console.log('smartdown.configure() #2 completed');
        assert.equal(1, 1);
        done();
      });
    });
  });
});

import smartdown from '../../src';
var assert = require('assert');
const preTestTimeout = 2000;

/* global describe */
/* global it */
/* global beforeEach */
/* global afterEach */
/* global window */
/* global document */
/* global test */

describe('b.configure', function() {
  beforeEach(function(done) {
    setTimeout(function() {
      done();
    }, preTestTimeout);
  });

  afterEach(function(done) {
    setTimeout(function() {
      done();
    }, preTestTimeout);
  });

  describe('smartdown.version()', function() {
    it('should return "1.0.59"', function() {
      assert.equal(smartdown.version, '1.0.59');
    });
  });

  describe('smartdown.axios', function() {
    it('should have smartdown.axios as an function"', function() {
      assert(typeof smartdown.axios === 'function');
    });
  });

  describe('smartdown.configure', function() {
    it('should call completion callback', function(done) {
      const options = {
        baseURL: 'https://localhost:4000/'
      };
      smartdown.configure(options, function() {
        console.log('smartdown.configure() #1 completed', typeof MathJax, typeof window.MathJax);
        done();
      });
    });

    it('should be callable more than once', function(done) {
      console.log('callable more than ', typeof MathJax, typeof window.MathJax);
      const options = {
        baseURL: 'https://localhost:4000/'
      };
      smartdown.configure(options, function() {
        console.log('smartdown.configure() #2 completed');
        done();
      });
    });
  });
});

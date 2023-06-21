var assert = require('assert');

/* global describe */
/* global it */

describe('a.javascript', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1, 2, 3].indexOf(4));
    });
  });

  describe('#length', function() {
    it('should return the length of the array', function() {
      assert.equal(4, [1, 2, 3, 4].length);
    });
  });
});

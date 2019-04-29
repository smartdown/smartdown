import smartdown from '../../src';
var assert = require('assert');
const preTestTimeout = 2000;

/* global describe */
/* global it */
/* global before */
/* global after */
/* global window */
/* global document */
/* global test */

describe('c.basic', function() {
  before(function(done) {
    const options = {
      baseURL: 'https://localhost:4000/'
    };
    smartdown.configure(options, function() {
      done();
    });
  });

  after(function(done) {
    setTimeout(function() {
      done();
    }, preTestTimeout);
  });

  it('should render styled text1', function(done) {
    const md = 'This is **bold**.';
    const outputDiv = document.createElement('div');
    // done();
    smartdown.setSmartdown(md, outputDiv, function() {
      console.log('setSmartdown completed', outputDiv.innerHTML);
      assert.equal('<p class="smartdown_p">This is <strong>bold</strong>.</p>', outputDiv.innerHTML);
      done();
    });
  });


  it('should render Math', function(done) {
    const md = 'Einstein said: $E = mc^2$, and was perhaps correct.';
    const outputDiv = document.createElement('div');
    smartdown.setSmartdown(md, outputDiv, function() {
      const expected = '<script type="math/tex" id="MathJax-Element-1">E = mc^2</script>';
      // console.log('setSmartdown math completed', outputDiv.innerHTML.indexOf(expected) >= 0, outputDiv.innerHTML);
      assert(outputDiv.innerHTML.indexOf(expected) >= 0);
      // assert.equal(true, true);
      done();
    });
  });


  it('should render Math again', function(done) {
    const md = 'Newton said: $$F = ma$$';
    const outputDiv = document.createElement('div');
    smartdown.setSmartdown(md, outputDiv, function() {
      const expected = '<script type="math/tex; mode=display" id="MathJax-Element-2">F = ma</script>';
      // console.log('setSmartdown math completed', outputDiv.innerHTML.indexOf(expected) >= 0, outputDiv.innerHTML);
      assert(outputDiv.innerHTML.indexOf(expected) >= 0);
      // assert.equal(true, true);
      done();
    });
  });


});

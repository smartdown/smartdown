import smartdown from '../../src';
var assert = require('assert');
const postConfigureTimeout = 3000; // Don't make this larger than 2000 without

/* global describe */
/* global it */
/* global before */
/* global after */
/* xglobal window */
/* xglobal document */
/* xglobal test */

describe('c.basic', function() {
  this.slow('400ms');
  this.timeout(5000); // Default is 2000ms. Must be larger than postConfigureTimeout

  before(function(done) {
    const options = {
      // baseURL: 'https://localhost:4000/'
    };
    smartdown.configure(options, function() {
      done();
    });
  });

  // This after() delay appears to necessary when:
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
  after(function(done) {
    setTimeout(function() {
      done();
    }, postConfigureTimeout);
  });

  it('should render styled text1', function(done) {
    const md = 'This is **bold**.';
    const outputDiv = document.createElement('div');
    smartdown.setSmartdown(md, outputDiv, function() {
      assert.equal('<p class="smartdown_p">This is <strong>bold</strong>.</p>', outputDiv.innerHTML);
      done();
    });
  });

  it('should render Math', function(done) {
    const md = 'Einstein said: $E = mc^2$, and was perhaps correct.';
    const outputDiv = document.createElement('div');
    smartdown.setSmartdown(md, outputDiv, function() {
      const expected = '<script type="math/tex">E = mc^2</script>';
      console.log('#setSmartdown math completed', outputDiv.innerHTML.indexOf(expected) >= 0, outputDiv.innerHTML);
      assert(outputDiv.innerHTML.indexOf(expected) >= 0);
      done();
    });
  });

  it('should render Math again', function(done) {
    const md = 'Newton said: $$F = ma$$';
    const outputDiv = document.createElement('div');
    smartdown.setSmartdown(md, outputDiv, function() {
      const expected = '<script type="math/tex; mode=display">F = ma</script>';
      console.log('setSmartdown math completed', outputDiv.innerHTML.indexOf(expected) >= 0, outputDiv.innerHTML);
      assert(outputDiv.innerHTML.indexOf(expected) >= 0);
      done();
    });
  });
});

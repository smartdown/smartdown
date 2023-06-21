this.testSmartdownBasic = function (browser) {
  browser
    .url('https://localhost:4000/#Home')
    .waitForElementVisible('body', 1000)
    .waitForElementVisible('#smartdown-output', 1000)
    .pause(2000)
    .assert.textContains('#smartdown-output', 'Smartdown is designed for blogging')
    .end();
};

this.testSmartdownItalic = function (browser) {
  browser
    .url('https://localhost:4000/#Home')
    .waitForElementVisible('body', 1000)
    .waitForElementVisible('#smartdown-output', 1000)
    .pause(2000)
    .expect.element('#smartdown-output').to.have.property('innerHTML')
    .which.contains('<em>Explorable Explanations</em>');
};

this.testSmartdownClickREADME = function (browser) {
  browser
    .url('https://localhost:4000/#Home')
    .waitForElementVisible('body', 1000)
    .waitForElementVisible('#smartdown-output', 1000)
    .pause(2000)
    .useXpath()
    .click('//*[.=\'Readme\']')
    .pause(500)
    .useCss()
    .assert.textContains('#smartdown-output', 'Smartdown extends Markdown')
    .end();
  browser.end();
};

this.testSmartdownVideos = function (browser) {
  browser
    .url('https://localhost:4000/#Video')
    .waitForElementVisible('body', 1000)
    .waitForElementVisible('#smartdown-output', 1000)
    .waitForElementVisible('#youtube-iframe-1', 1000)
    .end();
  browser.end();
};

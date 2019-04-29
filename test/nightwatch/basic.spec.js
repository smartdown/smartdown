this.testSmartdownBasic = function (browser) {
  browser
    .url('https://localhost:4000/#Home')
    .waitForElementVisible('body', 1000)
    .waitForElementVisible('#smartdown-output', 1000)
    .pause(2000)
    .assert.containsText('#smartdown-output', 'Smartdown is designed for blogging')
    .end();
};


this.testSmartdownItalic = function (browser) {
  browser
    .url('https://localhost:4000/#Home')
    .waitForElementVisible('body', 1000)
    .waitForElementVisible('#smartdown-output', 1000)
    .pause(2000)
    .expect.element('#smartdown-output').to.have.attribute('innerHTML')
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
    .pause(5000)
    .useCss()
    .assert.containsText('#smartdown-output', 'Smartdown is intended for teacher and student alike')
    .end();
  browser.end();
};

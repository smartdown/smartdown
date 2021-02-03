var config = {
  'src_folders': ['test/nightwatch'],
  'webdriver': {
    'start_process': true,
    'server_path': 'node_modules/.bin/chromedriver',
    'port': 9515
  },
  'test_settings': {
    'default': {
      'desiredCapabilities': {
        'browserName': 'chrome',
        chromeOptions: {
          args: [
            '--ignore-ssl-errors=yes',
            '--ignore-certificate-errors',
            '--allow-running-insecure-content']
        }
      }
    }
  }
};

module.exports = config;

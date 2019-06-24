'use strict';

const main = require('./main');

const log = console.log;
const env = process.env.NODE_ENV || 'test';

if (env !== 'staging') {
  log('Please specify the appropriate node environment variable');
  log('set it, with this command "export NODE_ENV=staging"');
  process.exit(1);
}

main();

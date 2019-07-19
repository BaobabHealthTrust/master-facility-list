'use strict';

const main = require('./main');

const {log} = console;
const env = String(process.env.NODE_ENV);

if (env !== 'staging') {
  log('😡 set environment variable');
  log('👉🏽 "export NODE_ENV=staging"');
  process.exit(1);
}

main();

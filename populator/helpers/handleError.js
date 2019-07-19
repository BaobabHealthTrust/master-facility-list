'use strict';

const {error} = console;

module.exports = () => (err) => error('😡', err.message);

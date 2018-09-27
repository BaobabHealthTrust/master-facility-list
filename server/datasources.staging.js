"use strict";

const path = require('path');
const env = require('dotenv');

const ENV_PATH = path.join(__dirname, '..', '/config/.env');
const config = env.config({path: ENV_PATH});
if (config.error) {
  throw config.error;
}

let db_url = "mysql://";
	db_url += process.env.MYSQL_USER;
	db_url += ":";
	db_url += process.env.MYSQL_PASSWORD;
	db_url += "@" + process.env.MYSQL_HOST;
	db_url += "/" + process.env.MYSQL_DATABASE;

module.exports = {
	db: {
		name: "db",
		host: process.env.MYSQL_HOST,
		port: 3306,
		url: db_url,
		database: process.env.MYSQL_DATABASE,
		user: process.env.MYSQL_USER,
		password: process.env.MYSQL_PASSWORD,
		connector: "mysql"
	},
}

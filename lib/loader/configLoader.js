const fs = require('fs');
const { join } = require('path');

module.exports = function (path, app) {
	let env = app.opts.env;
	path = join(path, `/config/config.${env}.js`);
	let exist = fs.existsSync(path);
	if (exist) {
		let config = require(path);
		app.config = config;
	}
}
const fs = require('fs');
const path = require('path');

module.exports = function (dirPath, dirname, app) {
	dirPath = path.join(dirPath, dirname);
	const files = loadFiles(dirPath, {}, app);
	Object.defineProperty(app, dirname, {
		configurable: true,
		writable: true,
		enumerable: true,
		value: files,
	});
}

function loadFiles(dirpath, obj, app) {
	let isExists = fs.existsSync(dirpath);
	if (!isExists) {
		console.error('\x1b[91m', 'Load File ERROR: no such file or directory', dirpath, '\x1b[0m');
		return;
	}
	fs.readdirSync(dirpath).forEach(function (filename) {
		let stat = fs.statSync(path.join(dirpath, filename));
		if (stat.isDirectory()) {
			obj[filename] = {};
			return loadFiles(path.join(dirpath + '/' + filename), obj[filename], app);
		} else {
			let name = path.basename(filename, '.js');
			let file = require(path.join(dirpath + '/' + name));
			if ((typeof file) === 'function') {
				obj[name] = new file(app);
			} else if ((typeof file) === 'object') {
				obj[name] = file;
			}
		}
	});
	return obj;
}
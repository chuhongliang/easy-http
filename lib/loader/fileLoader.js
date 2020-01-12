const fs = require('fs');
const path = require('path');

module.exports = function (dirPath, dirname, app) {
	dirPath = path.resolve(__dirname, dirPath, dirname);
	const files = loadFiles(dirPath, {}, [], app);
	Object.defineProperty(app, dirname, {
		configurable: true,
		writable: true,
		enumerable: true,
		value: files,
	});
}

function loadFiles(dirpath, obj, arr, app) {
	let isExists = fs.existsSync(dirpath);
	if (!isExists) {
		console.error('\x1b[91m', 'Load File ERROR: no such file or directory', dirpath, '\x1b[0m');
		return;
	}
	fs.readdirSync(dirpath).forEach(function (filename) {
		let stat = fs.statSync(path.join(dirpath, filename));
		if (stat.isDirectory()) {
			obj[filename] = {};
			return loadFiles(path.join(dirpath + '/' + filename), obj[filename], arr);
		} else {
			let name = path.basename(filename, '.js');
			let file = require(path.join(dirpath + '/' + name));
			if ((typeof file) === 'function') {
				obj[name] = file(app);
			} else {
				obj[name] = file;
			}
			arr.push(obj[name]);
		}
	});
	return obj;
}
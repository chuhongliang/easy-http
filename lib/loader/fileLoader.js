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
	fs.readdirSync(dirpath).forEach(function (filename) {
		var stat = fs.statSync(path.join(dirpath, filename));
		if (stat.isDirectory()) {
			obj[filename] = {};
			return loadFiles(path.join(dirpath + '/' + filename), obj[filename], arr);
		} else {
			var name = path.basename(filename, '.js');
			obj[name] = require(path.join(dirpath + '/' + name))(app);
			arr.push(obj[name]);
		}
	});
	return obj;
}
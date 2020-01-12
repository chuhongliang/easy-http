const compose = require('koa-compose')
const glob = require('glob')
const { resolve } = require('path')

module.exports = function (path, app) {
	let dirPath = resolve(__dirname, path, 'router');
	console.log('dirPath', dirPath);
	let routers = [];
	glob.sync(resolve(dirPath, '**/*.js'))
		.map(router => {
			try {
				console.log('router', router);
				let tempRouter = require(router)(app);
				routers.push(tempRouter.routes())
				routers.push(tempRouter.allowedMethods())
			} catch (err) {
				console.error('\x1b[91m', `Load Router ERROR: ${err.message} => ${router}`, '\x1b[0m');
			}

		})
	return compose(routers);
}

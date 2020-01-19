const compose = require('koa-compose')
const glob = require('glob')
const { join, resolve } = require('path')

module.exports = function (path, app) {
	let dirPath = join(path, '/router');
	let routers = [];
	glob.sync(resolve(dirPath, '**/*.js'))
		.map(router => {
			try {
				let tempRouter = require(router)(app);
				routers.push(tempRouter.routes())
				routers.push(tempRouter.allowedMethods())
			} catch (err) {
				console.error('\x1b[91m', `Load Router ERROR: ${err.message} => ${router}`, '\x1b[0m');
			}
		})
	return compose(routers);
}

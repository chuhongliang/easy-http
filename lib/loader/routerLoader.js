const compose = require('koa-compose')
const glob = require('glob')
const { resolve } = require('path')

module.exports = function (path, app) {
	let routers = [];
	glob.sync(resolve(__dirname, path, `${path}/router`, '**/*.js'))
		.map(router => {
			try {
				let tempRouter = require(router)(app);
				routers.push(tempRouter.routes())
				routers.push(tempRouter.allowedMethods())
			} catch (err) {
				console.error('\x1b[91m', `ERROR: ${err.message} => ${router}`, '\x1b[0m');
			}

		})
	return compose(routers);
}

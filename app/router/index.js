const Router = require('koa-router');
const router = new Router();

module.exports = function (app) {
	const index = app.controller.index;
	router.get('/', index.home.bind(index));

	return router;
}

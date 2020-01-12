const Router = require('koa-router');
const router = new Router();


module.exports = function (app) {
	const controller = app.controller.index;
	router.get('/', controller.home.bind(controller));
	return router;
}

const BaseContext = require('./base_context');

class BaseController extends BaseContext {
	constructor(app) {
		super(app)
		this.util = app.util || {};
		this.service = app.service || {};
	}
}
module.exports = BaseController;
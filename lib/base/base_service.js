const BaseContext = require('./base_context');

class BaseService extends BaseContext {
	constructor(app) {
		super(app)
		this.util = app.util || {};
	}
}
module.exports = BaseService;
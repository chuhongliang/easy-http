'use strict';
require('com-extend');
const path = require('path');
const Koa = require('koa');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');
const loadRouter = require('./loader/routerLoader');
const validator = require('eop-validator');
const fileLoader = require('./loader/fileLoader');
const configLoader = require('./loader/configLoader');
const argvParser = require('./util/argv');
const koaLogger = require('koa-logger');


class Eop {
	constructor(opts) {
		opts = opts || {}
		this.baseDir = opts.path || process.cwd();
		this.app = new Koa();
		this.app.use(bodyParser());
		this.app.use(cors());
		this.app.use(serve(path.join(this.baseDir, '/public/')));
		this.app.validator = validator;
		this.app.validate = validator.validate();
		this.app.opts = argvParser(process.argv);
		process.title = this.app.opts.title;
		this.app.use(koaLogger((str) => {
			console.log(`${new Date().Format('yyyy-MM-dd hh:mm:ss')}${str}`);
		}));

	}

	loadDir(path, dirname) {
		fileLoader(path, dirname, this.app);
	}

	set(key, value) {
		if (this.app.hasOwnProperty(key)) {
			new Error(' duplicate key ');
		} else {
			Object.defineProperty(app, dirname, {
				configurable: true,
				writable: true,
				enumerable: true,
				value: value,
			});
		}
	}

	start() {
		configLoader(this.baseDir, this.app);
		this.loadDir(this.baseDir, 'util');
		this.loadDir(this.baseDir, 'service');
		this.loadDir(this.baseDir, 'controller');
		this.app.use(loadRouter(this.baseDir, this.app)); // 加载所有路由
		this.port = this.app.opts.port || 3005;
		this.app.listen(this.port);
		console.log(`lintening at http://127.0.0.1:${this.port}`);
	}

}
module.exports = Eop;


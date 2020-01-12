'use strict';

const path = require('path');
const Koa = require('koa');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');
const loadRouter = require('./loader/routerLoader');
const validator = require('eop-validator');
const dirPath = '../../app';
// const dirPath = '../../../../app';
const fileLoader = require('./loader/fileLoader');

class Eop {
	constructor() {
		this.app = new Koa();
		this.app.use(bodyParser());
		this.app.use(cors());
		this.app.use(serve(path.resolve(__dirname, `${dirPath}/public/`)));
		this.app.validator = validator;
		this.app.validate = validator.validate();
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

	start(port) {
		this.loadDir(dirPath, 'config');
		this.loadDir(dirPath, 'util');
		this.loadDir(dirPath, 'service');
		this.loadDir(dirPath, 'controller');
		this.app.use(loadRouter(dirPath, this.app)); // 加载所有路由
		port = port ? port : 3000;
		this.app.listen(port);
		console.log(`lintening at http://127.0.0.1:${port}`);
	}

}
module.exports = Eop;


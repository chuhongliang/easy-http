'use strict';

const path = require('path');
const Koa = require('koa');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');
const { loadRouter } = require('./helper');

module.exports = function(options){
  options = options || {};
  const app = new Koa(options);
  app.use(bodyParser());
  app.use(cors());
  app.use(loadRouter()); // 加载所有路由
  app.use(serve(path.resolve(__dirname, '../app/static/')));
  return app;
}

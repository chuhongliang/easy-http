const compose = require('koa-compose')
const glob = require('glob')
const { resolve } = require('path')

registerRouter = (path) => {
    path = path || '../app/router';
    let routers = [];
    glob.sync(resolve(__dirname, path, '**/*.js'))
        .map(router => {
            routers.push(require(router).routes())
            routers.push(require(router).allowedMethods())
        })
    return compose(routers);
}

module.exports = registerRouter
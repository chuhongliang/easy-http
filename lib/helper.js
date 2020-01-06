const compose = require('koa-compose')
const glob = require('glob')
const { resolve } = require('path')

exports.loadRouter = (path) => {
    let routers = [];
    glob.sync(resolve(__dirname, path, `${path}/router`, '**/*.js'))
        .map(router => {
            console.log()
            routers.push(require(router).routes())
            routers.push(require(router).allowedMethods())
        })
    return compose(routers);
}

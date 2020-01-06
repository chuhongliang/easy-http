const Router = require('koa-router');
const router = new Router();

router.prefix('/v1')
router
    .get('/login', (ctx) => {
        ctx.body = 'hello koa'
    })
    .get('/register', (ctx, next) => {
        ctx.body = "hello user，这是register哦"
    })

module.exports = router;

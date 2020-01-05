const Router = require('koa-router')

const router = new Router()

router.prefix('/B')

router.get('/all',(ctx,next)=>{
    ctx.body = "hello B module router"
})

module.exports = router
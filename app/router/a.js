const Router = require('koa-router')

const router = new Router()

router.prefix('/A')

router.get('/all',(ctx,next)=>{
    ctx.body = "hello A module router"
})

module.exports = router
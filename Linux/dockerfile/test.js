const Koa = require('koa')
const app = new Koa()
const port = 3000

app.use(async ctx => {
  ctx.body = '<h1>hello koa2</h1>'
})

app.listen(port, () => {
  console.log(`server start at port ${port}`)
})

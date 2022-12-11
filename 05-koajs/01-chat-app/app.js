const path = require('path');
const Koa = require('koa');
const app = new Koa();

app.use(require('koa-static')(path.join(__dirname, 'public')));
app.use(require('koa-bodyparser')());

const Router = require('koa-router');
const router = new Router();
const {subscribe, publish} = require('./middleware/middleware').middle

router.get('/subscribe', subscribe, async (ctx, next) => {

});

router.post('/publish', publish, async (ctx, next) => {
    
});

app.use(router.routes());

module.exports = app;

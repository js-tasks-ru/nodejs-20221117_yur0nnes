const path = require('path');
const Koa = require('koa');
const app = new Koa();

app.use(require('koa-static')(path.join(__dirname, 'public')));
app.use(require('koa-bodyparser')());

const Router = require('koa-router');
const router = new Router();
const middle = require('./middleware/middleware')

router.get('/subscribe', middle.subscribe, async (ctx, next) => {

});

router.post('/publish', middle.publish, async (ctx, next) => {
    
});

app.use(router.routes());

module.exports = app;

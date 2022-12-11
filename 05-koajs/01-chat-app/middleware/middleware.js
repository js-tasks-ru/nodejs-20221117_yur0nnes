
let users = {}

const publish = async (ctx, next) => {
    if (!ctx.request.body.message) return
    for (let user in users) {
        users[user](ctx.request.body.message)
    }
    users = {}
    ctx.body = 'message sent'
    return next()
}

const subscribe = async (ctx, next) => {
    const answerUser = (resolve) => {
        users[Math.random()] = function (message) {
            resolve(message)
        }
    }
    ctx.body = await new Promise((resolve) => {
        answerUser(resolve)
    })
    return next()
}

module.exports = {publish, subscribe}
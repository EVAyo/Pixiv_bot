// import { Telegraf } from 'telegraf'
import { Bot } from 'grammy'
import config from './config.js'
import { apiThrottler } from '@grammyjs/transformer-throttler'
// import http from 'http'
export const tgBot = new Bot(config.tg.token, {
    client: {
        // apiRoot: 
    }
})

const throttler = apiThrottler()
tgBot.api.config.use(throttler)

tgBot.on('channel_post', (ctx, next) => {
    ctx.update.message = ctx.update.channel_post
    next()
})
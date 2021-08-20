const { Markup } = require('telegraf')
const { _l } = require('./i18n.js')
/**
 * 打开和分享 用得比较多，所以就简写了
 * @param {*} id illust id
 * @param {*} share 是否分享 默认为真，留其它的可以增加share的东西
 * 简写 k -> keyboard os -> open and share
 */
function k_os(id, flag = false) {
    let inline_keyboard = [[]]
    if (flag.open) {
        inline_keyboard[0].push(Markup.button.url('open', 'https://www.pixiv.net/artworks/' + id))
    }
    if (flag.share) {
        inline_keyboard[0].push(Markup.button.switchToChat('share', `https://pixiv.net/artworks/${id}${flag.tags ? ' +tags' : ''}${!flag.show_id ? ' -id' : ''}`))
    }
    return Markup.inlineKeyboard(inline_keyboard)
}

function k_setting_index(language_code = 'en', flag) {
    let inline_keyboard = [[
        Markup.button.callback(l.settings.format, 'set_format'),
        //Markup.button.callback(l.settings.bookmarks,'record_bookmarks')
    ]]
    return Markup.inlineKeyboard(inline_keyboard).resize()
}
function k_setting_format(language_code = 'en', flag) {
    let inline_keyboard = [[
        Markup.button.callback('message', 'set_format|message'),
        Markup.button.callback('inline(share)', 'set_format|inline')
    ], [
        Markup.button.callback('all', 'set_format|all')
    ], [
        Markup.button.callback('🔙 back', 'set_index')
    ]]
    return Markup.inlineKeyboard(inline_keyboard).resize()
}
/**
 * link setting
 * @param {*} language_code 
 * @param {*} s 
 * @returns 
 */
function k_link_setting(language_code = 'en', s) {
    let linked_chat_id = s.chat_id
    for (const key in s) {
        if (key !== 'type') {
            s[key] = parseInt(s[key])
        }
    }
    let inline_keyboard = [[
        {
            prefix: 'link_sync',
            value: s.sync,
            next: s.sync >= 1 ? 0 : s.sync + 1
        },
        {
            prefix: 'link_administrator_only',
            value: s.administrator_only,
            next: s.administrator_only >= 1 ? 0 : s.administrator_only + 1
        },
        {
            prefix: 'link_repeat',
            value: s.repeat,
            next: s.repeat >= 2 ? 0 : s.repeat + 1
        },
        // {
        //     prefix: 'mediagroup_count',
        //     value: s.mediagroup_count,
        //     next: s.mediagroup_count >= 10 ? 0 : s.mediagroup_count + 1
        // }
    ].map(x => {
        return Markup.button.callback(`${_l(language_code, x.prefix)} | ${_l(language_code, `${x.prefix}_${x.value}`)}`, `l|${x.prefix}|${linked_chat_id}|${x.value}|${x.next}`)
    }), [
        Markup.button.callback(`${_l(language_code, 'link_unlink')}`, `l|link_unlink|${linked_chat_id}`)
    ]]
    return Markup.inlineKeyboard(inline_keyboard).resize()
}
module.exports = {
    k_os,
    k_setting_index,
    k_setting_format,
    k_link_setting
}
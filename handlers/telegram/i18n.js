import fs from 'fs'
import { escape_strings } from './format.js'
let l = {}
fs.readdirSync('./lang/').map(async filename => {
    if (filename.includes('.js')) {
        await import('../../lang/' + filename).then((ll, id) => {
            let ll_ = {}
            for (const v in ll) {
                ll_[v] = escape_strings(ll[v])
            }
            l[filename.replace('.js', '')] = ll_
        })
    }
})
// setTimeout(() => {
//     console.log(l)
// }, 2000);
/**
 * i18n
 * @param {*} lang 语言
 * @param {*} item 项目
 * @param  {...any} value 值
 */
export function _l(lang, item, ...value) {
    if (!l[lang] || !l[lang][item]) {
        lang = 'en'
    }
    if (value.length === 0 || !l[lang][item].includes('\\{\\}')) {
        return l[lang][item]
    }
    let result = l[lang][item]
    let count = l[lang][item].match(/\\\{\\\}/g) || []
    count.forEach((x, id) => {
        console.log(id, value[id])
        result = result.replace(x, escape_strings(value[id]))
    })
    return result
}

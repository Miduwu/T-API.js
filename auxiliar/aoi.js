const Discord = require('discord.js')
module.exports = {
    /** 
     * @param {Object} bot Aoi.js bot definition
     * @param {Object} api Api definition, This.api
     * @param {string} name Function name
    */
    embeds: (bot, api, name = "$imageAPI") => {
        bot.functionManager.createCustomFunction({
            name: name,
            type: 'djs',
            code: async d => {
                const data = d.util.openFunc(d)
                if (data.err) return d.error(data.err)
                let [index, name, params] = data.inside.splits
                if(isNaN(+index) || +index < 0 || +index > 10) return d.aoiError.fnError(d, 'custom', {inside: data.inside}, 'Invalid index provided in')
                index = +index - 1 
                if(!d.embeds[+index]) d.embeds[+index] = new d.embed()
                if(!api["image"][name]) return d.aoiError.fnError(d, 'custom', {inside: data.inside}, 'Invalid name provided in')
                let json;
                try{
                    json = JSON.parse(params)
                } catch {return d.aoiError.fnError(d, 'custom', {inside: data.inside}, 'Invalid JSON provided in')}
                if(!json) return d.aoiError.fnError(d, 'custom', {inside: data.inside}, 'Invalid JSON provided in')
                json = JSON.parse(JSON.stringify(json).replace(/#COLON#/g, ':').replace(/#EQUAL#/g, '='))
                const result = await api["image"][name](json).catch(e=> {return d.aoiError.fnError(d, 'custom', {}, 'Invalid data, error:'+e)})
                const at = new Discord.MessageAttachment(result, 'file.png')
                d.embeds[+index].setImage('attachment://file.png')
                d.files.push(at)
                return {
                    code: d.util.setCode(data),
                    files: d.files,
                    embeds: d.embeds
                }
            }
        })
    },
        /** 
     * @param {Object} bot Aoi.js bot definition
     * @param {Object} api Api definition, This.api
     * @param {string} name Function name
    */
    attachments: (bot, api, name = "$attachmentAPI") => {
        bot.functionManager.createCustomFunction({
            name: name,
            type: 'djs',
            code: async d => {
                const data = d.util.openFunc(d)
                if (data.err) return d.error(data.err)
                let [name, params] = data.inside.splits
                if(!api["image"][name]) return d.aoiError.fnError(d, 'custom', {inside: data.inside}, 'Invalid name provided in')
                let json;
                try{
                    json = JSON.parse(params)
                } catch {return d.aoiError.fnError(d, 'custom', {inside: data.inside}, 'Invalid JSON provided in')}
                if(!json) return d.aoiError.fnError(d, 'custom', {inside: data.inside}, 'Invalid JSON provided in')
                json = JSON.parse(JSON.stringify(json).replace(/#COLON#/g, ':').replace(/#EQUAL#/g, '='))
                const result = await api["image"][name](json).catch(e=> {return d.aoiError.fnError(d, 'custom', {}, 'Invalid data, error:'+e)})
                const at = new Discord.MessageAttachment(result, 'file.png')
                d.files.push(at)
                return {
                    code: d.util.setCode(data),
                    files: d.files
                }
            }
        })
    }
}
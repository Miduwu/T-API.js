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
                let [index, name, params, file = "file.png"] = data.inside.splits
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
                const at = new Discord.MessageAttachment(result, file)
                d.embeds[+index].setImage(`attachment://${file}`)
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
                let [name, params, file = "file.png"] = data.inside.splits
                if(!api["image"][name]) return d.aoiError.fnError(d, 'custom', {inside: data.inside}, 'Invalid name provided in')
                let json;
                try{
                    json = JSON.parse(params)
                } catch {return d.aoiError.fnError(d, 'custom', {inside: data.inside}, 'Invalid JSON provided in')}
                if(!json) return d.aoiError.fnError(d, 'custom', {inside: data.inside}, 'Invalid JSON provided in')
                json = JSON.parse(JSON.stringify(json).replace(/#COLON#/g, ':').replace(/#EQUAL#/g, '='))
                const result = await api["image"][name](json).catch(e=> {return d.aoiError.fnError(d, 'custom', {}, 'Invalid data, error:'+e)})
                const at = new Discord.MessageAttachment(result, file)
                d.files.push(at)
                return {
                    code: d.util.setCode(data),
                    files: d.files
                }
            }
        })
    },
        /** 
     * @param {Object} bot Aoi.js bot definition
     * @param {Object} api Api definition, This.api
     * @param {string} name Function name
    */
     objects: (bot, api, name = "$requestAPI") => {
        bot.functionManager.createCustomFunction({
            name: name,
            type: 'djs',
            code: async d => {
                const data = d.util.openFunc(d)
                if (data.err) return d.error(data.err)
                let [group, name, params, property = '', error] = data.inside.splits
                group = group?.toLowerCase()
                name = name?.toLowerCase()
                if(!["json", "anime"].some(e => e === group)) return d.aoiError.fnError(d, 'custom', {inside: data.inside}, 'Invalid group provided in')
                if(!api[group][name]) return d.aoiError.fnError(d, 'custom', {inside: data.inside}, 'Invalid name provided in')
                let json = null
                try{
                    json = JSON.parse(params)
                } catch {return d.aoiError.fnError(d, 'custom', {inside: data.inside}, 'Invalid JSON provided in')}
                if(!json) return d.aoiError.fnError(d, 'custom', {inside: data.inside}, 'Invalid JSON provided in')
                const result = await api[group][name](json).catch(async e => {
                    if (!error || error === '$default') return d.aoiError.fnError(d, 'custom', {}, 'Failed To Request To API With Reason: ' + e);
                    else {
                        const jsonError = await d.util.errorParser(error, d);
                        d.aoiError.makeMessageError(d.client, d.channel, jsonError, jsonError.options);
                    }
                })
                if(typeof result === 'object') {
                    data.result = (property?.trim() === '') ? JSON.stringify(result, null, 2) : eval(`result?.${property?.addBrackets()}`);
                }
                return {
                    code: d.util.setCode(data)
                }
            }
        })
    }
}
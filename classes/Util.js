/**
Sets the API Util
*/
class Util {
    /**
    @param {object} api The API itself
    */
    constructor(api) {
        this.api = api
        this.bot = null
    }
    /**
    Sets the custom api functions
    @param {Object} bot The Aoi.js bot definition
    @param {Object} values Options
    */
    connect_aoi(bot, values = {
        embeds: "$imageAPI",
        attachments: "$attachmentAPI",
        objects: '$requestAPI',
        result: '$getProperty'
    }) {
            this.bot = bot
            const aoi = require('../auxiliar/aoi.js')
            aoi.embeds(bot, this.api, values.embeds)
            aoi.attachments(bot, this.api, values.attachments)
            aoi.objects(bot, this.api, values.objects)
            aoi.result(bot, values.result)
    }
}
module.exports = Util
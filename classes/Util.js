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
        objects: '$requestAPI'
    }) {
            this.bot = bot
            require('../auxiliar/aoi.js').embeds(bot, this.api, values.embeds)
            require('../auxiliar/aoi.js').attachments(bot, this.api, values.attachments)
            require('../auxiliar/aoi.js').objects(bot, this.api, values.objects)
    }
}
module.exports = Util
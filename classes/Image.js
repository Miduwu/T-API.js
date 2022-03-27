const fetch = require('node-fetch')
const host = 'https://apiv2.willz.repl.co/'
const { getParams } = require('../auxiliar/Util')
const eps = require('../auxiliar/endpoints.json')
const errors = require('../auxiliar/errors.json')

/**
 * Make the API startup for only buffer endpoints.
 */
 class Image {
    /**
 * @param {string} auth Your API Key
 */
    constructor(token) {
        Object.defineProperty(this, 'token', { writable: true })
        if (!this.token && 'TAPI_TOKEN' in process.env) {
            this.token = process.env.TAPI_TOKEN
        } else {
            this.token = token
        }
        
        for(const ep of eps["BUFFER"]) {
            this[ep] = async function(params) {
                let pms = getParams(params)
                const response = await fetch(`${host}image/${ep}${pms}`, {headers:{ "Authorization": this.token }}).catch(e=>null)
                if(response && response.status == 401) throw new Error(errors[401])
                if(response && response.status == 400) throw new Error(errors[400])
                if(response && response.status == 404) throw new Error(errors[404])
                if(response && response.status !== 200) throw new Error(errors[500])
                if(!response) throw new Error(errors[500])
                const idk = await response.buffer()
                return idk
            }
        }
    }
}

module.exports = Image;
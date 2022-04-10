const fetch = require('node-fetch')
const host = 'https://api.miduwu.ga/'
const { getParams } = require('../auxiliar/Util')
const eps = require('../auxiliar/endpoints.json')
const errors = require('../auxiliar/errors.json')

/**
 * Make the API startup using all endpoints.
 */
 class All {
    /**
 * @param {string} auth Your API Key
 */
    constructor(token) {
        this.image = {}
        this.anime = {}
        this.json = {}
        this.direct = {}
        Object.defineProperty(this, 'token', { writable: true })
        if (!this.token && 'TAPI_TOKEN' in process.env) {
            this.token = process.env.TAPI_TOKEN
        } else {
            this.token = token
        }

        for(const ep of eps["BUFFER"]) {
            this.image[ep] = async function(params) {
                let pms = getParams(params)
                const response = await fetch(`${host}image/${ep}${pms}`, {headers:{ "Authorization": token }}).catch(e=>null)
                if(response && response.status == 401) throw new Error(errors[401])
                if(response && response.status == 400) throw new Error(errors[400])
                if(response && response.status == 404) throw new Error(errors[404])
                if(response && response.status !== 200) throw new Error(errors[500])
                if(!response) throw new Error(errors[500])
                const idk = await response.buffer()
                return idk
            }
        }
        for(const ep of eps["JSON"]) {
            this.json[ep] = async function(params) {
                let pms = getParams(params)
                const response = await fetch(`${host}json/${ep}${pms}`, {headers:{ "Authorization": token }}).catch(e=>null)
                if(response && response.status == 401) throw new Error(errors[401])
                if(response && response.status == 400) throw new Error(errors[400])
                if(response && response.status == 404) throw new Error(errors[404])
                if(response && response.status !== 200) throw new Error(errors[500])
                if(!response) throw new Error(errors[500])
                const idk = await response.json()
                return idk
            }
        }
        for(const ep of eps["ANIME"]) {
            this.anime[ep] = async function(params) {
                let pms = getParams(params)
                const response = await fetch(`${host}anime/${ep}${pms}`, {headers:{ "Authorization": token }}).catch(e=>null)
                if(response && response.status == 401) throw new Error(errors[401])
                if(response && response.status == 400) throw new Error(errors[400])
                if(response && response.status == 404) throw new Error(errors[404])
                if(response && response.status !== 200) throw new Error(errors[500])
                if(!response) throw new Error(errors[500])
                const idk = await response.json()
                return idk
            }
        }
        for(const ep of eps["DIRECT"]) {
            this.direct[ep] = async function(params) {
                let pms = getParams(params)
                const response = await fetch(`${host}/${ep}${pms}`, {headers:{ "Authorization": token }}).catch(e=>null)
                if(response && response.status == 401) throw new Error(errors[401])
                if(response && response.status == 400) throw new Error(errors[400])
                if(response && response.status == 404) throw new Error(errors[404])
                if(response && response.status !== 200) throw new Error(errors[500])
                if(!response) throw new Error(errors[500])
                const idk = await response.json()
                return idk
            }
        }
    }
    /**
 * @param {string} url The URL to fetch
 * @param {boolean} [headerAuth=true] If you will request with the authorization header.
 * @returns {Promise} The data (Object/Buffer) of that request.
 */
    async get(url, headerAuth=true) {
        let body = headerAuth ? await fetch(url, {headers: {"Authorization": this.token}}).catch(e=>null): await fetch(url).catch(e=>null)
        if(!body) throw new Error('Unnable to fetch '+url)
        let response = body.headers.get('content-type').includes('json') ? await body.json(): await body.buffer()
        return response
    }
    /**
     * 
     * @param {string} [key=this.token] The key.
     * @returns {Promise} Boolean
     */
    async isValidKey(key) {
        let token = key || this.token
        const data = await fetch('https://api.willz.repl.co/json/owoify?text=a', {
            headers: {
                "Authorization": token
            }
        }).catch(e=>null)
        return data && data.status == 401 ? false: true
    }
}

module.exports = All;
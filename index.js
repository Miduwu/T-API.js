const fetch = require('node-fetch')
const eps = require('./auxiliar/endpoints.json')
const host = 'https://apiv2.willz.repl.co/'
const errors = require('./auxiliar/errors.json')
const getParams = (params) => {
    let pm = new URLSearchParams('')
    let keys = Object.keys(params)
    for(const key of keys) {
        pm.set(key, params[key])
    }
    return `?${pm.toString()}`
}
/**
 * Make the API startup.
 */
class TAPI {
    /**
 * @param {string} auth Your API Key
 */
    constructor(auth) {
        if(!auth) throw new Error('You need give an object with the parameters.')
        this.image = {}
        this.anime = {}
        this.json = {}
        this.direct = {}
        this.key = auth
        
        for(const ep of eps["BUFFER"]) {
            this.image[ep] = async function(params) {
                let pms = getParams(params)
                const response = await fetch(`${host}image/${ep}${pms}`, {headers:{ "Authorization": auth }}).catch(e=>null)
                if(response && response.status == 401) throw new Error(errors[401])
                if(response && response.status == 400) throw new Error(errors[400])
                if(response && response.status !== 200) throw new Error(errors[500])
                if(!response) throw new Error(errors[500])
                const idk = await response.buffer()
                return idk
            }
        }
        for(const ep of eps["JSON"]) {
            this.json[ep] = async function(params) {
                let pms = getParams(params)
                const response = await fetch(`${host}json/${ep}${pms}`, {headers:{ "Authorization": auth }}).catch(e=>null)
                if(response && response.status == 401) throw new Error(errors[401])
                if(response && response.status == 400) throw new Error(errors[400])
                if(response && response.status !== 200) throw new Error(errors[500])
                if(!response) throw new Error(errors[500])
                const idk = await response.json()
                return idk
            }
        }
        for(const ep of eps["ANIME"]) {
            this.anime[ep] = async function(params) {
                let pms = getParams(params)
                const response = await fetch(`${host}anime/${ep}${pms}`, {headers:{ "Authorization": auth }}).catch(e=>null)
                if(response && response.status == 401) throw new Error(errors[401])
                if(response && response.status == 400) throw new Error(errors[400])
                if(response && response.status !== 200) throw new Error(errors[500])
                if(!response) throw new Error(errors[500])
                const idk = await response.json()
                return idk
            }
        }
        for(const ep of eps["DIRECT"]) {
            this.anime[ep] = async function(params) {
                let pms = getParams(params)
                const response = await fetch(`${host}direct/${ep}${pms}`, {headers:{ "Authorization": auth }}).catch(e=>null)
                if(response && response.status == 401) throw new Error(errors[401])
                if(response && response.status == 400) throw new Error(errors[400])
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
        let body = headerAuth ? await fetch(url, {headers: {"Authorization": this.key}}).catch(e=>null): await fetch(url).catch(e=>null)
        if(!body) throw new Error('Unnable to fetch '+url)
        let response = body.headers.get('content-type').includes('json') ? await body.json(): await body.buffer()
        return response
    }
    /**
     * 
     * @param {string} [key=this.key] The key.
     * @returns {Promise} Boolean
     */
    async isValidKey(key) {
        let token = key || this.key
        const data = await fetch('https://apiv2.willz.repl.co/json/owoify?text=a', {
            headers: {
                "Authorization": token
            }
        }).catch(e=>null)
        return data && data.status == 401 ? false: true
    }
}

module.exports = TAPI;
const fetch = require('node-fetch')
const eps = require('./auxiliar/endpoints.json')
const host = 'https://apiv2.willz.repl.co/'
const getParams = (params) => {
    let pm = new URLSearchParams('')
    let keys = Object.keys(params)
    for(const key of keys) {
        pm.set(key, params[key])
    }
    return `?${pm.toString()}`
}
class TAPI {
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
                if(response && response.status == 401) throw new Error('Wrong token. Full error:'+ await response.json())
                if(response && response.status == 400) throw new Error('Invalid data. FUll error:'+ await response.json())
                if(response && response.status !== 200) throw new Error('The status was not correct and it can\'t be parsed the status code is'+response.status)
                if(!response) throw new Error('Something went wrong')
                const idk = await response.buffer()
                return idk
            }
        }
        for(const ep of eps["JSON"]) {
            this.json[ep] = async function(params) {
                let pms = getParams(params)
                const response = await fetch(`${host}json/${ep}${pms}`, {headers:{ "Authorization": auth }}).catch(e=>null)
                if(response && response.status == 401) throw new Error('Wrong token. Full error:'+ await response.json())
                if(response && response.status == 400) throw new Error('Invalid data. FUll error:'+ await response.json())
                if(response && response.status !== 200) throw new Error('The status was not correct and it can\'t be parsed the status code is '+response.status)
                if(!response) throw new Error('Something went wrong')
                const idk = await response.json()
                return idk
            }
        }
        for(const ep of eps["ANIME"]) {
            this.anime[ep] = async function(params) {
                let pms = getParams(params)
                const response = await fetch(`${host}anime/${ep}${pms}`, {headers:{ "Authorization": auth }}).catch(e=>null)
                if(response && response.status == 401) throw new Error('Wrong token. Full error:'+ await response.json())
                if(response && response.status == 400) throw new Error('Invalid data. FUll error:'+ await response.json())
                if(response && response.status !== 200) throw new Error('The status was not correct and it can\'t be parsed the status code is '+response.status)
                if(!response) throw new Error('Something went wrong')
                const idk = await response.json()
                return idk
            }
        }
        for(const ep of eps["DIRECT"]) {
            this.anime[ep] = async function(params) {
                let pms = getParams(params)
                const response = await fetch(`${host}direct/${ep}${pms}`, {headers:{ "Authorization": auth }}).catch(e=>null)
                if(response && response.status == 401) throw new Error('Wrong token. Full error:'+ await response.json())
                if(response && response.status == 400) throw new Error('Invalid data. FUll error:'+ await response.json())
                if(response && response.status !== 200) throw new Error('The status was not correct and it can\'t be parsed the status code is '+response.status)
                if(!response) throw new Error('Something went wrong')
                const idk = await response.json()
                return idk
            }
        }
    }
    async get(url, headerAuth=true) {
        let body = headerAuth ? await fetch(url, {headers: {"Authorization": this.key}}).catch(e=>null): await fetch(url).catch(e=>null)
        if(!body) throw new Error('Unnable to fetch '+url)
        let response = body.headers["content-type"] == 'application/json' ? await body.json(): await body.buffer()
        return response
    }
}

module.exports = TAPI;
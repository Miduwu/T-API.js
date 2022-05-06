import fetch, { Response } from 'node-fetch'

const HOST: string = 'https://api.miduwu.ga/'

function parseParams(obj?: Record<string, any>): string {
    if(!obj) return ''
    let pm: URLSearchParams = new URLSearchParams(obj)
    return '?' + pm.toString()
}

export async function Image(endpoint: string, parameters: Record<string, any>): Promise<any> {
    const path: string = `${HOST}image/${endpoint}${parseParams(parameters)}`
    const res: Response = await fetch(path).catch()
    if(res.status === 404) throw new TypeError('The endpoint provided was not found.')
    if(res.status === 400) throw new TypeError('Parameter options provided are invalid.')
    if(res.status === 500) throw new Error('Something internal went wrong with the server, try again later.')
    return (await res.buffer())
}

export async function Json(endpoint: string, parameters?: Record<string, any>): Promise<any> {
    const path: string = `${HOST}json/${endpoint}${parseParams(parameters)}`
    const res: Response = await fetch(path).catch()
    if(res.status === 404) throw new TypeError('The endpoint provided was not found.')
    if(res.status === 400) throw new TypeError('Parameter options provided are invalid.')
    if(res.status === 500) throw new Error('Something internal went wrong with the server, try again later.')
    return (await res.json())
}

export async function Anime(endpoint: string, parameters?: Record<string, any>): Promise<any> {
    const path: string = `${HOST}anime/${endpoint}${parseParams(parameters)}`
    const res: Response = await fetch(path).catch()
    if(res.status === 404) throw new TypeError('The endpoint provided was not found.')
    if(res.status === 400) throw new TypeError('Parameter options provided are invalid.')
    if(res.status === 500) throw new Error('Something internal went wrong with the server, try again later.')
    return (await res.json())
}

export async function getInfo(endpoint: string): Promise<any> {
    const path: string = `${HOST}/endpoint?name=${endpoint}`
    const res: Response = await fetch(path).catch()
    if(res.status === 404) throw new TypeError('The endpoint provided was not found.')
    if(res.status === 400) throw new TypeError('Parameter options provided are invalid.')
    if(res.status === 500) throw new Error('Something internal went wrong with the server, try again later.')
    return (await res.json())
}
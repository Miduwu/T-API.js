[![Discord](https://img.shields.io/discord/809567850841767936?color=blue&label=Discord&logo=discord&logoColor=white)](https://discord.com/invite/3pT2WHG9EG)
# T-API Wrapper

This package is the easiest way to interact with the T-API.

## Features
- 🚀 Easy to use!
- 🎓 From a professional API!
- 🎇 Asynchronous
- 🎠 Sexy developers (Dialber & Mid)

## Install
```
npm i @midowo/t-api.js
```
All endpoints are from: [T-API](https://api.willz.repl.co)

## Usage
```js
const TAPI = require('@midowo/t-api.js')
const api = new TAPI.All('YOUR_API_KEY')

api.image.supreme({
"text": "Cool"
}).then(buffer => {
// do anything
})

api.json.translate({
"source": "auto",
"target": "fr",
"text": "Hello world!"
}).then(obj => {
// do anything
})
```

## Connecting with Aoi.js
```js
// Setup the aoi.js bot
const aoijs = require("aoi.js")

const bot = new aoijs.Bot({...})
// Setup the T-API
const TAPI = require('@midowo/t-api.js')
const api = new TAPI.All('YOUR_API_KEY')
// Connect with Aoi.js
const ApiUtil = new TAPI.Util(api)
ApiUtil.connect_aoi(bot, {
    embeds: '$imageAPI',
    attachments: '$attachmentAPI',
    objects: '$requestAPI',
    result: '$getProperty'
})
```

## Methods
Validate key:
```js
api.isValidKey(key=this.key) // default this.key
 .then(console.log) // true or false
 ```
 Http get:
 ```js
 api.get('url', headerAuth=true).then(data => {
     data // buffer or object depending ur request
 })
 ```
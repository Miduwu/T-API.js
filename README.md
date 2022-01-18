# T-API Wrapper

This package is the easiest way to interact with the T-API.

## Features
- 🚀 Easy to use!
- 🎓 From a professional API!
- 🎇 Asynchronous
- 🎠 Sexy developers (Dialber & Mid)

## Install
```
npm i t-api.js
```
All endpoints are from: [T-API](https://apiv2.willz.repl.co)

## Usage
```js
const TAPI = require('t-api.js')
const api = new TAPI('Y0UR S3CRET K3Y')

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
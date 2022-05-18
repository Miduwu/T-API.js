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
npm i tokyo-api.ts
```
All endpoints are from: [T-API](https://api.miduwu.ga)

## Usage
```js
const { Image, Json, Anime } = require('tokyo-api.ts')

Image('supreme', {
    "text" "Test"
}).then(buffer => {
    // do anything
});

Json('translate', {
    "source": "auto",
    "target": "fr",
    "text": "Hello world."
}).then(object => {
    // do anything
});
```
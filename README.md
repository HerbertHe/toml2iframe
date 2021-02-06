# toml2iframe

[![version](https://img.shields.io/npm/v/toml2iframe.svg)](https://www.npmjs.com/package/toml2iframe)
[![download](https://img.shields.io/npm/dm/toml2iframe.svg)](https://www.npmjs.com/package/toml2iframe)
[![cnpmVersion](https://cnpmjs.org/badge/v/toml2iframe.svg)](https://cnpmjs.org/package/toml2iframe)
[![cnpmDownload](https://cnpmjs.org/badge/d/toml2iframe.svg)](https://cnpmjs.org/package/toml2iframe)

> A library that can let you use iframe in markdown extra syntax securely!

**If you want to use this library in HTML via script tag, plz use [codeblock-iframe](https://github.com/HerbertHe/codeblock-iframe) instead**

[简体中文](./README.CN.md) | [English](./README.md)

## Try it

In the [Demo](https://herberthe.github.io/codeblock-iframe/demo), You can experience how it works!

## Install

```bash
npm i toml2iframe
# or if u use yarn
yarn add toml2iframe
```

## Usage

You can write in markdown editor as followed:

````markdown
```iframe
src="www.baidu.com"
width="100%"
height="500"
```
````

Write your own renderer for this

```js
import { filter, converter } from "toml2iframe"

// iframe attributes
const content = `
src="www.baidu.com"
width="100%"
height="500"
`

console.log(filter(content, ["www.baidu.com", "www.google.com"]))

// output: [ true, 'www.baidu.com' ]

console.log(converter(content))
// output: [
//  '<iframe src="www.baidu.com" width="100%" height="500"></iframe>',
//  true,
//  [ 'src', 'width', 'height' ]
//]
```

Following formats of `src` are supported!

```text
www.baidu.com
//www.baidu.com
http://www.baidu.com
https://www.baidu.com
```

## Functions

- iframe Attributes

| Attributes   |
| ------------ |
| src          |
| height       |
| width        |
| align        |
| frameborder  |
| longdesc     |
| marginheight |
| marginwidth  |
| name         |
| sandbox      |
| scrolling    |
| seamless     |
| srcdoc       |
| textContent  |

- Params

| Param   | Type            | Description                                                                         |
| ------- | --------------- | ----------------------------------------------------------------------------------- |
| content | `string`        | Iframe's attributes (including `textContent` for children) using standard TOML syntax |
| filters | `Array<string>` | Allowed domain list (required in `filter` function, **DO NOT WITH Protocol**)         |

- Functions

1. `converter(content: string, filters?: Array<string>)`: for convertering attributes to iframe
2. `filter(content: string, filters: Array<string>)`: for filtering domains

- Outputs

For `converter(content: string, filters?: Array<string>)`: [ result, if passed filter?, [ attributes' names for debug ] ]

For `filter(content: string, filters: Array<string>)`: [ if passed filter?, domain (if src's value is not the valid uri, return raw src's value) ]

> `/www.baidu.com` is not the valid uri, plz use `www.baidu.com` directly! **If you want to use same origin page, plz don't input the `filters` param, you will get nothing for `converter` function!!!** Or, you give the complete path for `src` and add your same origin page's domain to `filters` param, it will work!!

## Why To Do

To be honest, Markdown supports HTML tags natively! But here are some issues we have to face as followed:

1. If I didn't want my users insert ads in their posts via iframe but supported them using codepen to share their codes, how could I do?
2. Sometimes we try to insert iframe in some markdown editor. For immediately rendering, the browser will send a lot of GET requests to our target website when we inputting, how could we optimize? Even it causes our page breakdown when developing and using SSR

## How To Do

Code Block Renderer is easy for us to extend native markdown syntax, so we can limit the frequency of iframe rendering in this way.

## Thanks

- [iarna-toml](https://github.com/iarna/iarna-toml): Better TOML parsing and stringifying all in that familiar JSON interface.

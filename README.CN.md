# toml2iframe

[![version](https://img.shields.io/npm/v/toml2iframe.svg)](https://www.npmjs.com/package/toml2iframe)
[![download](https://img.shields.io/npm/dm/toml2iframe.svg)](https://www.npmjs.com/package/toml2iframe)
[![cnpmVersion](https://cnpmjs.org/badge/v/toml2iframe.svg)](https://cnpmjs.org/package/toml2iframe)
[![cnpmDownload](https://cnpmjs.org/badge/d/toml2iframe.svg)](https://cnpmjs.org/package/toml2iframe)

> 一个可以让你通过markdown拓展语法更加安全使用iframe元素的库

**如果你想直接在HTML中通过script标签引入, 请使用 [codeblock-iframe](https://github.com/HerbertHe/codeblock-iframe) 这个库**

[简体中文](./README.CN.md) | [English](./README.md)

## 体验一下

在这个 [Demo](https://herberthe.github.io/codeblock-iframe/demo) 里, 你可以体验这种转化方式!

## 安装

```bash
npm i toml2iframe
# 如果使用yarn
yarn add toml2iframe
```

## 使用方法

你可以在markdown编辑器里面写下面的内容

````markdown
```iframe
src="www.baidu.com"
width="100%"
height="500"
```
````

为上面的语法自定义渲染器

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

`src`符合下面的格式才会被支持

```text
www.baidu.com
//www.baidu.com
http://www.baidu.com
https://www.baidu.com
```

## 可用函数

- iframe属性

| 属性名       |
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

- 参数

| 参数    | 类型            | 说明                                                                              |
| ------- | --------------- | --------------------------------------------------------------------------------- |
| content | `string`        | iframe标签的属性 (子组件使用`textContent`), 使用标准TOML语法书写                  |
| filters | `Array<string>` | 允许的域名列表 (在`filter`函数中这个参数需要传入**不要写协议，直接写域名就好了**) |

- 函数

1. `converter(content: string, filters?: Array<string>)`: 转化iframe的属性到iframe标签元素
2. `filter(content: string, filters: Array<string>)`: 过滤域名

- 输出

For `converter(content: string, filters?: Array<string>)`: [ 结果, 是否过了过滤, [ 属性的名称 (给debug用的) ] ]

For `filter(content: string, filters: Array<string>)`: [ 是否过了过滤, 域名 (如果src的值不是合法路径, 会返回输入src的值) ]

> `/www.baidu.com` 不是合法路径, 直接使用 `www.baidu.com` ! **如果你想使用同源页面, 不要传 `filters` 这个参数, 不然在 `converter` 函数你拿不到结果!!!** 或者, 你写`src`的时候写全同源页面完整的路径, 并且把你同源页面的路由传到`filters`参数里面去, 这就可以了!!

## 为什么要写这个库

讲道理, Markdown原生就支持HTML! 但是下面场景我们会遇到一些问题:

1. 如果我不想让我的用户通过iframe给我们的网站插入广告, 但是我们支持他们用codepen来分享自己的代码, 咋办?
2. 有时候我们想在一些markdown编辑器中插入iframe。为了即时渲染, 浏览器会在我们输入的时候发送大量的GET请求给我们的目标网站, 我们如何去做优化？甚至于当我们开发的时候开启SSR渲染页面, 可能会导致页面崩溃

## 怎么实现

代码块渲染对我们拓展markdown原生语法非常简单, 所以我们可以通过上面的策略来限制iframe渲染的频率

## 感谢

- [iarna-toml](https://github.com/iarna/iarna-toml): Better TOML parsing and stringifying all in that familiar JSON interface.

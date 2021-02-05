const toml2iframe = require("../dist/index")

const filter = ["www.baidu.com"]

const test1 = `
src="www.baidu.com"
`

console.log("测试test1")
console.log(
    toml2iframe.filter(test1, filter)[0] &&
        toml2iframe.converter(test1, filter)[1] ===
            toml2iframe.filter(test1, filter)[0]
        ? "测试通过"
        : "测试失败"
)

const test2 = `
src="/www.baidu.com"
`

console.log("测试test2")
console.log(
    !toml2iframe.filter(test2, filter)[0] &&
        toml2iframe.converter(test2, filter)[1] ===
            toml2iframe.filter(test2, filter)[0]
        ? "测试通过"
        : "测试失败"
)

const test3 = `
src="//www.baidu.com"
`

console.log("测试test3")
console.log(
    toml2iframe.filter(test3, filter)[0] &&
        toml2iframe.converter(test3, filter)[1] ===
            toml2iframe.filter(test3, filter)[0]
        ? "测试通过"
        : "测试失败"
)

const test4 = `
src="http://www.baidu.com"
`

console.log("测试test4")
console.log(
    toml2iframe.filter(test4, filter)[0] &&
        toml2iframe.converter(test4, filter)[1] ===
            toml2iframe.filter(test4, filter)[0]
        ? "测试通过"
        : "测试失败"
)

const test5 = `
src="https://www.baidu.com"
`

console.log("测试test5")
console.log(
    toml2iframe.filter(test5, filter)[0] &&
        toml2iframe.converter(test5, filter)[1] ===
            toml2iframe.filter(test5, filter)[0]
        ? "测试通过"
        : "测试失败"
)

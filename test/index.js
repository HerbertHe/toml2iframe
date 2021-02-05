const toml2iframe = require("../dist/index")

const content = `
src="https://www.baidu.com"
width="100%"
height="500"
`

console.log(toml2iframe.converter(content))

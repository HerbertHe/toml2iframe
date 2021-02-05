const toml2iframe = require("../dist/index")
console.log(
    toml2iframe.converter(
        `src = "www.baidu.com"\n a = "b"\ntextContent="<a></a>"`,
        ["www.baidu.com"]
    )
)

console.log(
    toml2iframe.filter(
        `src = "www.baidu.com"\n a = "b"\ntextContent="<a></a>"`,
        ["www.baidu.com"]
    )
)

import transformer from "./transformer"

/**
 * iframe标签合法域名过滤器
 * @param content TOML iframe内容
 * @param filters 合法域名数组
 */
const filter = (
    content: string,
    filters: Array<string>
): Array<string | boolean> => {
    const [, , src] = transformer(content)
    if (filters.length !== 0 && !filters.includes(src[1])) {
        return [false, src[1]]
    }

    return [true, src[1]]
}

export default filter

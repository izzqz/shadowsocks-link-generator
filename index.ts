interface Ishadowsocks {
    server: string,
    server_port: number,
    password: string,
    method: string,
    name?: string
}

interface IssConfig extends Ishadowsocks {
    plugin?: string,
    plugin_param?: string,
}

interface IssrConfig extends Ishadowsocks {
    protocol: string,
    protocol_param?: string,
    obfs: string,
    obfs_param?: string,
    group?: string
}

interface stringMap {
    [key: string]: string | number // Check 105 line
}

class base64 {
    static encode(string: string): string {
        let base64String
        if (!string) string = ''
        base64String = Buffer.from(string).toString('base64')
        return base64String
    }

    static decode(base64String: string): string {
        let clearString
        if (!base64String) base64String = ''
        clearString = Buffer.from(base64String, 'base64').toString('utf8')
        return clearString
    }
}

const { encode, decode } = base64

export default class SsUrl {
    static genSS(config: IssConfig): string {

        const settings: string = `${encode(`${config.method}:${config.password}`)}`
        const hostname: string = `${config.server}:${config.server_port}`

        let name: string = ''
        let plugin: string = ''

        if (config.plugin) {
            plugin = `?plugin=${config.plugin}`
        }

        if (config.plugin && config.plugin_param) {
            plugin = plugin + encodeURIComponent(';' + config.plugin_param)
        }

        if (config.name) {
            name = '#' + encodeURI(config.name? config.name : '')
        }

        return `ss://${settings}@${hostname}${plugin}${name}`
    }

    static genSSR(config: IssrConfig): string {

        const hostname: string = `${config.server}:${config.server_port}`
        const settings: string = `${config.protocol}:${config.method}:${encode(config.obfs)}:${config.password}`
        const params: string =
            '?obfsparam='  + encode(config.obfs_param) +
            '&protoparam=' + encode(config.protocol_param) +
            '&remarks='    + encode(config.name) +
            '&group='      + encode(config.group)

        const URI = `${hostname}:${settings}/${params}`

        return 'ssr://' + encode(URI)
    }

    static parse(url: string): object {

        const protocol: string = new URL(url).protocol

        let parseInfo: stringMap = {}

        switch (protocol) {
            case 'ss:': //==========[SS]==========

                const URI: string[] = url.replace('ss://', '').split('@')
                const params: URLSearchParams = new URLSearchParams(URI[1].split('?')[1])

                parseInfo.method = decode(URI[0])
                    .split(':')[0]

                parseInfo.password = decode(URI[0])
                    .split(':')[1]

                parseInfo.server = URI[1]
                    .split('#')[0]
                    .split(':')[0]

                parseInfo.server_port = Number(URI[1] // TODO: Fix server port type
                    .split('#')[0]
                    .split(':')[1]
                    .split('?')[0])


                const name = URI[1].split('#')[1]
                if (name) parseInfo.name = decodeURI(name)


                if (params.has('plugin')) {

                    parseInfo.plugin = params.get('plugin')
                        .split(';')[0]

                    const pluginRaramEncoded: string = URI[1].split('?')[1]
                        .split('#')[0]

                    if (pluginRaramEncoded) {

                        parseInfo.plugin_param = decodeURIComponent(pluginRaramEncoded)

                            // "plugin=v2ray;" <<< path=/api/;host=sparrow.yolk.network;tls
                            .replace(`plugin=${parseInfo.plugin};`, '')
                    }
                }

                break;
            case 'ssr:': //==========[SSR]==========

                // TODO: SSR Parse

                break
            default:
                throw new TypeError('Uknown protocol ' + protocol)
        }

        return parseInfo
    }

}

//============[ TEST ]===============

// const myUrl = SsUrl.genSS({
//     server: '8.8.8.8',
//     server_port: 2222,
//     password: '0',
//     method: 'chacha20',
//     name: '123123'
//     // obfs: 'obfs',
//     // obfs_param: 'obfs_params arstars tars ',
//     // protocol: 'proto'
// })
//
// console.log('Generated url: \n', myUrl, '\n')
//
// const parsedMyUrl = SsUrl.parse(myUrl)
//
// console.log('Parsed url:', parsedMyUrl)
// // console.log(decode('SVA6ODM4ODp2ZXJpZnlfc2ltcGxlOnRhYmxlOmh0dHBfcG9zdDpNVEl6TkRVMk56ZzVNQS8_b2Jmc3BhcmFtPWIySm1jM0JoY21GdCZwcm90b3BhcmFtPWNISnZkRzl3WVhKaGJRJnJlbWFya3M9VGtGTlJRJmdyb3VwPVIxSlBWVkE'))

import {URLSearchParams} from "url";

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
        let URI: string[]
        let params: URLSearchParams

        switch (protocol) {
            case 'ss:': //==========[SS]==========

                URI = url.replace('ss://', '').split('@')
                params = new URLSearchParams(URI[1].split('?')[1])

                parseInfo.method = decode(URI[0])
                    .split(':')[0]

                parseInfo.password = decode(URI[0])
                    .split(':')[1]

                parseInfo.server = URI[1]
                    .split('#')[0]
                    .split(':')[0]

                parseInfo.server_port = Number(URI[1]
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

                URI = decode(url.replace('ssr://', '')).split(':')
                params = new URLSearchParams(URI[5].split('/')[1])

                parseInfo.server/*---------*/= URI[0]
                parseInfo.server_port/*----*/= URI[1]
                parseInfo.protocol/*-------*/= URI[2]
                parseInfo.method/*---------*/= URI[3]
                parseInfo.obfs/*-----------*/= decode(URI[4])
                parseInfo.password/*-------*/= URI[5].split('/')[0]
                parseInfo.name/*-----------*/= decode(params.get('remarks'))
                parseInfo.obfs_param/*-----*/= decode(params.get('obfsparam'))
                parseInfo.protocol_param/*-*/= decode(params.get('protoparam'))
                parseInfo.group/*----------*/= decode(params.get('group'))

                break
            default:
                throw new TypeError('Uknown protocol ' + protocol)
        }
        return parseInfo
    }
}
import { URLSearchParams } from "url";

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

/**
 * FIXME
 * TS2741: Property 'server_port' is missing in type '{}' but required in type 'stringMap'.
 */
type stringMap =  {
    server_port?: number
    [key: string]: string | number
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

        let parsedURL: stringMap = {}
        let URI: string[]
        let params: URLSearchParams

        switch (protocol) {

            case 'ssr:': //==========[SSR]==========

                URI = decode(url.replace('ssr://', '')).split(':')
                params = new URLSearchParams(URI[5].split('/')[1])

                parsedURL.server/*---------*/= URI[0]
                parsedURL.server_port/*----*/= Number(URI[1])
                parsedURL.protocol/*-------*/= URI[2]
                parsedURL.method/*---------*/= URI[3]
                parsedURL.obfs/*-----------*/= decode(URI[4])
                parsedURL.password/*-------*/= URI[5].split('/')[0]
                parsedURL.name/*-----------*/= decode(params.get('remarks'))
                parsedURL.obfs_param/*-----*/= decode(params.get('obfsparam'))
                parsedURL.protocol_param/*-*/= decode(params.get('protoparam'))
                parsedURL.group/*----------*/= decode(params.get('group'))

                break
            default:
                throw new TypeError('Uknown protocol ' + protocol)
        }
        return parsedURL
    }

    static parseSS(url: string): IssConfig {
        const URI = url.replace('ss://', '').split('@')
        const params = new URLSearchParams(URI[1].split('?')[1])
        const parsedURL: IssConfig = {
            method: decode(URI[0])
                .split(':')[0],

            password: decode(URI[0])
                .split(':')[1],

            server: URI[1]
                .split('#')[0]
                .split(':')[0],

            server_port: Number(URI[1]
                .split('#')[0]
                .split(':')[1]
                .split('?')[0])
        }

        const name = URI[1].split('#')[1]
        if (name) parsedURL.name = decodeURI(name)

        if (params.has('plugin')) {

            parsedURL.plugin = params.get('plugin')
                .split(';')[0]

            const pluginRaramEncoded: string = URI[1].split('?')[1]
                .split('#')[0]

            if (pluginRaramEncoded) {

                parsedURL.plugin_param = decodeURIComponent(pluginRaramEncoded)
                    // "plugin=v2ray;" <<< path=/v2ray/;host=example.com;tls
                    .replace(`plugin=${parsedURL.plugin};`, '')
            }
        }

        return parsedURL
    }
}
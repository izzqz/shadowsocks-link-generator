import { URLSearchParams } from "url";

interface Ishadowsocks {
    server: string,
    server_port: number,
    password: string,
    method: string,
    name?: string
}

export interface SsConfig extends Ishadowsocks {
    plugin?: string,
    plugin_param?: string,
}

export interface SsrConfig extends Ishadowsocks {
    protocol: string,
    protocol_param?: string,
    obfs: string,
    obfs_param?: string,
    group?: string
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
    static genSS(config: SsConfig): string {

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

    static genSSR(config: SsrConfig): string {

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

    static parseSS(url: string): SsConfig {
        const URI = url.replace('ss://', '').split('@')
        const params = new URLSearchParams(URI[1].split('?')[1])
        const parsedURL: SsConfig = {
            method:/*------*/ decode(URI[0])
                .split(':')[0],

            password:/*----*/ decode(URI[0])
                .split(':')[1],

            server:/*------*/ URI[1]
                .split('#')[0]
                .split(':')[0],

            server_port:/*-*/ Number(URI[1]
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

    static parseSSR(url: string): SsrConfig {
        const URI = decode(url.replace('ssr://', '')).split(':')
        const params = new URLSearchParams(URI[5].split('/')[1])
        return {
            server:/*---------*/ URI[0],
            server_port:/*----*/ Number(URI[1]),
            protocol:/*-------*/ URI[2],
            method:/*---------*/ URI[3],
            obfs:/*-----------*/ decode(URI[4]),
            password:/*-------*/ URI[5].split('/')[0],
            name:/*-----------*/ decode(params.get('remarks')),
            obfs_param:/*-----*/ decode(params.get('obfsparam')),
            protocol_param:/*-*/ decode(params.get('protoparam')),
            group:/*----------*/ decode(params.get('group'))
        }
    }
}
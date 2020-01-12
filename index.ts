import base64 from "./src/base64";
const { encode, decode } = base64

interface Ishadowsocks {
    server: string,
    server_port: number,
    password: string,
    method: string,
    name?: string
}

interface IssConfig extends Ishadowsocks{
    plugin?: string,
    plugin_param?: string,
}

interface IssrConfig extends Ishadowsocks{
    protocol: string,
    protocol_param?: string,
    obfs: string,
    obfs_param?: string,
    group?: string
}

export default class SsUrl {
    static genSS(config: IssConfig): string {

        const settings: string = `${encode(`${config.method}:${config.password}`)}`
        const hostname: string = `${config.server}:${config.server_port}`

        let name: string = ''
        let plugin: string = ''

        if (config.plugin) {
            plugin = `?plugin=${config.plugin};`
        }

        if (config.plugin && config.plugin_param) {
            plugin = plugin + encodeURI(plugin + config.plugin_param)
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
}

//============[ TEST ]===============

const myUrl = SsUrl.genSSR({
    server: '8.8.8.8',
    server_port: 2222,
    password: '0',
    method: 'chacha20',
    protocol: 'origin',
    obfs: 'plain',
    group: 'Group Name',
    name: '123123'
})

console.log('Generated url:', myUrl)

console.log('Parsed:', decode(myUrl.replace('ssr://' || 'ss://', '')))

// console.log(decode('SVA6ODM4ODp2ZXJpZnlfc2ltcGxlOnRhYmxlOmh0dHBfcG9zdDpNVEl6TkRVMk56ZzVNQS8_b2Jmc3BhcmFtPWIySm1jM0JoY21GdCZwcm90b3BhcmFtPWNISnZkRzl3WVhKaGJRJnJlbWFya3M9VGtGTlJRJmdyb3VwPVIxSlBWVkE'))

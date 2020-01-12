/*
Config for ss:// style
{
    "server":"my_server_ip",
    "server_port":8388,
    "password":"mypassword",
    "method":"aes-256-cfb",
    "plugin": "v2ray",
    "plugin_param": "tls"
    "name":"my server"
}
Config for ssr:// style
{
    "server":"my_server_ip",
    "server_port":8388,
    "password":"mypassword",
    "method":"aes-256-cfb",
    "name":"my server",
    "protocol": "protocolName",
    "obfs": "",
    "obfs_param": "",
    "protocol_param": ""
    "group": ""
}
*/

class Base64 {
  encode(string) {
    if (!string) string = ''
    return Buffer.from(string).toString('base64')
  }

  decode(string) {
    return Buffer.from(string, 'base64').toString('utf8')
  }
}

const base64 = new Base64()

class SsLink {
  static genSS(config) {
    const c = config
    // METHOD:PASSWORD@HOSTNAME:PORT?#NAME
    return `ss://${base64.encode(`${c.method}:${c.password}`)}@${c.server}:${c.server_port}#${encodeURI(c.name)}`
  }

  static genSSR(config) {
    const c = config
    // ssr://HOSTNAME:PORT:PROTOCOL:METHOD:OBFS:PASSWORD/?obfsparam=OBFS_PARAM_BASE64&protoparam=PROTO_PARAM_BASE64&remarks=NAME_BASE64&group=GROUP_BASE64
    const URI = `${c.server}:${c.server_port}:${c.protocol}:${c.method}:${base64.encode(c.obfs)}:${c.password}/?obfsparam=${base64.encode(c.obfs_param)}&protoparam=${base64.encode(c.protocol_param)}&remarks=${base64.encode(c.name)}&group=${base64.encode(c.group)}`
    const URL = 'ssr://' + base64.encode(URI)
    return URL
  }

  static parse(link) {
    let parseInfo = {}

    if (link.startsWith('ss://')) {
      const URI = link.replace('ss://', '').split('@')
      const params = new URLSearchParams(URI[1].split('?')[1])

      parseInfo.method/*---------*/= base64
          .decode(URI[0])
          .split(':')[0]

      parseInfo.password/*-------*/= base64
          .decode(URI[0])
          .split(':')[1]

      parseInfo.server/*---------*/= URI[1]
          .split('#')[0]
          .split(':')[0]

      parseInfo.server_port/*----*/= URI[1]
          .split('#')[0]
          .split(':')[1]
          .split('?')[0]

      parseInfo.name/*-----------*/= decodeURI(URI[1].split('#')[1])

      parseInfo.plugin/*---------*/= params.get('plugin')
          // .split(';')[0]
      console.log('Debug:', parseInfo.plugin)
      parseInfo.plugin_param/*---*/= params.get('plugin')
          .split(';')
          .filter(e => e !== parseInfo.plugin)
          .join(';')
          .split('#')[0]

    } else if (link.startsWith('ssr://')) {
      const URI = base64.decode(link.replace('ssr://', '')).split(':')
      const params = new URLSearchParams(URI[5].split('/')[1])

      parseInfo.server/*---------*/= URI[0]
      parseInfo.server_port/*----*/= URI[1]
      parseInfo.protocol/*-------*/= URI[2]
      parseInfo.method/*---------*/= URI[3]
      parseInfo.obfs/*-----------*/= base64.decode(URI[4])
      parseInfo.password/*-------*/= URI[5].split('/')[0]
      parseInfo.name/*-----------*/= base64.decode(params.get('remarks'))
      parseInfo.obfs_param/*-----*/= base64.decode(params.get('obfsparam'))
      parseInfo.protocol_param/*-*/= base64.decode(params.get('protoparam'))
      parseInfo.group/*----------*/= base64.decode(params.get('group'))
    }

    return parseInfo
  }

  // TODO: Gen SSS Link
  // TODO: validate Link
}

const myUrl = SsLink.genSS({
  server: '8.8.8.8',
  server_port: 8388,
  password: 'mypassword',
  method: 'aes-256-cfb',
  plugin: 'obfs-plugin',
  plugin_param: '',
  name: 'Gled'
})

console.log(myUrl)

// console.log(SsLink.parse(myUrl))

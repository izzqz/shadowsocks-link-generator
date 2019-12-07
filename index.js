/*
Config for ss:// style
{
  method: string method name
  password: password for shadoworks
  hostname: hostname damain
  port: undefined
  name: undefined
}
Config for ssr:// style
{
  method: string method name
  password: password for shadoworks
  hostname: hostname damain
  port: undefined
  name: undefined
}
*/

class Base64 {
  encode(string) {
    return Buffer.from(string).toString('base64')
  }

  decode(string) {
    return Buffer.from(string, 'base64').toString('utf8')
  }
}

const base64 = new Base64()

class SsLink extends Base64 {
  static genSS(config) {
    // Y2FtZWxsaWEtMTI4LWNmYjpQQVNTV09SRA@HOSTNAME:8388#NAME
    const c = config
    // METHOD:PASSWORD@HOSTNAME:PORT#NAME
    const URI = `${base64.encode(`${c.method}:${c.password}`)}@${c.hostname}:${c.port}#${encodeURI(c.name)}`
    const URL = 'ss://' + URI
    return URL
  }

  static genSSR(config) {
    const c = config
    // ssr://HOSTNAME:PORT:PROTOCOL:METHOD:OBFS:PASSWORD/?obfsparam=OBFS_PARAM_BASE64&protoparam=PROTO_PARAM_BASE64&remarks=NAME_BASE64&group=GROUP_BASE64
    const URI = `${c.hostname}:${c.port}:${c.protocol}:${c.method}:${base64.encode(c.obfs)}:${c.password}/?obfsparam=${base64.encode(c.obfs_param)}&protoparam=${base64.encode(c.protocol_param)}&remarks=${base64.encode(c.name)}&group=${base64.encode(c.group)}`
    const URL = 'ssr://' + base64.encode(URI)
    return URL
  }

  // TODO: Gen SSS Links
  // TODO: Parse SS Links
  // TODO: Parse SSR Links
}

module.exports = SsLink

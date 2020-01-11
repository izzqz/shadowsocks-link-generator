# shadowsocks-link-generator
Node.js ligthweight module for generating and parsing shadosocks links. No dependencies.

## Install
```sh
npm install shadowsocks-link-generator
```

## Usage

Initialize new intstance
```js
const ssUrl = require('shadowsocks-link-generator')
```
<!-- // Or use ES6 modules
import SsUrl from 'shadowsocks-link-generator' -->

### Generate new shadosocks url

Use `.genSS()` with shadowsocks parameters, what returns full ss link.

```js
const myUrl = ssUrl.genSS({
  server: '8.8.8.8',
  server_port: 8388,
  password: 'mypassword',
  method: 'aes-256-cfb',
  plugin: 'obfs-plugin',
  plugin_param: '',
  name: 'my server'
})

console.log(myUrl)
// ss://YWVzLTI1Ni1jZmI6bXlwYXNzd29yZA==@8.8.8.8:8388#my%20server
```

### Generate new shadosocksR url

Also use `.genSSR()` with shadowsocks parameters, what returns full ssr link.

```js
const myUrl = ssUrl.genSSR({
    server: "77.88.8.8",
    server_port: 8388,
    password: 'mysecretpassword123',
    method: 'chacha20',
    name: 'my server',
    protocol: 'plain',
    protocol_param: '',
    obfs: 'http_simple',
    obfs_param: 'someparams',
    group: 'My server list' // Group is used in the shadowsocksR application
})

console.log(myUrl)
// ssr://NzcuODguOC44OjgzODg6cGxhaW46Y2hhY2hhMjA6YUhSMGNGOXphVzF3YkdVPTpteXNlY3JldHBhc3N3b3JkMTIzLz9vYmZzcGFyYW09YzI5dFpYQmhjbUZ0Y3c9PSZwcm90b3BhcmFtPSZyZW1hcmtzPWJYa2djMlZ5ZG1WeSZncm91cD1UWGtnYzJWeWRtVnlJR3hwYzNRPQ==
```

### Parse links

For both links, you can use `.parse()` method, what returns an object with parameters.

#### SS links

```js
const myUrl = 'ss://YWVzLTI1Ni1jZmI6bXlwYXNzd29yZA==@my_server_ip:8388#my%20server'

const myUrlParsed = ssUrl.parse(myUrl)
console.log(myUrlParsed)
/*{
  method: 'aes-256-cfb',
  password: 'mypassword',
  server: 'my_server_ip',
  server_port: '8388',
  name: 'my server'
}*/
```

#### SSR links

```js
const myUrl = 'ssr://NzcuODguOC44OjgzODg6cGxhaW46Y2hhY2hhMjA6YUhSMGNGOXphVzF3YkdVPTpteXNlY3JldHBhc3N3b3JkMTIzLz9vYmZzcGFyYW09YzI5dFpYQmhjbUZ0Y3c9PSZwcm90b3BhcmFtPSZyZW1hcmtzPWJYa2djMlZ5ZG1WeSZncm91cD1UWGtnYzJWeWRtVnlJR3hwYzNRPQ=='

const myUrlParsed = ssUrl.parse(myUrl)
console.log(myUrlParsed)
/*{
  server: '77.88.8.8',
  server_port: '8388',
  protocol: 'plain',
  method: 'chacha20',
  obfs: 'http_simple',
  password: 'mysecretpassword123',
  name: 'my server',
  obfs_param: 'someparams',
  protocol_param: '',
  group: 'My server list'
}*/
```

## Advanced

You can use this module like a parent class. To use this methods in your class.

```js
const SsUrlMethods = require('shadowsocks-link-generator')

class Something extends SsUrlMethods {
  // blah blah blah...
}

const myUrl = Something.genSSR({
  server: '77.88.8.8',
  server_port: '8388',
  protocol: 'plain',
  method: 'chacha20',
  obfs: 'http_simple',
  password: 'mysecretpassword123',
  name: 'my server',
  obfs_param: 'someparams',
  protocol_param: '',
  group: 'My server list'
})

console.log(myUrl)
// ssr://VG90YWwgY29udHJvbCBvZjp0aGUgSW50ZXJuZXQgaW4gQ2hpbmE6aGluZGVyczp0aGUgZGV2ZWxvcG1lbnQ6YjJZZ2RHaGxJR2RzYjJKaGJBPT06SW50ZXJuZXQgY29tbXVuaXR5Li8/b2Jmc3BhcmFtPWRHOGdZbmx3WVhOeklIUm9aU0JtYVhKbGQyRnNiQT09JnByb3RvcGFyYW09VEdsMlpTQm5iRzlpWVd4c2VTdz0mcmVtYXJrcz1WWE5sSUhSdmIyeHomZ3JvdXA9Ym05MElHeHZZMkZzYkhrdQ==
```

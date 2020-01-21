"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var base64 = /** @class */ (function () {
    function base64() {
    }
    base64.encode = function (string) {
        var base64String;
        if (!string)
            string = '';
        base64String = Buffer.from(string).toString('base64');
        return base64String;
    };
    base64.decode = function (base64String) {
        var clearString;
        if (!base64String)
            base64String = '';
        clearString = Buffer.from(base64String, 'base64').toString('utf8');
        return clearString;
    };
    return base64;
}());
var encode = base64.encode, decode = base64.decode;
var SsUrl = /** @class */ (function () {
    function SsUrl() {
    }
    SsUrl.genSS = function (config) {
        var settings = "" + encode(config.method + ":" + config.password);
        var hostname = config.server + ":" + config.server_port;
        var name = '';
        var plugin = '';
        if (config.plugin) {
            plugin = "?plugin=" + config.plugin;
        }
        if (config.plugin && config.plugin_param) {
            plugin = plugin + encodeURIComponent(';' + config.plugin_param);
        }
        if (config.name) {
            name = '#' + encodeURI(config.name ? config.name : '');
        }
        return "ss://" + settings + "@" + hostname + plugin + name;
    };
    SsUrl.genSSR = function (config) {
        var hostname = config.server + ":" + config.server_port;
        var settings = config.protocol + ":" + config.method + ":" + encode(config.obfs) + ":" + config.password;
        var params = '?obfsparam=' + encode(config.obfs_param) +
            '&protoparam=' + encode(config.protocol_param) +
            '&remarks=' + encode(config.name) +
            '&group=' + encode(config.group);
        var URI = hostname + ":" + settings + "/" + params;
        return 'ssr://' + encode(URI);
    };
    SsUrl.parse = function (url) {
        var protocol = new URL(url).protocol;
        var parseInfo = {};
        switch (protocol) {
            case 'ss:': //==========[SS]==========
                var URI = url.replace('ss://', '').split('@');
                var params = new URLSearchParams(URI[1].split('?')[1]);
                parseInfo.method = decode(URI[0])
                    .split(':')[0];
                parseInfo.password = decode(URI[0])
                    .split(':')[1];
                parseInfo.server = URI[1]
                    .split('#')[0]
                    .split(':')[0];
                parseInfo.server_port = Number(URI[1] // TODO: Fix server port type
                    .split('#')[0]
                    .split(':')[1]
                    .split('?')[0]);
                var name_1 = URI[1].split('#')[1];
                if (name_1)
                    parseInfo.name = decodeURI(name_1);
                if (params.has('plugin')) {
                    parseInfo.plugin = params.get('plugin')
                        .split(';')[0];
                    var pluginRaramEncoded = URI[1].split('?')[1]
                        .split('#')[0];
                    if (pluginRaramEncoded) {
                        parseInfo.plugin_param = decodeURIComponent(pluginRaramEncoded)
                            // "plugin=v2ray;" <<< path=/api/;host=sparrow.yolk.network;tls
                            .replace("plugin=" + parseInfo.plugin + ";", '');
                    }
                }
                break;
            case 'ssr:': //==========[SSR]==========
                // TODO: SSR Parse
                break;
            default:
                throw new TypeError('Uknown protocol ' + protocol);
        }
        return parseInfo;
    };
    return SsUrl;
}());
exports.default = SsUrl;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQXlCQTtJQUFBO0lBY0EsQ0FBQztJQWJVLGFBQU0sR0FBYixVQUFjLE1BQWM7UUFDeEIsSUFBSSxZQUFZLENBQUE7UUFDaEIsSUFBSSxDQUFDLE1BQU07WUFBRSxNQUFNLEdBQUcsRUFBRSxDQUFBO1FBQ3hCLFlBQVksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUNyRCxPQUFPLFlBQVksQ0FBQTtJQUN2QixDQUFDO0lBRU0sYUFBTSxHQUFiLFVBQWMsWUFBb0I7UUFDOUIsSUFBSSxXQUFXLENBQUE7UUFDZixJQUFJLENBQUMsWUFBWTtZQUFFLFlBQVksR0FBRyxFQUFFLENBQUE7UUFDcEMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUNsRSxPQUFPLFdBQVcsQ0FBQTtJQUN0QixDQUFDO0lBQ0wsYUFBQztBQUFELENBQUMsQUFkRCxJQWNDO0FBRU8sSUFBQSxzQkFBTSxFQUFFLHNCQUFNLENBQVc7QUFFakM7SUFBQTtJQXFHQSxDQUFDO0lBcEdVLFdBQUssR0FBWixVQUFhLE1BQWlCO1FBRTFCLElBQU0sUUFBUSxHQUFXLEtBQUcsTUFBTSxDQUFJLE1BQU0sQ0FBQyxNQUFNLFNBQUksTUFBTSxDQUFDLFFBQVUsQ0FBRyxDQUFBO1FBQzNFLElBQU0sUUFBUSxHQUFjLE1BQU0sQ0FBQyxNQUFNLFNBQUksTUFBTSxDQUFDLFdBQWEsQ0FBQTtRQUVqRSxJQUFJLElBQUksR0FBVyxFQUFFLENBQUE7UUFDckIsSUFBSSxNQUFNLEdBQVcsRUFBRSxDQUFBO1FBRXZCLElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRTtZQUNmLE1BQU0sR0FBRyxhQUFXLE1BQU0sQ0FB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
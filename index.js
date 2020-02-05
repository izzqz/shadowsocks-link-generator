"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var url_1 = require("url");
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
    SsUrl.parseSS = function (url) {
        var URI = url.replace('ss://', '').split('@');
        var params = new url_1.URLSearchParams(URI[1].split('?')[1]);
        var parsedURL = {
            method: /*------*/ decode(URI[0])
                .split(':')[0],
            password: /*----*/ decode(URI[0])
                .split(':')[1],
            server: /*------*/ URI[1]
                .split('#')[0]
                .split(':')[0],
            server_port: /*-*/ Number(URI[1]
                .split('#')[0]
                .split(':')[1]
                .split('?')[0])
        };
        var name = URI[1].split('#')[1];
        if (name)
            parsedURL.name = decodeURI(name);
        if (params.has('plugin')) {
            parsedURL.plugin = params.get('plugin')
                .split(';')[0];
            var pluginRaramEncoded = URI[1].split('?')[1]
                .split('#')[0];
            if (pluginRaramEncoded) {
                parsedURL.plugin_param = decodeURIComponent(pluginRaramEncoded)
                    // "plugin=v2ray;" <<< path=/v2ray/;host=example.com;tls
                    .replace("plugin=" + parsedURL.plugin + ";", '');
            }
        }
        return parsedURL;
    };
    SsUrl.parseSSR = function (url) {
        var URI = decode(url.replace('ssr://', '')).split(':');
        var params = new url_1.URLSearchParams(URI[5].split('/')[1]);
        return {
            server: /*---------*/ URI[0],
            server_port: /*----*/ Number(URI[1]),
            protocol: /*-------*/ URI[2],
            method: /*---------*/ URI[3],
            obfs: /*-----------*/ decode(URI[4]),
            password: /*-------*/ URI[5].split('/')[0],
            name: /*-----------*/ decode(params.get('remarks')),
            obfs_param: /*-----*/ decode(params.get('obfsparam')),
            protocol_param: /*-*/ decode(params.get('protoparam')),
            group: /*----------*/ decode(params.get('group'))
        };
    };
    return SsUrl;
}());
exports.default = SsUrl;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDJCQUFzQztBQXVCdEM7SUFBQTtJQWNBLENBQUM7SUFiVSxhQUFNLEdBQWIsVUFBYyxNQUFjO1FBQ3hCLElBQUksWUFBWSxDQUFBO1FBQ2hCLElBQUksQ0FBQyxNQUFNO1lBQUUsTUFBTSxHQUFHLEVBQUUsQ0FBQTtRQUN4QixZQUFZLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDckQsT0FBTyxZQUFZLENBQUE7SUFDdkIsQ0FBQztJQUVNLGFBQU0sR0FBYixVQUFjLFlBQW9CO1FBQzlCLElBQUksV0FBVyxDQUFBO1FBQ2YsSUFBSSxDQUFDLFlBQVk7WUFBRSxZQUFZLEdBQUcsRUFBRSxDQUFBO1FBQ3BDLFdBQVcsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDbEUsT0FBTyxXQUFXLENBQUE7SUFDdEIsQ0FBQztJQUNMLGFBQUM7QUFBRCxDQUFDLEFBZEQsSUFjQztBQUVPLElBQUEsc0JBQU0sRUFBRSxzQkFBTSxDQUFXO0FBRWpDO0lBQUE7SUFpR0EsQ0FBQztJQWhHVSxXQUFLLEdBQVosVUFBYSxNQUFnQjtRQUV6QixJQUFNLFFBQVEsR0FBVyxLQUFHLE1BQU0sQ0FBSSxNQUFNLENBQUMsTUFBTSxTQUFJLE1BQU0sQ0FBQyxRQUFVLENBQUcsQ0FBQTtRQUMzRSxJQUFNLFFBQVEsR0FBYyxNQUFNLENBQUMsTUFBTSxTQUFJLE1BQU0sQ0FBQyxXQUFhLENBQUE7UUFFakUsSUFBSSxJQUFJLEdBQVcsRUFBRSxDQUFBO1FBQ3JCLElBQUksTUFBTSxHQUFXLEVBQUUsQ0FBQTtRQUV2QixJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUU7WUFDZixNQUFNLEdBQUcs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
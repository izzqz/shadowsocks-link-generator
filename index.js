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
    SsUrl.parse = function (url) {
        var protocol = new URL(url).protocol;
        var parseInfo = {};
        var URI;
        var params;
        switch (protocol) {
            case 'ss:': //==========[SS]==========
                URI = url.replace('ss://', '').split('@');
                params = new url_1.URLSearchParams(URI[1].split('?')[1]);
                parseInfo.method = decode(URI[0])
                    .split(':')[0];
                parseInfo.password = decode(URI[0])
                    .split(':')[1];
                parseInfo.server = URI[1]
                    .split('#')[0]
                    .split(':')[0];
                parseInfo.server_port = Number(URI[1]
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
                URI = decode(url.replace('ssr://', '')).split(':');
                params = new url_1.URLSearchParams(URI[5].split('/')[1]);
                parseInfo.server /*---------*/ = URI[0];
                parseInfo.server_port /*----*/ = Number(URI[1]);
                parseInfo.protocol /*-------*/ = URI[2];
                parseInfo.method /*---------*/ = URI[3];
                parseInfo.obfs /*-----------*/ = decode(URI[4]);
                parseInfo.password /*-------*/ = URI[5].split('/')[0];
                parseInfo.name /*-----------*/ = decode(params.get('remarks'));
                parseInfo.obfs_param /*-----*/ = decode(params.get('obfsparam'));
                parseInfo.protocol_param /*-*/ = decode(params.get('protoparam'));
                parseInfo.group /*----------*/ = decode(params.get('group'));
                break;
            default:
                throw new TypeError('Uknown protocol ' + protocol);
        }
        return parseInfo;
    };
    return SsUrl;
}());
exports.default = SsUrl;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDJCQUFzQztBQWdDdEM7SUFBQTtJQWNBLENBQUM7SUFiVSxhQUFNLEdBQWIsVUFBYyxNQUFjO1FBQ3hCLElBQUksWUFBWSxDQUFBO1FBQ2hCLElBQUksQ0FBQyxNQUFNO1lBQUUsTUFBTSxHQUFHLEVBQUUsQ0FBQTtRQUN4QixZQUFZLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDckQsT0FBTyxZQUFZLENBQUE7SUFDdkIsQ0FBQztJQUVNLGFBQU0sR0FBYixVQUFjLFlBQW9CO1FBQzlCLElBQUksV0FBVyxDQUFBO1FBQ2YsSUFBSSxDQUFDLFlBQVk7WUFBRSxZQUFZLEdBQUcsRUFBRSxDQUFBO1FBQ3BDLFdBQVcsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDbEUsT0FBTyxXQUFXLENBQUE7SUFDdEIsQ0FBQztJQUNMLGFBQUM7QUFBRCxDQUFDLEFBZEQsSUFjQztBQUVPLElBQUEsc0JBQU0sRUFBRSxzQkFBTSxDQUFXO0FBRWpDO0lBQUE7SUFnSEEsQ0FBQztJQS9HVSxXQUFLLEdBQVosVUFBYSxNQUFpQjtRQUUxQixJQUFNLFFBQVEsR0FBVyxLQUFHLE1BQU0sQ0FBSSxNQUFNLENBQUMsTUFBTSxTQUFJLE1BQU0sQ0FBQyxRQUFVLENBQUcsQ0FBQTtRQUMzRSxJQUFNLFFBQVEsR0FBYyxNQUFNLENBQUMsTUFBTSxTQUFJLE1BQU0sQ0FBQyxXQUFhLENBQUE7UUFFakUsSUFBSSxJQUFJLEdBQVcsRUFBRSxDQUFBO1FBQ3JCLElBQUksTUFBTSxHQUFXLEVBQUUsQ0FBQTtRQUV2QixJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUU7WUFDZixNQUFNLEdBQUcs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
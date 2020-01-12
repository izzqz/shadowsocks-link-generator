"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base64_1 = require("./src/base64");
const { encode, decode } = base64_1.default;
class SsUrl {
    static genSS(config) {
        const settings = `${encode(`${config.method}:${config.password}`)}`;
        const hostname = `${config.server}:${config.server_port}`;
        let name = '';
        let plugin = '';
        if (config.plugin) {
            plugin = `?plugin=${config.plugin};`;
        }
        if (config.plugin && config.plugin_param) {
            plugin = plugin + encodeURI(plugin + config.plugin_param);
        }
        if (config.name) {
            name = '#' + encodeURI(config.name ? config.name : '');
        }
        return `ss://${settings}@${hostname}${plugin}${name}`;
    }
    static genSSR(config) {
        const hostname = `${config.server}:${config.server_port}`;
        const settings = `${config.protocol}:${config.method}:${encode(config.obfs)}:${config.password}`;
        const params = '?obfsparam=' + encode(config.obfs_param) +
            '&protoparam=' + encode(config.protocol_param) +
            '&remarks=' + encode(config.name) +
            '&group=' + encode(config.group);
        const URI = `${hostname}:${settings}/${params}`;
        return 'ssr://' + encode(URI);
    }
}
exports.default = SsUrl;
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
});
console.log('Generated url:', myUrl);
console.log('Parsed:', decode(myUrl.replace('ssr://' || 'ss://', '')));
// console.log(decode('SVA6ODM4ODp2ZXJpZnlfc2ltcGxlOnRhYmxlOmh0dHBfcG9zdDpNVEl6TkRVMk56ZzVNQS8_b2Jmc3BhcmFtPWIySm1jM0JoY21GdCZwcm90b3BhcmFtPWNISnZkRzl3WVhKaGJRJnJlbWFya3M9VGtGTlJRJmdyb3VwPVIxSlBWVkE'))
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHlDQUFrQztBQUNsQyxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLGdCQUFNLENBQUE7QUF1QmpDLE1BQXFCLEtBQUs7SUFDdEIsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFpQjtRQUUxQixNQUFNLFFBQVEsR0FBVyxHQUFHLE1BQU0sQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsQ0FBQTtRQUMzRSxNQUFNLFFBQVEsR0FBVyxHQUFHLE1BQU0sQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFBO1FBRWpFLElBQUksSUFBSSxHQUFXLEVBQUUsQ0FBQTtRQUNyQixJQUFJLE1BQU0sR0FBVyxFQUFFLENBQUE7UUFFdkIsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFO1lBQ2YsTUFBTSxHQUFHLFdBQVcsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFBO1NBQ3ZDO1FBRUQsSUFBSSxNQUFNLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxZQUFZLEVBQUU7WUFDdEMsTUFBTSxHQUFHLE1BQU0sR0FBRyxTQUFTLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQTtTQUM1RDtRQUVELElBQUksTUFBTSxDQUFDLElBQUksRUFBRTtZQUNiLElBQUksR0FBRyxHQUFHLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFBO1NBQ3hEO1FBRUQsT0FBTyxRQUFRLFFBQVEsSUFBSSxRQUFRLEdBQUcsTUFBTSxHQUFHLElBQUksRUFBRSxDQUFBO0lBQ3pELENBQUM7SUFFRCxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQWtCO1FBRTVCLE1BQU0sUUFBUSxHQUFXLEdBQUcsTUFBTSxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUE7UUFDakUsTUFBTSxRQUFRLEdBQVcsR0FBRyxNQUFNLENBQUMsUUFBUSxJQUFJLE1BQU0sQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUE7UUFDeEcsTUFBTSxNQUFNLEdBQ1IsYUFBYSxHQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDO1lBQzFDLGNBQWMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQztZQUM5QyxXQUFXLEdBQU0sTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDcEMsU0FBUyxHQUFRLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUE7UUFFekMsTUFBTSxHQUFHLEdBQUcsR0FBRyxRQUFRLElBQUksUUFBUSxJQUFJLE1BQU0sRUFBRSxDQUFBO1FBRS9DLE9BQU8sUUFBUSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNqQyxDQUFDO0NBQ0o7QUF0Q0Qsd0JBc0NDO0FBRUQscUNBQXFDO0FBRXJDLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7SUFDdkIsTUFBTSxFQUFFLFNBQVM7SUFDakIsV0FBVyxFQUFFLElBQUk7SUFDakIsUUFBUSxFQUFFLEdBQUc7SUFDYixNQUFNLEVBQUUsVUFBVTtJQUNsQixRQUFRLEVBQUUsUUFBUTtJQUNsQixJQUFJLEVBQUUsT0FBTztJQUNiLEtBQUssRUFBRSxZQUFZO0lBQ25CLElBQUksRUFBRSxRQUFRO0NBQ2pCLENBQUMsQ0FBQTtBQUVGLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsS0FBSyxDQUFDLENBQUE7QUFFcEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxJQUFJLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFFdEUseU1BQXlNIn0=
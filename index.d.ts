interface Ishadowsocks {
    server: string;
    server_port: number;
    password: string;
    method: string;
    name?: string;
}
interface IssConfig extends Ishadowsocks {
    plugin?: string;
    plugin_param?: string;
}
interface IssrConfig extends Ishadowsocks {
    protocol: string;
    protocol_param?: string;
    obfs: string;
    obfs_param?: string;
    group?: string;
}
export default class SsUrl {
    static genSS(config: IssConfig): string;
    static genSSR(config: IssrConfig): string;
    static parse(url: string): object;
}
export {};

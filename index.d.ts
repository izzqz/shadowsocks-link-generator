interface Ishadowsocks {
    server: string;
    server_port: number;
    password: string;
    method: string;
    name?: string;
}
export interface SsConfig extends Ishadowsocks {
    plugin?: string;
    plugin_param?: string;
}
export interface SsrConfig extends Ishadowsocks {
    protocol: string;
    protocol_param?: string;
    obfs: string;
    obfs_param?: string;
    group?: string;
}
export default class SsUrl {
    static genSS(config: SsConfig): string;
    static genSSR(config: SsrConfig): string;
    static parseSS(url: string): SsConfig;
    static parseSSR(url: string): SsrConfig;
}
export {};

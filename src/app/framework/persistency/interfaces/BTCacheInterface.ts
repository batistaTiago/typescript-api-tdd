export default interface BTCacheInterface {
    get(key: string, defaultValue?: any): any;
    put(key: string, value: any, keep_for?: number): boolean;
    forever(key: string, value: any): boolean;
    forget(key: string): boolean;
}